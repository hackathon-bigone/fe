import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as W from "../styles/StyledWrote";
import axios from "axios";

const API_BASE = "https://43-203-179-188.sslip.io/";

// 이미지 URL 보정 (키 → /uploads/r?key=)
const buildImageUrl = (val) => {
  if (!val) return `${API_BASE}uploads/r?key=__none__`;
  return `${API_BASE}uploads/r?key=${encodeURIComponent(val)}`;
};

const Wrote = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const goBack = () => navigate(`/my`);
  const goPur = () => navigate(`/my/wrote/purchase`);
  const goDetail = (postId) => navigate(`/recipe/detail/${postId}`);

  const [posts, setPosts] = useState([]);
  const [likedMap, setLikedMap] = useState({}); // 좋아요 상태
  const [scrappedMap, setScrappedMap] = useState({}); // 스크랩 상태
  const [scrapPending, setScrapPending] = useState({}); // 중복 클릭 방지

  // 스크랩 토글
  const handleScrapToggle = async (e, postId) => {
    e.stopPropagation(); // 카드 클릭 방지
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (scrapPending[postId]) return;

    // 낙관적 업데이트
    setScrapPending((p) => ({ ...p, [postId]: true }));
    setScrappedMap((m) => ({ ...m, [postId]: !m[postId] }));

    try {
      await axios.post(`${API_BASE}recipe/${postId}/scrap`, null, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });
      // 성공 시 그대로 유지
    } catch (err) {
      console.error("❌ 스크랩 토글 실패:", err);
      // 실패 롤백
      setScrappedMap((m) => ({ ...m, [postId]: !m[postId] }));
    } finally {
      setScrapPending((p) => ({ ...p, [postId]: false }));
    }
  };

  // 작성한 게시물 + 좋아요/스크랩 상태 로드
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // 1) 내가 작성한 게시물
        const res = await axios.get(`${API_BASE}mypage/my-boards`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data || [];
        setPosts(data);

        // 2) 좋아요 상태 (개별 상세 호출로 likedByCurrentUser 조회)
        if (token && data.length > 0) {
          const likedStatus = {};
          await Promise.all(
            data.map(async (post) => {
              try {
                const detail = await axios.get(
                  `${API_BASE}recipe/${post.postId}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                likedStatus[post.postId] = !!detail.data.likedByCurrentUser;
              } catch (e) {
                likedStatus[post.postId] = false;
              }
            })
          );
          setLikedMap(likedStatus);
        }

        // 3) 스크랩 상태 (스크랩 목록으로 초기화)
        try {
          const scrapRes = await axios.get(`${API_BASE}mypage/recipe-scrap`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const init = {};
          (scrapRes.data || []).forEach((item) => {
            init[item.postId] = true; // 스크랩한 postId는 true
          });
          setScrappedMap(init);
        } catch (e) {
          console.error("❌ 스크랩 목록 불러오기 실패:", e);
        }
      } catch (err) {
        console.error("❌ 게시글 가져오기 실패:", err);
        setPosts([]);
      }
    };

    fetchAll();
  }, [token]);

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
            <W.Component
              key={post.postId}
              onClick={() => goDetail(post.postId)}
            >
              <W.Image>
                <img
                  src={buildImageUrl(post.mainImageUrl)}
                  alt="represent"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `${API_BASE}uploads/r?key=__none__`;
                  }}
                />
              </W.Image>

              <W.Detail>
                <W.Up>
                  <W.CTitle>{post.title}</W.CTitle>
                </W.Up>

                <W.Down>
                  <W.Icons>
                    {/* ❤️ 좋아요: 클릭 비활성화, 서버 상태 표시 */}
                    <img
                      id="heart"
                      src={`${process.env.PUBLIC_URL}/images/${
                        likedMap[post.postId] ? "heart_b.png" : "heart_w.svg"
                      }`}
                      alt={likedMap[post.postId] ? "좋아요됨" : "좋아요 안 됨"}
                      style={{
                        cursor: "default",
                        opacity: likedMap[post.postId] ? 1 : 0.6,
                      }}
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
