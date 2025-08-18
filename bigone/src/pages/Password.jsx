import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPw";

const Password = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate(`/home`);
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const confirm = () => {
    setOpen(false);
    // TODO: 실제 저장/검증 로직 후 이동 등
    goHome();
  };

  return (
    <P.Container>
      <P.Header>
        <img
          onClick={goBack}
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
        />
        <div>비밀번호 변경</div>
      </P.Header>
      <P.Body>
        <P.Title>현재 비밀번호</P.Title>
        <P.Field>
          <input type="text" />
          <img
            src={`${process.env.PUBLIC_URL}/images/Eye-open.svg`}
            alt="open"
          />
        </P.Field>
        <P.NTitle>새 비밀번호</P.NTitle>
        <P.NField>
          <input type="text" placeholder="새 비밀번호 입력" />
          <img
            src={`${process.env.PUBLIC_URL}/images/Eye-open.svg`}
            alt="open"
          />
        </P.NField>
        <P.Announce>영문, 숫자, 특수문자 포함 8~16자</P.Announce>
        <P.NCheck>
          <input type="text" placeholder="새 비밀번호 확인" />
        </P.NCheck>
      </P.Body>
      <P.Button onClick={openModal}>변경 완료</P.Button>

      {/* 모달 */}
      {open && (
        <P.ModalBackdrop onClick={closeModal}>
          <P.Modal
            role="dialog"
            aria-modal="true"
            aria-label="닉네임 변경 확인"
            onClick={(e) => e.stopPropagation()} // 내용 클릭 시 닫힘 방지
          >
            <P.ModalTitle>비밀번호를 변경하시겠습니까?</P.ModalTitle>
            <P.ModalActions>
              <button onClick={closeModal}>취소</button>
              <button onClick={confirm}>확인</button>
            </P.ModalActions>
          </P.Modal>
        </P.ModalBackdrop>
      )}
    </P.Container>
  );
};

export default Password;
