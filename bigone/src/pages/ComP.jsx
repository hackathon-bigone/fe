import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledComP";
import axios from "axios";

const API_BASE = "https://43-203-179-188.sslip.io/";

// 이미지 URL 보정
const buildImageUrl = (val) => {
  if (!val) return `${API_BASE}uploads/r?key=__none__`;
  return `${API_BASE}uploads/r?key=${encodeURIComponent(val)}`;
};

// 상태 텍스트 변환
const translateStatus = (status) => (status === "RECRUITING" ? "모집중" : "모집완료");

// 월/일 포맷
const formatDate = (val) => {
  if (!val) return "";
  const d = new Date(val);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${month}월 ${day}일`;
};

const ComP = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const goBack = () => navigate(`/my`);
  const goRec = () => navigate(`/my/comment`);
  const goDetail = (id) => navigate(`/purchase/detail/${id}`);

  const [comments, setComments] = useState([]);
  const [groupbuys, setGroupbuys] = useState({});
  const [scrappedMap, setScrappedMap] = useState({});
  const [pending, setPending] = useState({});

  // ⭐ 스크랩 토글
  const handleScrapToggle = async (e, groupbuyId) => {
    e.stopPropagation();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (pending[groupbuyId]) return;

    setPending((p) => ({ ...p, [groupbuyId]: true }));

    try {
      await axios.post(
        `${API_BASE}groupbuys/${groupbuyId}/scrap`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 성공 시 토글
      setScrappedMap((m) => ({ ...m, [groupbuyId]: !m[groupbuyId] }));
    } catch (err) {
      console.error("❌ 스크랩 실패:", err);
    } finally {
      setPending((p) => ({ ...p, [groupbuyId]: false }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 내가 쓴 댓글
        const commentRes = await axios.get(`${API_BASE}mypage/comments/groupbuy`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(commentRes.data);

        // 2. 전체 공동구매 목록
        const groupRes = await axios.get(`${API_BASE}groupbuys`);
        const groupArray = groupRes.data.groupbuys || [];

        // groupbuys map 저장
        const groupMap = {};
        groupArray.forEach((g) => (groupMap[g.groupbuyId] = g));
        setGroupbuys(groupMap);

        // 3. 내 스크랩 목록 불러오기
        const scrapRes = await axios.get(`${API_BASE}mypage/groupbuy-scrap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const scrapList = Array.isArray(scrapRes.data) ? scrapRes.data : [];

        const initScrap = {};
        scrapList.forEach((s) => {
          initScrap[s.postId || s.groupbuyId] = true;
        });
        setScrappedMap(initScrap);
      } catch (err) {
        console.error("❌ 데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [token]);

  // 🔑 중복 제거한 댓글 배열 (groupbuyBoardId 기준)
  const uniqueComments = Array.from(new Map(comments.map((c) => [c.groupbuyBoardId, c])).values());

  return (
    <P.Container>
      <P.Header>
        <img src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={goBack} />
        <P.Title>댓글 단 게시물</P.Title>
      </P.Header>
      <P.Category>
        <div id="recipe" onClick={goRec}>
          레시피
        </div>
        <div id="purchase">공동구매</div>
      </P.Category>
      <P.Body>
        {uniqueComments.length === 0 ? (
          <P.EmptyWrapper>
            <img src={`${process.env.PUBLIC_URL}/images/null.png`} alt="no posts" />
            <div>작성한 댓글이 없습니다.</div>
          </P.EmptyWrapper>
        ) : (
          uniqueComments.map((c) => {
            const g = groupbuys[c.groupbuyBoardId]; // boardId == groupbuyId
            const scrapped = scrappedMap[c.groupbuyBoardId] || false;

            return (
              <P.Component key={c.groupbuyBoardId} onClick={() => g && goDetail(g.groupbuyId)}>
                {g?.mainImageUrl && (
                  <P.Image>
                    <img src={buildImageUrl(g.mainImageUrl)} alt="represent" />
                  </P.Image>
                )}
                <P.Detail>
                  <P.Up>
                    <P.CTitle>{g ? g.groupbuyTitle : c.groupbuyBoardTitle}</P.CTitle>
                    <P.Scrap>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/${scrapped ? "star_y" : "star_w"}.svg`}
                        alt="scrap"
                        onClick={(e) => handleScrapToggle(e, c.groupbuyBoardId)}
                        style={{
                          cursor: "pointer",
                          opacity: pending[c.groupbuyBoardId] ? 0.6 : 1,
                        }}
                      />
                    </P.Scrap>
                  </P.Up>
                  <P.Down>
                    <P.Icons>
                      <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`} alt="comment" />
                      <div id="cnum">{g?.commentCount ?? 0}</div>
                      <div id="hr" />
                      <div
                        style={
                          g?.status === "RECRUITING"
                            ? {
                                display: "inline-flex",
                                background: "rgba(255,79,38,0.1)",
                                color: "#FF4F26",
                                borderRadius: "5px",
                                padding: "0 8px",
                              }
                            : {
                                display: "inline-flex",
                                background: "#C4C4C4",
                                color: "#FFF",
                                borderRadius: "5px",
                                padding: "0 8px",
                              }
                        }
                      >
                        {translateStatus(g?.status)}
                      </div>
                    </P.Icons>
                    <P.Date>{formatDate(c.createdAt)}</P.Date>
                  </P.Down>
                </P.Detail>
              </P.Component>
            );
          })
        )}
      </P.Body>
    </P.Container>
  );
};

export default ComP;
