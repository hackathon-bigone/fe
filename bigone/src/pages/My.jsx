import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as M from "../styles/StyledMy";
import axios from "axios";

const My = () => {
  const navigate = useNavigate();

  // ----- 이동 함수 -----
  const goHome = () => navigate(`/home`);
  const goPur = () => navigate(`/purchase`);
  const goRec = () => navigate(`/recipe`);
  const goRef = () => navigate(`/refrigerator`);
  const goWro = () => navigate(`/my/wrote/recipe`);
  const goEdit = () => navigate(`/my/edit`);
  const goPw = () => navigate(`/my/edit/password`);
  const goScrap = () => navigate(`/my/scrap`);
  const goLogin = () => navigate(`/login`);
  const goSignup = () => navigate(`/signup`); // 라우트명 다르면 맞게 바꿔주세요

  // ----- 상태 -----
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [welcomeMsg, setWelcomeMsg] = useState(""); // 비로그인 안내문구
  const [profile, setProfile] = useState({
    username: "", // id 로 보여줌
    nickname: "", // name 으로 보여줌
  });

  // ----- 마이페이지 로드 -----
  useEffect(() => {
    const fetchMyPage = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsAuthed(false);
        setWelcomeMsg("로그인 하고 순삭의 다양한 서비스를 경험해보세요!");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://43.203.179.188/mypage", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 성공 케이스(명세: username, nickname)
        const { username, nickname } = res.data || {};
        if (username && nickname) {
          setProfile({ username, nickname });
          setIsAuthed(true);
        } else {
          // 예외적으로 스키마가 다르거나 비어있을 때
          setIsAuthed(false);
          setWelcomeMsg("로그인 하고 순삭의 다양한 서비스를 경험해보세요!");
        }

        const countRes = await axios.get(
          "http://43.203.179.188/mypage/my-posts/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPostCount(countRes.data.totalPosts);

        const commentRes = await axios.get(
          "http://43.203.179.188/mypage/my-comments/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCommentCount(commentRes.data.totalCommentCount);
      } catch (err) {
        console.error("❌ /mypage 호출 실패:", err?.response || err);
        setIsAuthed(false);
        // 실패 응답 바디에 message 가 있다면 사용
        const msg =
          err?.response?.data?.message ||
          "로그인 하고 순삭의 다양한 서비스를 경험해보세요!";
        setWelcomeMsg(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPage();
  }, []);

  // ----- 로그아웃 -----
  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("이미 로그아웃 상태입니다.");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post("http://43.203.179.188/user/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ 로그아웃 성공:", res.data);
      localStorage.removeItem("access_token");
      alert("로그아웃 되었습니다.");
      setIsAuthed(false);
      setWelcomeMsg("로그인 하고 순삭의 다양한 서비스를 경험해보세요!");
      navigate("/login");
    } catch (err) {
      console.error("❌ 로그아웃 실패:", err?.response || err);
      alert("서버 에러로 로그아웃에 실패했습니다.");
    }
  };

  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  return (
    <M.Container>
      <M.Header>
        <div>마이페이지</div>
      </M.Header>
      <M.Profile>
        <M.Welcome>
          {loading ? (
            <div id="welcome">불러오는 중...</div>
          ) : isAuthed ? (
            <>
              <M.Name>
                {/* name <- nickname */}
                <div id="name">{profile.nickname}</div>
                <div id="sama">님,</div>
              </M.Name>
              <div id="welcome">반가워요!</div>
              {/* id <- username */}
              <div id="id">{profile.username}</div>
            </>
          ) : (
            // 비로그인: 안내 문구만 전체 출력
            <div id="welcome">{welcomeMsg}</div>
          )}
        </M.Welcome>
        <M.Image>
          <img src={`${process.env.PUBLIC_URL}/images/profile.png`} alt="" />
        </M.Image>
      </M.Profile>
      {/* 버튼: 로그인 여부에 따라 분기 */}
      <M.Button>
        {isAuthed ? (
          <>
            <div id="edit" onClick={goEdit}>
              프로필 수정
            </div>
            <div id="logout" onClick={handleLogout}>
              로그아웃
            </div>
          </>
        ) : (
          <>
            <div id="edit" onClick={goLogin}>
              로그인
            </div>
            <div id="logout" onClick={goSignup}>
              회원가입
            </div>
          </>
        )}
      </M.Button>

      <M.Activity>
        <M.ATitle>나의 활동 내역</M.ATitle>
        <M.AList>
          <M.Write onClick={goWro}>
            <img
              src={`${process.env.PUBLIC_URL}/images/pencil.png`}
              alt="write"
            />
            <div id="num">{postCount}</div> {/* ✅ totalPosts 표시 */}
            <div id="title">작성한 게시물</div>
          </M.Write>
          <M.Hr />
          <M.Comment>
            <img
              src={`${process.env.PUBLIC_URL}/images/declaration.png`}
              alt="comment"
            />
            <div id="num">{commentCount}</div> {/* ✅ 수정된 부분 */}
            <div id="title">댓글 단 게시물</div>
          </M.Comment>
          <M.Hr />
          <M.Scrap onClick={goScrap}>
            <img
              src={`${process.env.PUBLIC_URL}/images/star.png`}
              alt="scrap"
            />
            <div id="num">4</div>
            <div id="title">스크랩</div>
          </M.Scrap>
        </M.AList>
      </M.Activity>

      <M.Help>
        <M.HTitle>고객지원</M.HTitle>
        <M.HList>
          <M.Announce>
            <img
              src={`${process.env.PUBLIC_URL}/images/announcement.png`}
              alt="announcement"
            />
            <div id="title">공지사항</div>
          </M.Announce>
          <M.Hr />
          <M.Qna>
            <img src={`${process.env.PUBLIC_URL}/images/qna.png`} alt="qna" />
            <div id="title">Q&A</div>
          </M.Qna>
          <M.Hr />
          <M.Declar>
            <img
              src={`${process.env.PUBLIC_URL}/images/comment.png`}
              alt="declaration"
            />
            <div id="title">신고</div>
          </M.Declar>
        </M.HList>
      </M.Help>

      <M.Nav>
        <M.NHome onClick={goHome}>
          <img src={`${process.env.PUBLIC_URL}/images/home_w.svg`} alt="home" />
          <div>홈</div>
        </M.NHome>
        <M.NRefri onClick={goRef}>
          <img
            src={`${process.env.PUBLIC_URL}/images/refrigerator_w.svg`}
            alt="refrigerator"
          />
          <div>냉장고</div>
        </M.NRefri>
        <M.NRecipe onClick={goRec}>
          <img
            src={`${process.env.PUBLIC_URL}/images/recipe_w.svg`}
            alt="recipe"
          />
          <div>레시피</div>
        </M.NRecipe>
        <M.NPur onClick={goPur}>
          <img
            src={`${process.env.PUBLIC_URL}/images/purchase_w.svg`}
            alt="purchase"
          />
          <div>공동구매</div>
        </M.NPur>
        <M.NMy>
          <img src={`${process.env.PUBLIC_URL}/images/my_b.svg`} alt="my" />
          <div>마이</div>
        </M.NMy>
      </M.Nav>
    </M.Container>
  );
};

export default My;
