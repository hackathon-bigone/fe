import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledEvery";

const RefEv = () => {
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

  const goEdit = () => {
    navigate(`/refrigerator/ingredients/edit`);
  };

  const goExp = () => {
    navigate(`/refrigerator`);
  };
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToReceipt = () => {
    navigate(`/refrigerator/ingredients/receipt`);
  };

  const goToManual = () => {
    navigate(`/refrigerator/ingredients/write`);
  };

  return (
    <R.Container>
      <R.Header>
        <R.Title>나의 냉장고</R.Title>
        <R.Icons>
          <img
            id="scrap"
            src={`${process.env.PUBLIC_URL}/images/Plus_B.svg`}
            alt="plus"
            onClick={() => setShowPopup(!showPopup)}
          />
          {showPopup && (
            <R.Popup ref={popupRef}>
              <R.PopupItem onClick={goToReceipt}>
                영수증 인식
                <img
                  src={`${process.env.PUBLIC_URL}/images/receipt.svg`}
                  alt="receipt"
                />
              </R.PopupItem>
              <R.Hr />
              <R.PopupItem onClick={goToManual}>
                직접 입력
                <img
                  src={`${process.env.PUBLIC_URL}/images/write.svg`}
                  alt="edit"
                />
              </R.PopupItem>
            </R.Popup>
          )}
        </R.Icons>
      </R.Header>

      <R.Category>
        <div id="recipe" onClick={goExp}>
          유통기한 임박
        </div>
        <div id="purchase">식품 전체</div>
      </R.Category>

      <R.Body>
        <R.Date>2025년 8월 25일</R.Date>
        <R.Detail>
          <R.L>
            <div id="circle" />
            <div id="date">식품 전체</div>
          </R.L>
          <R.R onClick={goEdit}>수정</R.R>
        </R.Detail>

        <R.List>
          <R.CDate>25.08.24</R.CDate>
          <R.Component>
            <R.Content>
              <R.Ing>감자</R.Ing>
              <R.Num>3개</R.Num>
            </R.Content>
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

export default RefEv;
