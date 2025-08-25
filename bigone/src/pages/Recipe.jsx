import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledRecipe";
import axios from "axios";

const API_BASE = "https://43-203-179-188.sslip.io/";
const token = localStorage.getItem("access_token");

const buildImageUrl = (val) => {
  if (!val) {
    // ✅ 이미지 없을 경우 SVG 플레이스홀더
    return `https://43-203-179-188.sslip.io/uploads/r?key=__none__`;
  }
  if (/^https?:\/\//i.test(val)) {
    // ✅ 절대 URL이면 그대로 사용
    return val;
  }
  if (val.startsWith("/uploads/")) {
    return `https://43-203-179-188.sslip.io${val.replace(/^\//, "")}`;
  }
  if (val.startsWith("uploads/")) {
    return `https://43-203-179-188.sslip.io/${val}`;
  }
  // ✅ 나머지는 전부 S3 키 → Viewer 엔드포인트 사용
  return `https://43-203-179-188.sslip.io/uploads/r?key=${encodeURIComponent(
    val
  )}`;
};

const CATEGORY_PARAM_MAP = {
  전체: null,
  왕초보: "왕초보",
  "전자레인지 · 에어프라이어": "전자레인지/에어프라이어",
  디저트: "디저트",
  비건: "비건",
};

const CATEGORY_LIST = Object.keys(CATEGORY_PARAM_MAP);
const SCRAP_STORAGE_KEY = `recipe_scraps_${(token || "guest").slice(-12)}`;

const Recipe = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedSort, setSelectedSort] = useState("popular");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isOpen, setIsOpen] = useState(false);
  const [scrappedMap, setScrappedMap] = useState({});
  const [scrapPending, setScrapPending] = useState({});
  const cancelRef = useRef(null);

  const goMy = () => {
    navigate(`/my`);
  };

  const goHome = () => {
    navigate(`/`);
  };

  const goPur = () => {
    navigate(`/purchase`);
  };

  const goRef = () => {
    navigate(`/refrigerator`);
  };

  const goToDetail = (postId) => navigate(`/recipe/detail/${postId}`);
  const goScrap = () => navigate(`/my/scrap`);

  // ✅ 스크랩 목록 초기화
  useEffect(() => {
    const fetchScraps = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_BASE}mypage/recipe-scrap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const init = {};
        (res.data || []).forEach((r) => {
          init[r.postId] = true;
        });
        setScrappedMap(init);
      } catch (err) {
        console.error("❌ 스크랩 목록 불러오기 실패:", err);
      }
    };
    fetchScraps();
  }, [token]);

  // ✅ 레시피 목록 가져오기 (likedByCurrentUser 포함)
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}recipe?sort=${selectedSort}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setRecipes(response.data.boards || []);
    } catch (error) {
      console.error("레시피 불러오기 실패:", error);
      setRecipes([]);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [selectedSort]);

  // ✅ 스크랩 토글
  const handleScrapToggle = async (e, postId) => {
    e.stopPropagation();
    if (!token) return navigate("/login");
    if (scrapPending[postId]) return;

    setScrapPending((p) => ({ ...p, [postId]: true }));
    setScrappedMap((m) => ({ ...m, [postId]: !m[postId] }));

    try {
      await axios.post(`${API_BASE}recipe/${postId}/scrap`, null, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });
    } catch (err) {
      console.error("❌ 스크랩 토글 실패:", err);
      setScrappedMap((m) => ({ ...m, [postId]: !m[postId] }));
    } finally {
      setScrapPending((p) => ({ ...p, [postId]: false }));
    }
  };

  const [likedMap, setLikedMap] = useState({});

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // 1) 전체 레시피 목록 가져오기
        const response = await axios.get(
          `${API_BASE}recipe?sort=${selectedSort}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        const boards = response.data.boards || [];
        setRecipes(boards);

        // 2) 각 레시피의 좋아요 상태 조회
        if (token && boards.length > 0) {
          const likedStatus = {};
          await Promise.all(
            boards.map(async (recipe) => {
              try {
                const detailRes = await axios.get(
                  `${API_BASE}recipe/${recipe.postId}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                likedStatus[recipe.postId] = detailRes.data.likedByCurrentUser;
              } catch (err) {
                console.error(
                  `❌ 좋아요 상태 조회 실패: ${recipe.postId}`,
                  err
                );
              }
            })
          );
          setLikedMap(likedStatus);
        }
      } catch (error) {
        console.error("❌ 레시피 불러오기 실패:", error);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, [selectedSort, token]);

  return (
    <R.Container>
      <R.Header>
        <R.Title>레시피</R.Title>
        <R.Icons>
          <img
            onClick={goScrap}
            id="scrap"
            src={`${process.env.PUBLIC_URL}/images/scrap.svg`}
            alt="scrap"
          />
          <img
            id="bar"
            src={`${process.env.PUBLIC_URL}/images/pencil_w.svg`}
            alt="pencil"
            onClick={() => navigate(`/recipe/write`)}
          />
        </R.Icons>
      </R.Header>

      <R.Category>
        <div>{selectedCategory}</div>
        <img
          src={`${process.env.PUBLIC_URL}/images/more.svg`}
          alt="more"
          onClick={() => setIsOpen(!isOpen)}
        />
      </R.Category>

      {isOpen && <R.Overlay onClick={() => setIsOpen(false)} />}
      <R.Sheet isOpen={isOpen}>
        <h4>카테고리 설정</h4>
        <ul>
          {CATEGORY_LIST.map((label) => (
            <li
              key={label}
              onClick={() => {
                setSelectedCategory(label);
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            >
              {label}
            </li>
          ))}
        </ul>
        <R.CloseButton onClick={() => setIsOpen(false)}>×</R.CloseButton>
      </R.Sheet>

      <R.Body>
        <R.Condition>
          <R.Post>
            <div id="title">게시물</div>
            <div id="num">{recipes.length}</div>
            <div id="gun">건</div>
          </R.Post>
          <R.Select>
            <R.Popular
              selected={selectedSort === "popular"}
              onClick={() => setSelectedSort("popular")}
            >
              <div id="dot" />
              <div id="detail">인기순</div>
            </R.Popular>
            <R.New
              selected={selectedSort === "new"}
              onClick={() => setSelectedSort("new")}
            >
              <div id="dot" />
              <div id="detail">최신순</div>
            </R.New>
          </R.Select>
        </R.Condition>

        <R.List>
          {recipes.map((recipe) => (
            <R.Component
              key={recipe.postId}
              onClick={() => goToDetail(recipe.postId)}
            >
              <R.Image>
                <img
                  src={buildImageUrl(recipe.mainImageUrl)}
                  alt={recipe.title ?? "recipe"}
                  loading="lazy"
                  onError={(e) => {
                    // ✅ 이미지 로드 실패 시 플레이스홀더로 대체
                    e.currentTarget.src = `https://43-203-179-188.sslip.io/uploads/r?key=__none__`;
                  }}
                />
              </R.Image>
              <R.Detail>
                <R.Up>
                  <R.CTitle>{recipe.title}</R.CTitle>
                  <R.Scrap>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/${
                        scrappedMap[recipe.postId] ? "star_y" : "star_w"
                      }.svg`}
                      alt="scrap"
                      onClick={(e) => handleScrapToggle(e, recipe.postId)}
                      style={{
                        cursor: "pointer",
                        opacity: scrapPending[recipe.postId] ? 0.6 : 1,
                      }}
                    />
                  </R.Scrap>
                </R.Up>
                <R.Down>
                  <R.Icon>
                    <img
                      id="heart"
                      src={`${process.env.PUBLIC_URL}/images/${
                        likedMap[recipe.postId] ? "heart_b.png" : "heart_w.svg"
                      }`}
                      alt={
                        likedMap[recipe.postId] ? "좋아요됨" : "좋아요 안 됨"
                      }
                      style={{
                        cursor: "default", // 클릭 비활성화
                        opacity: likedMap[recipe.postId] ? 1 : 0.6,
                      }}
                    />
                    <div id="hnum">{recipe.likeCount}</div>

                    <img
                      id="comment"
                      src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}
                      alt="comment"
                    />
                    <div id="cnum">{recipe.commentCount}</div>
                  </R.Icon>

                  <R.Date>{recipe.createdAt}</R.Date>
                </R.Down>
              </R.Detail>
            </R.Component>
          ))}
        </R.List>
      </R.Body>

      <R.Nav>
        <R.NHome onClick={goHome}>
          <img src={`${process.env.PUBLIC_URL}/images/home_w.svg`} alt="home" />
          <div>홈</div>
        </R.NHome>
        <R.NRefri onClick={goRef}>
          <img
            src={`${process.env.PUBLIC_URL}/images/refrigerator_w.svg`}
            alt="refrigerator"
          />
          <div>냉장고</div>
        </R.NRefri>
        <R.NRecipe>
          <img
            src={`${process.env.PUBLIC_URL}/images/recipe_b.svg`}
            alt="recipe"
          />
          <div>레시피</div>
        </R.NRecipe>
        <R.NPur onClick={goPur}>
          <img
            src={`${process.env.PUBLIC_URL}/images/purchase_w.svg`}
            alt="purchase"
          />
          <div>공동구매</div>
        </R.NPur>
        <R.NMy onClick={goMy}>
          <img src={`${process.env.PUBLIC_URL}/images/my_w.svg`} alt="my" />
          <div>마이</div>
        </R.NMy>
      </R.Nav>
    </R.Container>
  );
};

export default Recipe;
