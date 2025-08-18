import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPurH";
import axios from "axios";

const PurHistory = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/`);
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
        {groupbuys.map((item) => (
          <P.Component key={item.groupbuyId}>
            <P.Image>
              <img
                src={`http://43.203.179.188/uploads/preview?key=${item.mainImageUrl}`}
                alt="represent"
              />
            </P.Image>

            <P.Detail>
              <P.Up>
                <P.CTitle>{item.groupbuyTitle}</P.CTitle>
                {/* <P.Scrap>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${
                      isScrapped ? "star_y" : "star_w"
                    }.svg`}
                    alt="scrap"
                    onClick={handleScrapClick}
                  />
                </P.Scrap> */}
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
                <P.Date>{item.createDate}</P.Date> {/* ✅ 여기만 수정 */}
              </P.Down>
            </P.Detail>
          </P.Component>
        ))}
      </P.Body>
    </P.Container>
  );
};

export default PurHistory;
