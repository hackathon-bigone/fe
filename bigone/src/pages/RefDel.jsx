import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledDelete";

const RefDel = () => {
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

  const [checked, setChecked] = useState(false);

  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <E.Container>
      <E.Header>
        <img src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" />
        <div>식품 목록 수정</div>
      </E.Header>
      <E.Body>
        <E.Detail>
          <E.Status>
            <div id="circle" />
            <div id="all">식품 전체</div>
          </E.Status>
        </E.Detail>
        <E.Title>
          <div id="name">식품명</div>
          <div id="num">수량</div>
          <div id="date">유통기한</div>
        </E.Title>
        <E.List>
          <E.Input>
            <E.Check checked={checked} onClick={toggleCheck} />
            <E.Name>감자</E.Name>
            <E.Num>3개</E.Num>
            <E.Date>25.08.24</E.Date>
          </E.Input>
        </E.List>
      </E.Body>

      <E.Enter>
        <E.All>전체 선택</E.All>
        <E.Del selected={checked} onClick={goBack}>
          삭제
        </E.Del>
      </E.Enter>

      {showModal && (
        <E.ModalOverlay>
          <E.ModalContent>
            <p>선택한 항목을 삭제할까요?</p>
            <div>삭제된 항목은 복구할 수 없습니다.</div>
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

export default RefDel;
