import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as P from "../styles/StyledPurD";
import BottomSheet from "../pages/components/BottomSheet";
import axios from "axios";

const P_Detail = () => {
  const navigate = useNavigate();
  const goPur = () => {
    navigate(`/purchase`);
  };
  const goEdit = (id) => {
    navigate(`/purchase/edit/${id}`);
  };

  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("access_token");
  const { user_id } = useParams();
  const [component, setComponent] = useState({});
  const [comment, setComment] = useState([]);
  const currentStatus = component.status || "";
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const isRecruiting = currentStatus.toUpperCase() === "RECRUITING";
  const status = isRecruiting ? "모집중" : "모집완료";
  const statusStyle = {
    color: isRecruiting ? "#FF4F26" : "#FFF",
    backgroundColor: isRecruiting ? "rgba(255, 79, 38, 0.10)" : "#C4C4C4",
  };

  const renderDateOrRelative = (dateString) => {
    if (!dateString) return "";
    const isAbsoluteDate = /^\d{4}-\d{2}-\d{2}T/.test(dateString);

    if (isAbsoluteDate) {
      const date = new Date(dateString);
      return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    } else {
      return dateString;
    }
  };

  const handleShareClick = () => {
    const shareUrl = window.location.href; // 현재 페이지 URL 복사 예시
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch(() => {
        alert("복사에 실패했습니다.");
      });
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`https://43-203-179-188.sslip.io/groupbuys/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("삭제되었습니다.");
      goPur();
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://43-203-179-188.sslip.io/groupbuys/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        console.log(JSON.stringify(data, null, 2));
        setComponent(data);
        setComment(data.comments);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    const fetchScrap = async () => {
      try {
        const res = await axios.get("https://43-203-179-188.sslip.io/mypage/groupbuy-scrap", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const scrapList = res.data;
        const scrapped = scrapList.some((item) => item.groupbuyId === Number(user_id));
        setIsScrapped(scrapped);
      } catch (error) {
        console.log("스크랩 목록 불러오기 에러:", error);
      }
    };

    fetchData();
    fetchScrap();
  }, [user_id, token]);

  const myId = localStorage.getItem("user_id");
  const isMine = myId === String(component.authorUsername);
  // console.log("myId from localStorage:", myId);
  // console.log("component.authorId:", component.authorId, typeof component.authorId);

  const [isScrapped, setIsScrapped] = useState(false);
  const handleScrapClick = async () => {
    try {
      const response = await axios.post(
        `https://43-203-179-188.sslip.io/groupbuys/${user_id}/scrap`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsScrapped((prev) => !prev);
    } catch (error) {
      console.error("스크랩 요청 에러:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <P.Container>
      <P.Header>
        <P.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={goPur} />
          <P.Title>공동구매 상세</P.Title>
        </P.Icons>

        <P.Icons>
          <img id="share" src={`${process.env.PUBLIC_URL}/images/Share.svg`} alt="share" onClick={handleShareClick} />
          {isMine && <img id="share" src={`${process.env.PUBLIC_URL}/images/Fix.svg`} alt="share" onClick={() => setShowPopup(!showPopup)} />}
        </P.Icons>
        {showPopup && (
          <P.Popup ref={popupRef}>
            <P.PopupItem>
              수정
              <img src={`${process.env.PUBLIC_URL}/images/write.svg`} alt="edit" onClick={() => goEdit(user_id)} />
            </P.PopupItem>
            <P.Hr />
            <P.PopupItem onClick={handleDeleteClick}>
              삭제
              <img src={`${process.env.PUBLIC_URL}/images/Trash_c.svg`} alt="edit" />
            </P.PopupItem>
          </P.Popup>
        )}
      </P.Header>

      <P.Content>
        <P.Pic>
          <img src={`https://43-203-179-188.sslip.io/uploads/r?key=${component.mainImageUrl}`} alt="임시" />
        </P.Pic>
        <P.Wrapper>
          <P.D_Title>{component.groupbuyTitle}</P.D_Title>
          <img id="star" src={`${process.env.PUBLIC_URL}/images/${isScrapped ? "star_y.svg" : "star_w.svg"}`} alt="star" onClick={handleScrapClick} />
        </P.Wrapper>
        <P.Wrapper style={{ justifyContent: "start", gap: "7px" }}>
          <P.D_Inform_gray>모집인원</P.D_Inform_gray>
          <P.D_Inform_black>{component.groupbuyCount}명</P.D_Inform_black>
          <P.D_State style={statusStyle}>{status}</P.D_State>
        </P.Wrapper>
        <P.Wrapper>
          <P.Profile>
            <img id="circle" src={`${process.env.PUBLIC_URL}/images/Circle.svg`} alt="circle" />
            <img id="cat" src={`${process.env.PUBLIC_URL}/images/profile.png`} alt="cat" />
            <div id="profile_inform">
              <div id="username">{component.authorName}</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "7px",
                  marginLeft: "10px",
                }}
              >
                <P.D_Inform_gray>게시물</P.D_Inform_gray>
                <P.D_Inform_black>{component.authorPostCount}개</P.D_Inform_black>
              </div>
            </div>
          </P.Profile>
          <P.PostDate>{renderDateOrRelative(component.createDate)}</P.PostDate>
        </P.Wrapper>
        <P.Post>{component.groupbuyDescription}</P.Post>
        <P.PostURL>
          <p>공동구매 링크</p>
          {Array.isArray(component.groupbuyLinkUrls) && component.groupbuyLinkUrls.length > 0 ? (
            component.groupbuyLinkUrls.map((link, idx) => (
              <p key={idx}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </p>
            ))
          ) : (
            <p></p>
          )}
        </P.PostURL>
        <P.Comment onClick={() => setIsOpen(true)}>
          <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`} alt="comment" />
          <div id="comment_cnt">{component.commentCount}</div>
        </P.Comment>
      </P.Content>
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} comments={comment} type="groupbuy" targetId={user_id}></BottomSheet>
    </P.Container>
  );
};

export default P_Detail;
