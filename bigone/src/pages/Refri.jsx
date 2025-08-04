import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledRefri";

const Refri = () => {
  const navigate = useNavigate();

  const goMy = () => {
    navigate(`/my`);
  };

  const goHome = () => {
    navigate(`/home`);
  };

  const goPur = () => {
    navigate(`/purchase`);
  };

  const goRec = () => {
    navigate(`/recipe`);
  };

  return (
    <R.Container>
      <R.Header>
        <R.Title>로고</R.Title>
        <R.Icons>
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
        </R.Icons>
      </R.Header>

      <R.Nav>
        <R.NHome onClick={goHome}>
          <img src={`${process.env.PUBLIC_URL}/images/home_w.svg`} alt="home" />
          <div>홈</div>
        </R.NHome>
        <R.NRefri>
          <img
            src={`${process.env.PUBLIC_URL}/images/refrigerator_b.svg`}
            alt="refrigerator"
          />
          <div>냉장고</div>
        </R.NRefri>
        <R.NRecipe onClick={goRec}>
          <img
            src={`${process.env.PUBLIC_URL}/images/recipe_w.svg`}
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

export default Refri;
