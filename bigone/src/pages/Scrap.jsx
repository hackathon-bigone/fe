import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as W from "../styles/StyledScrap";
import axios from "axios";

const API_BASE = "https://43-203-179-188.sslip.io/";
const token = localStorage.getItem("access_token");

const buildImageUrl = (val) => {
  if (!val) return `${API_BASE}uploads/r?key=__none__`;
  if (/^https?:\/\//i.test(val)) return val;
  if (val.startsWith("/uploads/"))
    return `${API_BASE}${val.replace(/^\//, "")}`;
  if (val.startsWith("uploads/")) return `${API_BASE}${val}`;
  return `${API_BASE}uploads/r?key=${encodeURIComponent(val)}`;
};

// 사용자별 로컬스토리지 키 (토큰 끝 12자리로 네임스페이스)
const LIKE_STORAGE_KEY = `recipe_likes_${(token || "guest").slice(-12)}`;

const Scrap = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my`);
  };

  const goPur = () => {
    navigate(`/my/scrap/purchase`);
  };
  const goDetail = (postId) => navigate(`/recipe/detail/${postId}`);

  const [isScrapped, setIsScrapped] = useState(false);

  const handleScrapClick = () => {
    setIsScrapped((prev) => !prev);
  };

  const [isHeart, setIsHeart] = useState(false);

  const handleHeart = () => {
    setIsHeart((prev) => !prev);
  };

  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("access_token");
  const [scrappedMap, setScrappedMap] = useState({});
  const [pending, setPending] = useState({}); // 중복 클릭 방지

  // 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!token) {
          console.warn("No access_token");
          setPosts([]);
          return;
        }
        const res = await axios.get(`${API_BASE}mypage/recipe-scrap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.boards)
          ? res.data.boards
          : [];
        setPosts(list);
        // 마이페이지-스크랩 목록은 전부 스크랩된 항목 → 초기값 true
        const init = {};
        list.forEach((p) => (init[p.postId] = true));
        setScrappedMap(init);

        console.log("✅ 스크랩 목록:", list);
      } catch (err) {
        console.error("❌ 스크랩 목록 가져오기 실패:", err);
        setPosts([]);
      }
    };
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 스크랩 토글 (해제 시 목록에서 제거)
  const handleScrapToggle = async (e, postId) => {
    e.stopPropagation(); // 카드 클릭으로 상세 이동 방지
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (pending[postId]) return;

    // 낙관적 업데이트
    setPending((p) => ({ ...p, [postId]: true }));
    setScrappedMap((m) => ({ ...m, [postId]: !m[postId] }));

    try {
      await axios.post(`${API_BASE}recipe/${postId}/scrap`, null, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });

      // 스크랩 해제된 경우 목록에서 제거
      setPosts((prev) => prev.filter((p) => p.postId !== postId));
    } catch (err) {
      console.error("스크랩 토글 실패:", err);
      // 롤백
      setScrappedMap((m) => ({ ...m, [postId]: !m[postId] }));
    } finally {
      setPending((p) => ({ ...p, [postId]: false }));
    }
  };

  // ✅ 게시글별 좋아요 여부 (초기 복원)
  const [likedMap, setLikedMap] = useState(() => {
    try {
      const saved = localStorage.getItem(LIKE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 중복 클릭 방지
  const [likePending, setLikePending] = useState({});
  useEffect(() => {
    try {
      localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(likedMap));
    } catch {}
  }, [likedMap, LIKE_STORAGE_KEY]);

  useEffect(() => {
    const fromServer = {};
    posts.forEach((p) => {
      if (typeof p.liked !== "undefined") fromServer[p.postId] = !!p.liked;
    });
    if (Object.keys(fromServer).length) {
      setLikedMap((prev) => ({ ...prev, ...fromServer }));
    }
  }, [posts]);

  const handleLikeToggle = async (e, postId) => {
    e.stopPropagation(); // 카드 클릭 이동 방지 (있다면)
    if (!token) return alert("로그인이 필요합니다.");
    if (likePending[postId]) return;

    const willLike = !likedMap[postId]; // true면 +1, false면 -1

    // 낙관적 업데이트: 아이콘/카운트 먼저 반영
    setLikePending((p) => ({ ...p, [postId]: true }));
    setLikedMap((m) => ({ ...m, [postId]: willLike }));
    setPosts((prev) =>
      prev.map((p) =>
        p.postId === postId
          ? {
              ...p,
              likeCount: Math.max(0, (p.likeCount ?? 0) + (willLike ? 1 : -1)),
            }
          : p
      )
    );

    try {
      await axios.post(`${API_BASE}recipe/${postId}/like`, null, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });
      // 성공 시 그대로 유지
    } catch (err) {
      console.error("좋아요 토글 실패:", err);
      // 롤백
      setLikedMap((m) => ({ ...m, [postId]: !willLike }));
      setPosts((prev) =>
        prev.map((p) =>
          p.postId === postId
            ? {
                ...p,
                likeCount: Math.max(
                  0,
                  (p.likeCount ?? 0) + (willLike ? -1 : 1)
                ),
              }
            : p
        )
      );
    } finally {
      setLikePending((p) => ({ ...p, [postId]: false }));
    }
  };

  return (
    <W.Container>
      <W.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <W.Title>스크랩</W.Title>
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
            <div>스크랩한 게시물이 없습니다.</div>
          </W.EmptyWrapper>
        ) : (
          posts.map((post) => (
            <W.Component
              key={post.postId}
              onClick={() => goDetail(post.postId)}
            >
              <W.Image>
                <img src={buildImageUrl(post.mainImageUrl)} alt="represent" />
              </W.Image>

              <W.Detail>
                <W.Up>
                  <W.CTitle>{post.title}</W.CTitle>
                  <W.Scrap>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/${
                        scrappedMap[post.postId] ? "star_y" : "star_w"
                      }.svg`}
                      alt="scrap"
                      onClick={(e) => handleScrapToggle(e, post.postId)}
                      style={{
                        cursor: "pointer",
                        opacity: pending[post.postId] ? 0.6 : 1,
                      }}
                      aria-label={
                        scrappedMap[post.postId] ? "스크랩 취소" : "스크랩"
                      }
                    />
                  </W.Scrap>
                </W.Up>

                <W.Down>
                  <W.Icons>
                    <img
                      id="heart"
                      src={`${process.env.PUBLIC_URL}/images/${
                        likedMap[post.postId] ? "heart_b.png" : "heart_w.svg"
                      }`}
                      alt={likedMap[post.postId] ? "좋아요 취소" : "좋아요"}
                      onClick={(e) => handleLikeToggle(e, post.postId)}
                      style={{
                        cursor: "pointer",
                        opacity: likePending[post.postId] ? 0.6 : 1,
                      }}
                    />
                    <div id="hnum">{post.likeCount ?? 0}</div>
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

export default Scrap;
