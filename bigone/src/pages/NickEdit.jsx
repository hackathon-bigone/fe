import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as N from "../styles/StyledNick";

const Nick = () => {
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
    <N.Container>
      <N.Header>
        <img
          onClick={goBack}
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
        />
        <div>닉네임 변경</div>
      </N.Header>
      <N.Body>
        <N.Title>닉네임</N.Title>
        <N.Field>
          <input type="text" />
        </N.Field>
        <N.Announce>공백 포함 영문 또는 한글 2~10자</N.Announce>
      </N.Body>
      <N.Button onClick={openModal}>변경 완료</N.Button>

      {/* 모달 */}
      {open && (
        <N.ModalBackdrop onClick={closeModal}>
          <N.Modal
            role="dialog"
            aria-modal="true"
            aria-label="닉네임 변경 확인"
            onClick={(e) => e.stopPropagation()} // 내용 클릭 시 닫힘 방지
          >
            <N.ModalTitle>닉네임을 변경하시겠습니까?</N.ModalTitle>
            <N.ModalActions>
              <button onClick={closeModal}>취소</button>
              <button onClick={confirm}>확인</button>
            </N.ModalActions>
          </N.Modal>
        </N.ModalBackdrop>
      )}
    </N.Container>
  );
};

export default Nick;
