import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../styles/StyledHome";
import axios from "axios";
// import placeholderImg from "../assets/placeholder.png";

const Home = () => {
  const navigate = useNavigate();

  const goMy = () => {
    navigate(`/my`);
  };

  const goPur = () => {
    navigate(`/purchase`);
  };

  const goRec = () => {
    navigate(`/recipe`);
  };

  const goRef = () => {
    navigate(`/refrigerator`);
  };

  const goMenu = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login"); // 로그인 안 된 경우 → 로그인 페이지로
    } else {
      navigate("/menu"); // 로그인 된 경우 → 메뉴 페이지로
    }
  };

  const goScrap = () => navigate(`/my/scrap`);

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
      } else {
        navigate("/menu");
      }
    }
  };
  const token = localStorage.getItem("access_token");

  // 게시글별 스크랩 상태
  const [scrappedMap, setScrappedMap] = useState({});
  const [pending, setPending] = useState({}); // 중복 클릭 방지

  // ✅ Home 진입 시, 내가 스크랩한 레시피 목록 불러오기
  useEffect(() => {
    const fetchScraps = async () => {
      if (!token) return; // 로그인 안 된 경우 스킵
      try {
        const res = await axios.get(`${API_BASE}mypage/recipe-scrap`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 스크랩된 postId를 true로 설정
        const init = {};
        (res.data || []).forEach((r) => {
          init[r.postId] = true;
        });
        setScrappedMap(init);

        console.log("✅ 내 스크랩 목록:", init);
      } catch (err) {
        console.error("❌ 스크랩 목록 불러오기 실패:", err);
      }
    };

    fetchScraps();
  }, [token]);

  // ✅ 스크랩 토글 함수
  const handleScrapToggle = async (e, postId) => {
    e.stopPropagation();
    if (!token) return navigate("/login");
    if (pending[postId]) return;

    // 낙관적 업데이트
    setPending((p) => ({ ...p, [postId]: true }));
    setScrappedMap((m) => ({ ...m, [postId]: !m[postId] }));

    try {
      await axios.post(`${API_BASE}recipe/${postId}/scrap`, null, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });
      // 서버 성공 응답은 상태 그대로 유지
    } catch (err) {
      console.error("❌ 스크랩 토글 실패:", err);
      // 실패 시 롤백
      setScrappedMap((m) => ({ ...m, [postId]: !m[postId] }));
    } finally {
      setPending((p) => ({ ...p, [postId]: false }));
    }
  };

  // ✅ 좋아요 상태 (postId: true/false)
  const [likedMap, setLikedMap] = useState(() => {
    try {
      const saved = localStorage.getItem("recipe_likes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [likePending, setLikePending] = useState({});

  // ✅ localStorage 동기화 (좋아요 상태 저장)
  useEffect(() => {
    try {
      localStorage.setItem("recipe_likes", JSON.stringify(likedMap));
    } catch {}
  }, [likedMap]);

  // ✅ 좋아요 토글
  const handleLikeToggle = async (e, postId) => {
    e.stopPropagation();
    if (!token) return navigate("/login");
    if (likePending[postId]) return;

    const willLike = !likedMap[postId];

    // 낙관적 업데이트
    setLikePending((p) => ({ ...p, [postId]: true }));
    setLikedMap((m) => ({ ...m, [postId]: willLike }));
    setRecipeList((prev) =>
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
    } catch (err) {
      console.error("❌ 좋아요 토글 실패:", err);
      // 롤백
      setLikedMap((m) => ({ ...m, [postId]: !willLike }));
      setRecipeList((prev) =>
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

  const [selectedSort, setSelectedSort] = useState("popular");

  const handleSelectSort = (type) => {
    setSelectedSort(type);
  };

  const [foodbox, setFoodbox] = useState({
    today: "",
    summary: "",
    message: "",
    dlabel: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // if (token) {
    //   console.log("✅ 토큰 있음:", token);
    // } else {
    //   console.warn("⚠️ 'user_token' 없음. 로그인 확인 필요.");
    //   return;
    // }

    const fetchFoodbox = async () => {
      try {
        const res = await axios.get(
          "https://43-203-179-188.sslip.io/home/foodbox",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFoodbox(res.data);
      } catch (error) {
        console.error("❌ API 호출 실패:", error);
      }
    };

    fetchFoodbox();
  }, []);

  const [recipeList, setRecipeList] = useState([]);

  // ✅ 백엔드 베이스
  const API_BASE = "https://43-203-179-188.sslip.io/";

  // ✅ 네트워크 요청이 전혀 안 나가는 임베디드 SVG 플레이스홀더
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
    <rect width='100%' height='100%' fill='#eeeeee'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          font-size='24' fill='#888888'>이미지 준비중</text>
  </svg>
  `;

  // ✅ 이미지 URL 정규화 헬퍼 (Purchase의 동작을 그대로 커버)
  const buildImageUrl = (pathOrKey) => {
    if (!pathOrKey) {
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }
    // 이미 절대 URL이면 그대로
    if (/^https?:\/\//i.test(pathOrKey)) return pathOrKey;

    // '/uploads/...' 또는 'uploads/...' 같은 실제 경로면 베이스만 붙임
    if (pathOrKey.startsWith("/uploads/")) {
      return `${API_BASE}${pathOrKey.replace(/^\//, "")}`;
    }
    if (pathOrKey.startsWith("uploads/")) {
      return `${API_BASE}${pathOrKey}`;
    }

    // 그 외에는 '키'로 보고 키 뷰어 엔드포인트 사용 (Purchase에서 쓰는 방식)
    return `${API_BASE}uploads/r?key=${encodeURIComponent(pathOrKey)}`;
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          "https://43-203-179-188.sslip.io/home/top5-popular-boards"
        );

        console.log("✅ 인기 레시피 전체 response:", res);
        console.log("📦 res.data:", res.data);
        console.log("📝 res.data.boards:", res.data?.boards);

        (res.data?.boards ?? []).forEach((recipe, idx) => {
          console.log(
            `🔗 [${idx}] postId=${recipe.postId}, title="${recipe.title}", mainImageUrl=${recipe.mainImageUrl}`
          );
        });

        // ✅ 방어적 파싱
        setRecipeList(Array.isArray(res.data?.boards) ? res.data.boards : []);
      } catch (error) {
        console.error("❌ 레시피 불러오기 실패:", error);
        setRecipeList([]); // 실패 시 빈 배열
      }
    };

    fetchRecipes();
  }, []);

  return (
    <H.Container>
      <H.Header>
        <H.Title>
          <img
            id="logo"
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="logo"
          />
        </H.Title>
        <H.Icons>
          <img
            onClick={goScrap}
            id="scrap"
            src={`${process.env.PUBLIC_URL}/images/scrap.svg`}
            alt="scrap"
          />
          <img
            id="bar"
            src={`${process.env.PUBLIC_URL}/images/bar.svg`}
            alt="bar"
            role="button"
            tabIndex={0}
            onClick={goMenu}
            onKeyDown={onKey}
          />
        </H.Icons>
      </H.Header>

      <H.Up>
        <H.Date>{foodbox.today || "날짜 없음"}</H.Date>
        <H.Box style={{ position: "relative" }}>
          <H.BUp>
            {/* ✅ 로그인 여부 관계없이 message는 그대로 표시 */}
            <div id="detail">{foodbox.message || "메시지 없음"}</div>

            {/* ✅ 로그인 된 경우만 product 표시 */}
            {localStorage.getItem("access_token") && (
              <li id="product">{foodbox.summary || "표시할 식품 없음"}</li>
            )}
          </H.BUp>

          {/* ✅ 로그인 된 경우만 BDown 표시 */}
          {localStorage.getItem("access_token") ? (
            <H.BDown>
              <img
                src={`${process.env.PUBLIC_URL}/images/alarm.png`}
                alt="alarm"
              />
              <div
                id="date"
                style={{
                  color: foodbox.dlabel === "안전" ? "#00B40F" : "#FF4F26",
                }}
              >
                {foodbox.dlabel || "D-"}
              </div>
            </H.BDown>
          ) : (
            // 로그인 안 된 경우 null.png를 absolute로 크게 띄움
            <img
              src={`${process.env.PUBLIC_URL}/images/null.png`}
              alt="login required"
              style={{
                position: "absolute",
                top: "50%",
                left: "70%",
                transform: "translate(-50%, -50%)",
                width: "134px", // 원하는 크기로 조정
                height: "161px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            />
          )}
        </H.Box>
      </H.Up>

      <H.Popular>
        <H.PTitle>인기 레시피</H.PTitle>
        <H.List>
          {recipeList.map((recipe, index) => (
            <H.Component
              key={recipe.postId}
              onClick={() => navigate(`/recipe/detail/${recipe.postId}`)} // ✅ 상세 페이지로 이동
              style={{ cursor: "pointer" }} // 클릭 가능한 UI로
            >
              <H.Top>{index + 1}</H.Top>
              <H.PDetail>
                <H.Image>
                  <img
                    src={buildImageUrl(recipe.mainImageUrl)}
                    alt={recipe.title ?? "recipe"}
                    loading="lazy"
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "5px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml;utf8,${encodeURIComponent(
                        svg
                      )}`;
                    }}
                  />
                </H.Image>
                <H.Detail>
                  <H.CUp>
                    <H.CTitle>{recipe.title}</H.CTitle>
                    <H.Scrap>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/${
                          scrappedMap[recipe.postId] ? "star_y" : "star_w"
                        }.svg`}
                        alt="scrap"
                        onClick={(e) => {
                          e.stopPropagation(); // ✅ 부모 onClick(상세 페이지 이동) 막기
                          handleScrapToggle(e, recipe.postId);
                        }}
                        style={{
                          cursor: "pointer",
                          opacity: pending[recipe.postId] ? 0.6 : 1,
                        }}
                      />
                    </H.Scrap>
                  </H.CUp>
                  <H.Down>
                    <H.Icon>
                      <img
                        id="heart"
                        src={`${process.env.PUBLIC_URL}/images/${
                          likedMap[recipe.postId]
                            ? "heart_b.png"
                            : "heart_w.svg"
                        }`}
                        alt={likedMap[recipe.postId] ? "좋아요 취소" : "좋아요"}
                        onClick={(e) => {
                          e.stopPropagation(); // ✅ 상세 이동 막기
                          handleLikeToggle(e, recipe.postId);
                        }}
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
                    </H.Icon>
                    <H.CDate>{recipe.createdAt}</H.CDate>
                  </H.Down>
                </H.Detail>
              </H.PDetail>
            </H.Component>
          ))}
        </H.List>
      </H.Popular>

      <H.Nav>
        <H.NHome>
          <img src={`${process.env.PUBLIC_URL}/images/home_b.svg`} alt="home" />
          <div>홈</div>
        </H.NHome>
        <H.NRefri onClick={goRef}>
          <img
            src={`${process.env.PUBLIC_URL}/images/refrigerator_w.svg`}
            alt="refrigerator"
          />
          <div>냉장고</div>
        </H.NRefri>
        <H.NRecipe onClick={goRec}>
          <img
            src={`${process.env.PUBLIC_URL}/images/recipe_w.svg`}
            alt="recipe"
          />
          <div>레시피</div>
        </H.NRecipe>
        <H.NPur onClick={goPur}>
          <img
            src={`${process.env.PUBLIC_URL}/images/purchase_w.svg`}
            alt="purchase"
          />
          <div>공동구매</div>
        </H.NPur>
        <H.NMy onClick={goMy}>
          <img src={`${process.env.PUBLIC_URL}/images/my_w.svg`} alt="my" />
          <div>마이</div>
        </H.NMy>
      </H.Nav>
    </H.Container>
  );
};

export default Home;
