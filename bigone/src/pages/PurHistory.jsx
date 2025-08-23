import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPurH";
import axios from "axios"; // 파일 맨 위(컴포넌트 바깥 또는 안 가장 위) 추가

const API_BASE = "http://43.203.179.188/";

// 네트워크 요청 없는 SVG 플레이스홀더
const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'>
  <rect width='100%' height='100%' fill='#eeeeee'/>
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-size='16' fill='#888'>이미지 준비중</text>
</svg>`;
const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

// ✅ 이미지 URL 정규화: 절대URL/업로드경로/키 모두 대응
const buildImageUrl = (val) => {
  if (!val) return PLACEHOLDER;

  // 이미 절대 URL이면 그대로
  if (/^https?:\/\//i.test(val)) return val;

  // '/uploads/...' 혹은 'uploads/...' 경로면 베이스만 붙임
  if (val.startsWith("/uploads/"))
    return `${API_BASE}${val.replace(/^\//, "")}`;
  if (val.startsWith("uploads/")) return `${API_BASE}${val}`;

  // 그 외엔 '키'로 간주하고 키-뷰어 엔드포인트 사용 (다른 페이지와 동일)
  return `${API_BASE}uploads/r?key=${encodeURIComponent(val)}`;
};

const PurHistory = () => {
  const navigate = useNavigate();
  const goDetail = (id) => navigate(`/purchase/detail/${id}`);

  const goBack = () => {
    navigate(`/my`);
  };

  const goRec = () => {
    navigate(`/my/wrote/recipe`);
  };

  const [groupbuys, setGroupbuys] = useState([]);

  // ✅ "RECRUITING" → "모집중", "COMPLETED" → "모집완료"
  const translateStatus = (status) => {
    return status === "RECRUITING" ? "모집중" : "모집완료";
  };

  // ✅ "몇 분 전" 표시 함수
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}시간 전`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일 전`;
  };

  useEffect(() => {
    const fetchGroupbuys = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(
          "http://43.203.179.188/mypage/my-groupbuys",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("📦 받아온 groupbuys 데이터:", res.data);

        // ✅ 숫자만 뽑아서 오름차순 정렬 ("12분 전" → 12)
        const sorted = [...res.data].sort((a, b) => {
          const numA = parseInt(a.createDate.replace(/\D/g, ""));
          const numB = parseInt(b.createDate.replace(/\D/g, ""));
          return numA - numB;
        });

        setGroupbuys(sorted);
      } catch (err) {
        console.error("❌ 공동구매 게시물 조회 실패:", err);
      }
    };

    fetchGroupbuys();
  }, []);

  return (
    <P.Container>
      <P.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <P.Title>작성한 게시물</P.Title>
      </P.Header>
      <P.Category>
        <div id="recipe" onClick={goRec}>
          레시피
        </div>
        <div id="purchase">공동구매</div>
      </P.Category>
      <P.Body>
        {Array.isArray(groupbuys) && groupbuys.length === 0 ? (
          <P.EmptyWrapper>
            <img
              src={`${process.env.PUBLIC_URL}/images/null.png`}
              alt="no posts"
            />
            <div>작성한 공동구매가 없습니다.</div>
          </P.EmptyWrapper>
        ) : (
          groupbuys.map((item) => (
            <P.Component
              key={item.groupbuyId}
              role="button"
              tabIndex={0}
              onClick={() => goDetail(item.groupbuyId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  goDetail(item.groupbuyId);
              }}
              style={{ cursor: "pointer" }}
            >
              <P.Image>
                {/* buildImageUrl 사용 중이면 아래 줄로 교체:
              <img src={buildImageUrl(item.mainImageUrl)} alt="represent" /> */}
                <img
                  src={buildImageUrl(item.mainImageUrl)}
                  alt="represent"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER;
                  }}
                />
              </P.Image>

              <P.Detail>
                <P.Up>
                  <P.CTitle>{item.groupbuyTitle}</P.CTitle>
                </P.Up>

                <P.Down>
                  <P.Icons>
                    <img
                      id="comment"
                      src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}
                      alt="comment"
                    />
                    <div id="cnum">{item.commentCount}</div>
                    <div id="hr" />
                    <div id="ing">{translateStatus(item.status)}</div>
                  </P.Icons>
                  <P.Date>{item.createDate}</P.Date>
                </P.Down>
              </P.Detail>
            </P.Component>
          ))
        )}
      </P.Body>
    </P.Container>
  );
};

export default PurHistory;
