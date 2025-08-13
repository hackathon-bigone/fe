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

  const goEver = () => {
    navigate(`/refrigerator/ingredients`);
  };

  return (
    <R.Container>
      <R.Header>
        <R.Title>나의 냉장고</R.Title>
        <R.Icons>
          <img
            id="scrap"
            src={`${process.env.PUBLIC_URL}/images/Plus_B.svg`}
            alt="scrap"
          />
        </R.Icons>
      </R.Header>

      <R.Category>
        <div id="recipe">유통기한 임박</div>
        <div id="purchase" onClick={goEver}>
          식품 전체
        </div>
      </R.Category>

      <R.Body>
        <R.Date>2025년 8월 25일</R.Date>
        <R.Detail>
          <div id="circle" />
          <div id="date">유통기한 임박</div>
        </R.Detail>
        <R.List>
          <R.Component>
            <R.Left>D+1</R.Left>
            <R.Name>
              <div id="ingre">감자</div>
              <div id="date">25.08.24</div>
            </R.Name>
            <R.Num>3개</R.Num>
          </R.Component>
        </R.List>
      </R.Body>

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
