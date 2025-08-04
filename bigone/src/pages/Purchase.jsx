import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPur";

const Purchase = () => {
  const navigate = useNavigate();

  const goMy = () => {
    navigate(`/my`);
  };

  const goHome = () => {
    navigate(`/home`);
  };

  const goRec = () => {
    navigate(`/recipe`);
  };

  const goRef = () => {
    navigate(`/refrigerator`);
  };

  return (
    <P.Container>
      <P.Header>
        <P.Title>로고</P.Title>
        <P.Icons>
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
        </P.Icons>
      </P.Header>

      <P.Nav>
        <P.NHome onClick={goHome}>
          <img src={`${process.env.PUBLIC_URL}/images/home_w.svg`} alt="home" />
          <div>홈</div>
        </P.NHome>
        <P.NRefri onClick={goRef}>
          <img
            src={`${process.env.PUBLIC_URL}/images/refrigerator_w.svg`}
            alt="refrigerator"
          />
          <div>냉장고</div>
        </P.NRefri>
        <P.NRecipe onClick={goRec}>
          <img
            src={`${process.env.PUBLIC_URL}/images/recipe_w.svg`}
            alt="recipe"
          />
          <div>레시피</div>
        </P.NRecipe>
        <P.NPur>
          <img
            src={`${process.env.PUBLIC_URL}/images/purchase_b.svg`}
            alt="purchase"
          />
          <div>공동구매</div>
        </P.NPur>
        <P.NMy onClick={goMy}>
          <img src={`${process.env.PUBLIC_URL}/images/my_w.svg`} alt="my" />
          <div>마이</div>
        </P.NMy>
      </P.Nav>
    </P.Container>
  );
};

export default Purchase;
