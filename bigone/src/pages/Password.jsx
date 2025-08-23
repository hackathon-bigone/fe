import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPw";
import axios from "axios";

const API_BASE = "http://43.203.179.188/";

const Password = () => {
  const curPwRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate(`/`);
  };

  // 입력값
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPw: "",
  });

  // 에러/상태
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // 비번 보이기 토글
  const [show, setShow] = useState({
    current: false,
    next: false,
    repeat: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 타이핑 중 간단 유효성 리셋
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 비밀번호 규칙: 영문/숫자/특수문자 포함 8~16자
  const pwRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,16}$/;

  const validate = () => {
    const e = {};
    if (!form.currentPassword)
      e.currentPassword = "현재 비밀번호를 입력해 주세요.";
    if (!pwRule.test(form.newPassword)) {
      e.newPassword = "영문, 숫자, 특수문자 포함 8~16자";
    }
    if (!form.repeatPw) e.repeatPw = "새 비밀번호를 한 번 더 입력해 주세요.";
    else if (form.newPassword !== form.repeatPw) {
      e.repeatPw = "비밀번호가 일치하지 않습니다.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openModal = () => {
    if (!validate()) return; // 검증 통과 시에만 모달
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  // 실제 PATCH 호출
  const confirm = async () => {
    if (loading) return;
    setLoading(true);
    setServerMsg("");

    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.patch(
        `${API_BASE}mypage/password`,
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          repeatPw: form.repeatPw,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 15000,
        }
      );

      const msg = res.data?.message || "비밀번호 변경이 완료되었습니다.";
      alert(msg);
      setOpen(false);
      goHome();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해 주세요.";

      // ✅ 서버 메시지를 필드별 에러로 분배
      if (msg.includes("현재 비밀번호")) {
        setErrors((prev) => ({ ...prev, currentPassword: msg }));
        curPwRef?.current?.focus(); // (선택) 포커스 이동
      } else if (msg.includes("비밀번호가 일치하지 않습니다")) {
        setErrors((prev) => ({ ...prev, repeatPw: msg }));
      } else {
        // 알 수 없는 에러만 전역으로
        setServerMsg(msg);
      }

      setOpen(false); // 모달 닫기 (원하면 유지해도 OK)
    } finally {
      setLoading(false);
    }
  };

  const toggle = (key) => setShow((s) => ({ ...s, [key]: !s[key] }));

  // Enter로 제출 편의
  const onKeyDown = (e) => {
    if (e.key === "Enter") openModal();
  };

  const isAllFilled =
    form.currentPassword.trim() &&
    form.newPassword.trim() &&
    form.repeatPw.trim();

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
          <input
            ref={curPwRef}
            name="currentPassword"
            type={show.current ? "text" : "password"}
            value={form.currentPassword}
            onChange={onChange}
            onKeyDown={onKeyDown}
            aria-invalid={!!errors.currentPassword}
            placeholder="현재 비밀번호"
          />
          <img
            role="button"
            tabIndex={0}
            onClick={() => toggle("current")}
            src={
              show.current
                ? `${process.env.PUBLIC_URL}/images/Eye-open.svg`
                : `${process.env.PUBLIC_URL}/images/Eye-off.svg`
            }
            alt={show.current ? "비밀번호 숨기기" : "비밀번호 보기"}
          />
        </P.Field>
        {/* ✅ 여기! 현재 비번 에러는 이 위치에서 표시 */}
        {errors.currentPassword && <P.Error>{errors.currentPassword}</P.Error>}

        <P.NTitle>새 비밀번호</P.NTitle>
        <P.NField>
          <input
            name="newPassword"
            type={show.next ? "text" : "password"}
            value={form.newPassword}
            onChange={onChange}
            onKeyDown={onKeyDown}
            aria-invalid={!!errors.newPassword}
            placeholder="새 비밀번호 입력"
          />
          <img
            role="button"
            tabIndex={0}
            onClick={() => toggle("next")}
            src={
              show.next
                ? `${process.env.PUBLIC_URL}/images/Eye-open.svg`
                : `${process.env.PUBLIC_URL}/images/Eye-off.svg`
            }
            alt={show.next ? "비밀번호 숨기기" : "비밀번호 보기"}
          />
        </P.NField>
        {/* 새 비밀번호 아래 */}
        {!errors.newPassword && (
          <P.Announce>영문, 숫자, 특수문자 포함 8~16자</P.Announce>
        )}
        {errors.newPassword && <P.Error>{errors.newPassword}</P.Error>}
        <P.NCheck>
          <input
            name="repeatPw"
            type="password"
            value={form.repeatPw}
            onChange={onChange}
            onKeyDown={onKeyDown}
            aria-invalid={!!errors.repeatPw}
            placeholder="새 비밀번호 확인"
          />
        </P.NCheck>
        {errors.repeatPw && <P.Error>{errors.repeatPw}</P.Error>}
        {serverMsg && <P.Error>{serverMsg}</P.Error>}
      </P.Body>
      {serverMsg && <P.Error>{serverMsg}</P.Error>}

      <P.Button
        $active={!!isAllFilled && !loading}
        onClick={() => {
          if (isAllFilled && !loading) openModal();
        }}
      >
        {loading ? "변경 중..." : "변경 완료"}
      </P.Button>

      {/* 모달 */}
      {open && (
        <P.ModalBackdrop onClick={closeModal}>
          <P.Modal
            role="dialog"
            aria-modal="true"
            aria-label="비밀번호 변경 확인"
            onClick={(e) => e.stopPropagation()}
          >
            <P.ModalTitle>비밀번호를 변경하시겠습니까?</P.ModalTitle>
            <P.ModalActions>
              <button onClick={closeModal}>취소</button>
              <button onClick={confirm} disabled={loading}>
                확인
              </button>
            </P.ModalActions>
          </P.Modal>
        </P.ModalBackdrop>
      )}
    </P.Container>
  );
};

export default Password;
