import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../styles/StyledHome";

const Home = () => {
  const navigate = useNavigate();

  const goMy = () => {
    navigate(`/my`);
  };

  return (
    <H.Container>
      <H.Header>
        <H.Title>로고</H.Title>
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
          />
        </H.Icons>
      </H.Header>

      <H.Nav>
        <H.NHome>
          <img src={`${process.env.PUBLIC_URL}/images/home_b.svg`} alt="home" />
          <div>홈</div>
        </H.NHome>
        <H.NRefri>
          <img
            src={`${process.env.PUBLIC_URL}/images/refrigerator_w.svg`}
            alt="refrigerator"
          />
          <div>냉장고</div>
        </H.NRefri>
        <H.NRecipe>
          <img
            src={`${process.env.PUBLIC_URL}/images/recipe_w.svg`}
            alt="recipe"
          />
          <div>레시피</div>
        </H.NRecipe>
        <H.NPur>
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
