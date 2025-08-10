import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../styles/StyledHome";

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
        <H.Date>2025년 8월 25일</H.Date>
        <H.Box>
          <H.BUp>
            <div id="detail">
              유통기한이 <br />
              얼마 남지 않았어요!
            </div>
            <li id="product">우유(1L) 외 2개</li>
          </H.BUp>
          <H.BDown>
            <img
              src={`${process.env.PUBLIC_URL}/images/alarm.png`}
              alt="alarm"
            />
            <div id="date">D-1</div>
          </H.BDown>
        </H.Box>
      </H.Up>

      <H.Popular>
        <H.PTitle>인기 레시피</H.PTitle>
        <H.List>
          <H.Component>
            <H.Top>1</H.Top>
            <H.PDetail>
              <H.Image>
                <img src="" alt="represent" />
              </H.Image>
              <H.Detail>
                <H.CUp>
                  <H.CTitle>에어프라이어만으로 만드는 스모어 크래커</H.CTitle>
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
                    <div id="hnum">105</div>
                    <img
                      id="comment"
                      src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}
                      alt="comment"
                    />
                    <div id="cnum">24</div>
                  </H.Icon>
                  <H.CDate>8월 24일</H.CDate>
                </H.Down>
              </H.Detail>
            </H.PDetail>
          </H.Component>
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
