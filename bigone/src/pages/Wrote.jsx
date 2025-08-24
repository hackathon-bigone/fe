import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as W from "../styles/StyledWrote";
import axios from "axios";

const Wrote = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my`);
  };

  const goPur = () => {
    navigate(`/my/wrote/purchase`);
  };

  const [isScrapped, setIsScrapped] = useState(false);

  const handleScrapClick = () => {
    setIsScrapped((prev) => !prev);
  };

  const [isHeart, setIsHeart] = useState(false);

  const handleHeart = () => {
    setIsHeart((prev) => !prev);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(
          "https://43-203-179-188.sslip.io/mypage/my-boards",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(res.data); // 응답이 배열 형태
        console.log("✅ 게시글 목록:", res.data);
      } catch (err) {
        console.error("❌ 게시글 가져오기 실패:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <W.Container>
      <W.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <W.Title>작성한 게시물</W.Title>
      </W.Header>
      <W.Category>
        <div id="recipe">레시피</div>
        <div id="purchase" onClick={goPur}>
          공동구매
        </div>
      </W.Category>
      <W.Body>
        {posts.length === 0 ? (
          <W.EmptyWrapper>
            <img
              src={`${process.env.PUBLIC_URL}/images/null.png`}
              alt="no posts"
            />
            <div>작성한 게시물이 없습니다.</div>
          </W.EmptyWrapper>
        ) : (
          posts.map((post) => (
            <W.Component key={post.postId}>
              <W.Image>
                <img
                  src={`https://43-203-179-188.sslip.io/${post.mainImageUrl}`}
                  alt="represent"
                />
              </W.Image>
              <W.Detail>
                <W.Up>
                  <W.CTitle>{post.title}</W.CTitle>
                </W.Up>
                <W.Down>
                  <W.Icons>
                    <img
                      id="heart"
                      src={`${process.env.PUBLIC_URL}/images/heart_w.svg`}
                      alt="heart"
                    />
                    <div id="hnum">{post.likeCount}</div>
                    <img
                      id="comment"
                      src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}
                      alt="comment"
                    />
                    <div id="cnum">{post.commentCount}</div>
                  </W.Icons>
                  <W.Date>{post.createdAt}</W.Date>
                </W.Down>
              </W.Detail>
            </W.Component>
          ))
        )}
      </W.Body>
    </W.Container>
  );
};

export default Wrote;
