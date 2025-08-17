import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../styles/StyledHome";
import axios from "axios";

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

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          "http://43.203.179.188/home/tpo5-popular-boards"
        ); // ← 헤더 제거!
        setRecipeList(res.data.boards); // boards 배열 추출
      } catch (error) {
        console.error("❌ 레시피 불러오기 실패:", error);
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
                    src={`http://43.203.179.188/${recipe.mainImageUrl}`}
                    alt={recipe.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.png"; // 대체 이미지
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
