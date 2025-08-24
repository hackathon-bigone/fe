import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as N from "../styles/StyledNick";
import axios from "axios";

const Nick = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState(""); // 현재 닉네임 상태
  const [input, setInput] = useState(""); // 입력값 상태
  const token = localStorage.getItem("access_token"); // 예: 토큰 localStorage에 저장되어 있다고 가정
  const [isLoading, setIsLoading] = useState(true);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate(`/`);
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  // 닉네임 가져오기
  useEffect(() => {
    axios
      .get("https://43-203-179-188.sslip.io/mypage", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const nick = res.data.nickname;
        setNickname(nick);
        setInput(nick);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("닉네임 조회 실패:", err);
        setIsLoading(false);
      });
  }, []);

  const changeNickname = () => {
    if (input.length < 2 || input.length > 10) {
      alert("공백 포함 2~10자의 영문 또는 한글을 입력하세요.");
      return;
    }

    axios
      .patch(
        "https://43-203-179-188.sslip.io/mypage/nickname",
        {
          nickname: input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("닉네임이 성공적으로 변경되었습니다.");
        goHome();
      })
      .catch((err) => {
        console.error("닉네임 변경 실패:", err);
        alert("닉네임 변경 중 오류가 발생했습니다.");
      });
  };

  // 모달 확인 클릭 시
  const confirm = () => {
    setOpen(false);
    changeNickname();
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
          <input
            type="text"
            value={input || ""} // undefined 방지!
            onChange={(e) => setInput(e.target.value)}
          />
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
