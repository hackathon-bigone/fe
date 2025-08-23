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

  const goMenu = () => navigate(`/menu`);

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") goMenu();
  };

  const [isScrapped, setIsScrapped] = useState(false);

  const handleScrapClick = () => {
    setIsScrapped((prev) => !prev);
  };

  const [isHeart, setIsHeart] = useState(false);

  const handleHeart = () => {
    setIsHeart((prev) => !prev);
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
        const res = await axios.get("http://43.203.179.188/home/foodbox", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoodbox(res.data);
      } catch (error) {
        console.error("❌ API 호출 실패:", error);
      }
    };

    fetchFoodbox();
  }, []);

  const [recipeList, setRecipeList] = useState([]);

  // ✅ 백엔드 베이스
  const API_BASE = "http://43.203.179.188/";

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
          "http://43.203.179.188/home/top5-popular-boards"
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
        <H.Box>
          <H.BUp>
            <div id="detail">{foodbox.message || "메시지 없음"}</div>
            <li id="product">{foodbox.summary || "표시할 식품 없음"}</li>
          </H.BUp>
          <H.BDown>
            <img
              src={`${process.env.PUBLIC_URL}/images/alarm.png`}
              alt="alarm"
            />
            <div id="date">{foodbox.dlabel || "D-"}</div>
          </H.BDown>
        </H.Box>
      </H.Up>

      <H.Popular>
        <H.PTitle>인기 레시피</H.PTitle>
        <H.List>
          {recipeList.map((recipe, index) => (
            <H.Component key={recipe.postId}>
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
                      // ✅ 실패 시 즉시 플레이스홀더로 대체
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
                          isScrapped ? "star_y" : "star_w"
                        }.svg`}
                        alt="scrap"
                        onClick={handleScrapClick}
                      />
                    </H.Scrap>
                  </H.CUp>
                  <H.Down>
                    <H.Icon>
                      <img
                        id="heart"
                        src={`${process.env.PUBLIC_URL}/images/${
                          isHeart ? "heart_b.png" : "heart_w.svg"
                        }`}
                        alt="heart"
                        onClick={handleHeart}
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
