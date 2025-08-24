import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledRecipe";
import axios from "axios";

const API_BASE = "https://43-203-179-188.sslip.io/";

const buildImageUrl = (val) => {
  if (!val) return `${API_BASE}uploads/r?key=__none__`;
  if (/^https?:\/\//i.test(val)) return val;
  if (val.startsWith("/uploads/"))
    return `${API_BASE}${val.replace(/^\//, "")}`;
  if (val.startsWith("uploads/")) return `${API_BASE}${val}`;
  return `${API_BASE}uploads/r?key=${encodeURIComponent(val)}`;
};

/* 숫자 안전 파싱 (totalCount 없거나 문자열일 때 대비) */
const pickCount = (data, list) => {
  const raw = data?.totalCount;
  const n = raw === undefined || raw === null ? NaN : Number(raw);
  return Number.isFinite(n) ? n : list.length;
};

/* 디바운스 훅 (검색용) */
function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

/* UI 라벨 → 백엔드 파라미터 매핑
   - 스샷 명세에 맞춰 슬래시(/) 표기 사용
*/
const CATEGORY_PARAM_MAP = {
  전체: null,
  왕초보: "왕초보",
  "전자레인지 · 에어프라이어": "전자레인지/에어프라이어",
  디저트: "디저트",
  비건: "비건",
};

const CATEGORY_LIST = Object.keys(CATEGORY_PARAM_MAP);
const token = localStorage.getItem("access_token");

// 🔑 사용자별로 분리된 저장 키 (토큰 없으면 guest)
const SCRAP_STORAGE_KEY = `recipe_scraps_${(token || "guest").slice(-12)}`;

// 사용자별 저장키
const LIKE_STORAGE_KEY = `recipe_likes_${(token || "guest").slice(-12)}`;

const Recipe = () => {
  const navigate = useNavigate();

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

  const goWrite = () => {
    navigate(`/recipe/write`);
  };

  const goToDetail = (postId) => {
    navigate(`/recipe/detail/${postId}`);
  };

  const goScrap = () => navigate(`/my/scrap`);

  const [isScrapped, setIsScrapped] = useState(false);

  const handleScrapClick = () => {
    setIsScrapped((prev) => !prev);
  };

  const [isHeart, setIsHeart] = useState(false);

  const handleHeart = () => {
    setIsHeart((prev) => !prev);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 기본 '전체'

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  const [selectedSort, setSelectedSort] = useState("popular");

  const handleSelectSort = (type) => {
    setSelectedSort(type);
  };

  const [recipes, setRecipes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  // ✅ 검색어 상태
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  /* in-flight 취소 */
  const cancelRef = useRef(null);
  const cancelInFlight = () => {
    if (cancelRef.current) {
      cancelRef.current.cancel("cancel previous");
      cancelRef.current = null;
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://43-203-179-188.sslip.io/recipe?sort=${selectedSort}`
        );
        console.log("응답 데이터:", response.data); // 응답 구조 확인용
        setRecipes(response.data.boards); // ✅ 배열만 추출해서 세팅!
      } catch (error) {
        console.error("레시피 불러오기 실패:", error);
      }
    };

    fetchRecipes();
  }, [selectedSort]);

  // 키워드 정규화: " 초콜릿,  순두부  " -> "초콜릿,순두부"
  const buildKeywords = (raw) =>
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(",");

  // 기본 리스트(정렬) 가져오기
  const fetchSorted = async () => {
    cancelInFlight();
    const src = axios.CancelToken.source();
    cancelRef.current = src;

    try {
      const res = await axios.get(`${API_BASE}recipe`, {
        params: { sort: selectedSort },
        cancelToken: src.token,
      });
      setRecipes(Array.isArray(res.data?.boards) ? res.data.boards : []);
      setTotalCount(
        typeof res.data?.totalCount === "number"
          ? res.data.totalCount
          : res.data?.boards?.length ?? 0
      );
    } catch (e) {
      if (!axios.isCancel(e)) console.error("정렬 리스트 불러오기 실패:", e);
      setRecipes([]);
      setTotalCount(0);
    } finally {
      cancelRef.current = null;
    }
  };

  // 검색 호출
  const fetchSearch = async (keywords) => {
    cancelInFlight();
    const src = axios.CancelToken.source();
    cancelRef.current = src;

    try {
      const res = await axios.get(`${API_BASE}recipe/search`, {
        params: { keywords },
        // axios가 알아서 인코딩합니다
        cancelToken: src.token,
      });
      setRecipes(Array.isArray(res.data?.boards) ? res.data.boards : []);
      setTotalCount(
        typeof res.data?.totalCount === "number"
          ? res.data.totalCount
          : res.data?.boards?.length ?? 0
      );
    } catch (e) {
      if (!axios.isCancel(e)) console.error("검색 실패:", e);
      setRecipes([]);
      setTotalCount(0);
    } finally {
      cancelRef.current = null;
    }
  };

  /* 카테고리 호출 (검색어 없고, 카테고리!=전체) */
  const fetchCategory = async (categoryLabel) => {
    const categoryParam = CATEGORY_PARAM_MAP[categoryLabel] ?? null;
    if (!categoryParam) {
      // 전체면 정렬 리스트로 대체
      return fetchSorted();
    }
    cancelInFlight();
    const src = axios.CancelToken.source();
    cancelRef.current = src;
    try {
      const res = await axios.get(`${API_BASE}recipe`, {
        params: { category: categoryParam },
        cancelToken: src.token,
      });
      const list = Array.isArray(res.data?.boards) ? res.data.boards : [];
      setRecipes(list);
      setTotalCount(pickCount(res.data, list));
    } catch (e) {
      if (!axios.isCancel(e)) console.error("카테고리 조회 실패:", e);
      setRecipes([]);
      setTotalCount(0);
    } finally {
      cancelRef.current = null;
    }
  };

  /* 최초 로드 / 정렬 변경 시: 검색어 없고 카테고리=전체일 때만 */
  useEffect(() => {
    if (debouncedQuery.trim()) return;
    if (selectedCategory !== "전체") return;
    fetchSorted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort]);

  // 디바운스된 검색어 변화 감지
  useEffect(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      // 검색어가 비면 기본 리스트로 복귀
      fetchSorted();
    } else {
      fetchSearch(buildKeywords(q));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  /* 카테고리 변경 시 (검색어 없을 때만) */
  useEffect(() => {
    if (debouncedQuery.trim()) return;
    fetchCategory(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  /* 모달에서 카테고리 클릭 */
  const onClickCategory = (label) => {
    setSelectedCategory(label);
    setIsOpen(false);
  };

  /* Enter 즉시 검색 */
  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const q = query.trim();
      if (q) fetchSearch(buildKeywords(q));
      else {
        if (selectedCategory === "전체") fetchSorted();
        else fetchCategory(selectedCategory);
      }
    }
  };

  // ✅ 새로고침해도 유지되도록 localStorage에서 복원
  const [scrappedMap, setScrappedMap] = useState(() => {
    try {
      const saved = localStorage.getItem(SCRAP_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 중복 클릭 방지
  const [scrapPending, setScrapPending] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem(SCRAP_STORAGE_KEY, JSON.stringify(scrappedMap));
    } catch {}
  }, [scrappedMap, SCRAP_STORAGE_KEY]);

  useEffect(() => {
    const fromServer = {};
    recipes.forEach((r) => {
      if (typeof r.scrapped !== "undefined") {
        fromServer[r.postId] = !!r.scrapped;
      }
    });
    if (Object.keys(fromServer).length) {
      setScrappedMap((prev) => ({ ...prev, ...fromServer }));
    }
  }, [recipes]);

  useEffect(() => {
    const init = {};
    recipes.forEach((r) => {
      if (typeof r.scrapped !== "undefined") init[r.postId] = !!r.scrapped;
    });
    if (Object.keys(init).length) {
      setScrappedMap((prev) => ({ ...prev, ...init }));
    }
  }, [recipes]);

  const handleScrapToggle = async (e, postId) => {
    e.stopPropagation(); // 카드 onClick 방지
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (scrapPending[postId]) return;

    // 낙관적 업데이트
    setScrapPending((p) => ({ ...p, [postId]: true }));
    setScrappedMap((p) => ({ ...p, [postId]: !p[postId] }));

    try {
      await axios.post(`${API_BASE}recipe/${postId}/scrap`, null, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });
      // 성공: 그대로 유지 (로컬스토리지는 useEffect로 저장됨)
    } catch (err) {
      console.error("스크랩 요청 실패:", err);
      // 실패: 롤백
      setScrappedMap((p) => ({ ...p, [postId]: !p[postId] }));
    } finally {
      setScrapPending((p) => ({ ...p, [postId]: false }));
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
  // 저장 동기화
  useEffect(() => {
    try {
      localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(likedMap));
    } catch {}
  }, [likedMap, LIKE_STORAGE_KEY]);

  // (선택) 서버가 r.liked 내려주면 초기 병합
  useEffect(() => {
    const fromServer = {};
    recipes.forEach((r) => {
      if (typeof r.liked !== "undefined") fromServer[r.postId] = !!r.liked;
    });
    if (Object.keys(fromServer).length) {
      setLikedMap((prev) => ({ ...prev, ...fromServer }));
    }
  }, [recipes]);

  const handleLikeToggle = async (e, postId) => {
    e.stopPropagation(); // 카드 onClick으로 상세 이동 막기(있다면)
    if (!token) return alert("로그인이 필요합니다.");
    if (likePending[postId]) return;

    const willLike = !likedMap[postId]; // true면 +1, false면 -1

    // 낙관적 업데이트 (아이콘/카운트 즉시 반영)
    setLikePending((p) => ({ ...p, [postId]: true }));
    setLikedMap((m) => ({ ...m, [postId]: willLike }));
    setRecipes((prev) =>
      prev.map((r) =>
        r.postId === postId
          ? {
              ...r,
              likeCount: Math.max(0, (r.likeCount ?? 0) + (willLike ? 1 : -1)),
            }
          : r
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
      setRecipes((prev) =>
        prev.map((r) =>
          r.postId === postId
            ? {
                ...r,
                likeCount: Math.max(
                  0,
                  (r.likeCount ?? 0) + (willLike ? -1 : 1)
                ),
              }
            : r
        )
      );
    } finally {
      setLikePending((p) => ({ ...p, [postId]: false }));
    }
  };

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
            onClick={goWrite}
          />
        </R.Icons>
      </R.Header>

      <R.Category>
        <div>{selectedCategory}</div>
        <img
          src={`${process.env.PUBLIC_URL}/images/more.svg`}
          alt="more"
          onClick={toggleSheet}
        />
      </R.Category>

      {isOpen && <R.Overlay onClick={toggleSheet} />}
      <R.Sheet isOpen={isOpen}>
        <h4>카테고리 설정</h4>
        <ul>
          {CATEGORY_LIST.map((label) => (
            <li
              key={label}
              onClick={() => onClickCategory(label)}
              style={{ cursor: "pointer" }}
            >
              {label}
            </li>
          ))}
        </ul>
        <R.CloseButton onClick={toggleSheet}>×</R.CloseButton>
      </R.Sheet>

      <R.Body>
        <R.Search>
          <img
            src={`${process.env.PUBLIC_URL}/images/search.svg`}
            alt="search"
          />
          <input
            type="text"
            placeholder="냉장고 속 재료를 검색해보세요."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onSearchKeyDown}
          />
        </R.Search>
        <R.Condition>
          <R.Post>
            <div id="title">게시물</div>
            <div id="num">{recipes.length}</div>
            <div id="gun">건</div>
          </R.Post>
          <R.Select>
            <R.Popular
              selected={selectedSort === "popular"}
              onClick={() => handleSelectSort("popular")}
            >
              <div id="dot" />
              <div id="detail">인기순</div>
            </R.Popular>
            <R.New
              selected={selectedSort === "new"}
              onClick={() => handleSelectSort("new")}
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
                  src={`http://43.203.179.188/uploads/r?key=${recipe.mainImageUrl}`}
                  alt="represent"
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
                      aria-label={
                        scrappedMap[recipe.postId] ? "스크랩 취소" : "스크랩"
                      }
                    />
                  </R.Scrap>
                </R.Up>
                <R.Down>
                  <R.Icon>
                    <img
                      id="heart"
                      src={`${process.env.PUBLIC_URL}/images/${
                        likedMap[recipe.postId] ? "heart_b.png" : "heart_w.svg"
                      }`} // 프로젝트에선 heart_b.png면 png로 변경
                      alt={likedMap[recipe.postId] ? "좋아요 취소" : "좋아요"}
                      onClick={(e) => handleLikeToggle(e, recipe.postId)}
                      style={{
                        cursor: "pointer",
                        opacity: likePending[recipe.postId] ? 0.6 : 1,
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
