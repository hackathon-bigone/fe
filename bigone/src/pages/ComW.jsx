import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as W from "../styles/StyledComW";
import axios from "axios";

const API_BASE = "https://43-203-179-188.sslip.io/";

// 이미지 URL 보정
const buildImageUrl = (val) => {
  if (!val) return `${API_BASE}uploads/r?key=__none__`;
  return `${API_BASE}uploads/r?key=${encodeURIComponent(val)}`;
};

// 날짜 월/일만 표시
const formatDate = (val) => {
  if (!val) return "";
  const d = new Date(val);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${month}월 ${day}일`;
};

const ComW = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const goBack = () => {
    navigate(`/my`);
  };

  const goPur = () => {
    navigate(`/my/comment/purchase`);
  };

  const goToDetail = (postId) => {
    navigate(`/recipe/detail/${postId}`);
  };

  const [comments, setComments] = useState([]); // 내가 쓴 댓글
  const [recipes, setRecipes] = useState({}); // {postId: recipeData}

  // ✅ 좋아요 상태
  const [likedMap, setLikedMap] = useState({});

  // ✅ 스크랩 상태
  const SCRAP_STORAGE_KEY = `recipe_scraps_${(token || "guest").slice(-12)}`;
  const [scrappedMap, setScrappedMap] = useState(() => {
    try {
      const saved = localStorage.getItem(SCRAP_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [pending, setPending] = useState({}); // 스크랩 API 중복 방지

  // localStorage 스크랩 동기화
  useEffect(() => {
    try {
      localStorage.setItem(SCRAP_STORAGE_KEY, JSON.stringify(scrappedMap));
    } catch {}
  }, [scrappedMap]);

  // 스크랩 토글 함수
  const handleScrapToggle = async (e, postId) => {
    e.stopPropagation();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (pending[postId]) return;

    setPending((p) => ({ ...p, [postId]: true }));
    setScrappedMap((m) => ({ ...m, [postId]: !m[postId] }));

    try {
      await axios.post(`${API_BASE}recipe/${postId}/scrap`, null, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });
      console.log("✅ 스크랩 상태 변경 완료");
    } catch (err) {
      console.error("❌ 스크랩 토글 실패:", err);
      setScrappedMap((m) => ({ ...m, [postId]: !m[postId] })); // 실패 시 롤백
    } finally {
      setPending((p) => ({ ...p, [postId]: false }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 내가 쓴 댓글 목록
        const commentRes = await axios.get(
          `${API_BASE}mypage/comments/recipe`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ✅ 댓글 중복 제거: boardId 기준으로 unique 필터링
        const uniqueComments = commentRes.data.filter(
          (c, index, self) =>
            self.findIndex((v) => v.boardId === c.boardId) === index
        );
        setComments(uniqueComments);
        console.log("✅ 중복 제거된 댓글 목록:", uniqueComments);

        // 2. 전체 레시피 목록
        const recipeRes = await axios.get(`${API_BASE}recipe`);
        const recipeArray = recipeRes.data.boards || [];
        const recipeMap = {};
        recipeArray.forEach((recipe) => {
          recipeMap[recipe.postId] = recipe;
        });
        setRecipes(recipeMap);
        console.log("✅ 레시피 매핑 완료:", recipeMap);

        // 3. 좋아요 상태 불러오기
        if (token && recipeArray.length > 0) {
          const likedStatus = {};
          await Promise.all(
            recipeArray.map(async (recipe) => {
              try {
                const detailRes = await axios.get(
                  `${API_BASE}recipe/${recipe.postId}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                likedStatus[recipe.postId] =
                  !!detailRes.data.likedByCurrentUser;
              } catch {
                likedStatus[recipe.postId] = false;
              }
            })
          );
          setLikedMap(likedStatus);
        }
      } catch (err) {
        console.error("❌ 데이터 가져오기 실패:", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <W.Container>
      <W.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <W.Title>댓글 단 게시물</W.Title>
      </W.Header>
      <W.Category>
        <div id="recipe">레시피</div>
        <div id="purchase" onClick={goPur}>
          공동구매
        </div>
      </W.Category>
      <W.Body>
        {comments.length === 0 ? (
          <W.EmptyWrapper>
            <img
              src={`${process.env.PUBLIC_URL}/images/null.png`}
              alt="no posts"
            />
            <div>작성한 댓글이 없습니다.</div>
          </W.EmptyWrapper>
        ) : (
          comments.map((comment) => {
            const recipe = recipes[comment.boardId];
            return (
              <W.Component
                key={comment.commentId}
                onClick={() => recipe && goToDetail(recipe.postId)}
              >
                {/* 대표 이미지 */}
                {recipe?.mainImageUrl && (
                  <W.Image>
                    <img
                      src={buildImageUrl(recipe.mainImageUrl)}
                      alt="represent"
                    />
                  </W.Image>
                )}

                <W.Detail>
                  <W.Up>
                    <W.CTitle>
                      {recipe ? recipe.title : comment.boardTitle}
                    </W.CTitle>
                    <W.Scrap>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/${
                          scrappedMap[comment.boardId] ? "star_w" : "star_y"
                        }.svg`}
                        alt="scrap"
                        onClick={(e) => handleScrapToggle(e, comment.boardId)}
                        style={{
                          cursor: "pointer",
                          opacity: pending[comment.boardId] ? 0.6 : 1,
                        }}
                        aria-label={
                          scrappedMap[comment.boardId]
                            ? "스크랩 취소"
                            : "스크랩"
                        }
                      />
                    </W.Scrap>
                  </W.Up>
                  <W.Down>
                    <W.Icons>
                      {/* ✅ 좋아요 상태 연동 (조회 전용) */}
                      <img
                        id="heart"
                        src={`${process.env.PUBLIC_URL}/images/${
                          likedMap[comment.boardId]
                            ? "heart_b.png"
                            : "heart_w.svg"
                        }`}
                        alt="heart"
                        style={{
                          cursor: "default", // 클릭 비활성화
                          opacity: likedMap[comment.boardId] ? 1 : 0.6,
                        }}
                      />
                      <div id="hnum">{recipe?.likeCount ?? 0}</div>
                      <img
                        id="comment"
                        src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}
                        alt="comment"
                      />
                      <div id="cnum">{recipe?.commentCount ?? 0}</div>
                    </W.Icons>
                    <W.Date>{formatDate(comment.createdAt)}</W.Date>
                  </W.Down>
                </W.Detail>
              </W.Component>
            );
          })
        )}
      </W.Body>
    </W.Container>
  );
};

export default ComW;
