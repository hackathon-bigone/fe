import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledRPlus";

const RefPlus = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const goBack = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate(-1);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const goDel = () => {
    navigate(`/refrigerator/ingredients/delete`);
  };

  return (
    <E.Container>
      <E.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <div>식품 목록 수정</div>
      </E.Header>
      <E.Body>
        <E.Detail>
          <E.Status>
            <div id="circle" />
            <div id="all">식품 전체</div>
          </E.Status>
          <E.Delete onClick={goDel}>삭제</E.Delete>
        </E.Detail>
        <E.Title>
          <div id="name">식품명</div>
          <div id="num">수량</div>
          <div id="date">유통기한</div>
        </E.Title>
        <E.List>
          <E.Input>
            <E.Name>
              <input type="text" />
            </E.Name>
            <E.Num>
              <input type="text" />
            </E.Num>
            <E.Date>
              <input type="text" />
            </E.Date>
          </E.Input>
        </E.List>
      </E.Body>

      <E.Enter>
        <E.Button>수정 완료</E.Button>
      </E.Enter>

      {showModal && (
        <E.ModalOverlay>
          <E.ModalContent>
            <p>식품 목록 수정을 그만둘까요?</p>
            <div>
              식품 목록 수정 페이지를 벗어나면 <br />
              작성된 내용은 저장되지 않고 사라집니다.
            </div>
            <E.ModalButtons>
              <button onClick={handleCancel}>취소</button>
              <button onClick={handleConfirm}>확인</button>
            </E.ModalButtons>
          </E.ModalContent>
        </E.ModalOverlay>
      )}
    </E.Container>
  );
};

export default RefPlus;
