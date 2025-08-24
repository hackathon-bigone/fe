import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/StyledSignUp";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate(`/login`);
  };

  // 항목별 에러 메시지 저장
  const [idErrorMsg, setIdErrorMsg] = useState("");
  const [pwErrorMsg, setPwErrorMsg] = useState("");
  const [pwCheckErrorMsg, setPwCheckErrorMsg] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");

  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwType, setpwType] = useState({
    type: "password",
    visible: false,
  });

  // 유효성 상태 변수
  const [isNameValid, setIsNameValid] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPwCheckValid, setIsPwCheckValid] = useState(false);
  const [isIdCheckValid, setIsIdCheckValid] = useState(null); // 성공 여부

  const isMatch = pw !== "" && pw === pwCheck;
  const isActive = isNameValid && isIdValid && isPwValid && isPwCheckValid;
  const isIdCheckActivate = id.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isActive) {
      // 유효성 안맞을 경우 제출 방지
      alert("모든 항목을 올바르게 입력해 주세요.");
      return;
    }

    try {
      await axios.post("https://43-203-179-188.sslip.io/user/signup", {
        nickname,
        username: id,
        password: pw,
        repeatPw: pwCheck,
      });
      navigate(`/login`);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response && error.response.status === 400) {
        // 에러 처리 (필요하면 상태 변경)
      } else {
        console.log("회원가입 실패");
      }
    }
  };

  const handlePasswordType = (e) => {
    setpwType(() => {
      if (!pwType.visible) {
        return { type: "text", visible: true };
      } else {
        return { type: "password", visible: false };
      }
    });
  };

  const handleIdCheck = async () => {
    try {
      const response = await axios.get(
        `https://43-203-179-188.sslip.io/user/check-username?username=${encodeURIComponent(
          id
        )}`
      );
      setIdErrorMsg(response.data.message);
      if (response.data.message.includes("사용 가능")) {
        setIsIdCheckValid(true);
      } else {
        setIsIdCheckValid(false);
      }
    } catch (error) {
      setIdErrorMsg("아이디 중복 확인에 실패했습니다.");
      console.log("회원가입 실패");
    }
  };

  const onChangeName = (e) => {
    const value = e.target.value;
    setNickname(value);
    // 닉네임 조건: 공백 포함, 영문 또는 한글 2~10자
    const nameRegex = /^[a-zA-Z가-힣 ]{2,10}$/;

    if (!nameRegex.test(value)) {
      setNameErrorMsg("공백을 포함한 영문 또는 한글 2~10자를 입력하세요.");
      setIsNameValid(false);
    } else {
      setNameErrorMsg("");
      setIsNameValid(true);
    }
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPw(value);
    // 비밀번호 조건: 영문, 숫자, 특수문자 포함 8~16자
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (!passwordRegex.test(value)) {
      setPwErrorMsg("영문, 숫자, 특수문자를 포함하여 8~16자를 입력하세요.");
      setIsPwValid(false);
    } else {
      setPwErrorMsg("");
      setIsPwValid(true);
    }
  };

  const onChangePwCheck = (e) => {
    const value = e.target.value;
    setPwCheck(value);

    if (pw !== value) {
      setPwCheckErrorMsg("비밀번호가 일치하지 않습니다.");
      setIsPwCheckValid(false);
    } else {
      setPwCheckErrorMsg("");
      setIsPwCheckValid(true);
    }
  };

  const onChangeId = (e) => {
    const value = e.target.value;
    setId(value);
    // 아이디 조건: 영문, 숫자 포함 5~12자
    const idRegex = /^[a-zA-Z0-9]{5,12}$/;

    if (!idRegex.test(value)) {
      setIdErrorMsg("영문, 숫자 포함 5자~12자를 입력하세요.");
      setIsIdValid(false);
    } else {
      setIdErrorMsg("");
      setIsIdValid(true);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Icons>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg`}
            alt="back"
            onClick={goLogin}
          />
        </S.Icons>
        <S.Title>회원가입</S.Title>
      </S.Header>

      <S.InputCon>
        <div id="title">
          닉네임 <span style={{ color: "#FF385C" }}>*</span>
        </div>
        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={onChangeName}
          style={{
            backgroundColor: nameErrorMsg
              ? "rgba(255, 79, 38, 0.10)"
              : "rgba(196, 196, 196, 0.30)",
          }}
        ></input>
        {!nameErrorMsg && !isNameValid && (
          <div id="inputDetail">공백 포함 영문 또는 한글 2~10자</div>
        )}
        {nameErrorMsg && <div id="inputError">{nameErrorMsg}</div>}
      </S.InputCon>

      <S.InputCon>
        <div id="title">
          아이디 <span style={{ color: "#FF385C" }}>*</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={onChangeId}
            style={{
              width: "62%",
              backgroundColor: isIdCheckValid
                ? "rgba(255, 79, 38, 0.10)"
                : "rgba(196, 196, 196, 0.30)",
            }}
          ></input>
          <div
            id="IdCheckBtn"
            onClick={handleIdCheck}
            style={{
              background: isIdCheckActivate ? "#FF4F26" : "#C4C4C4",
              cursor: isActive ? "pointer" : "default",
            }}
          >
            중복확인
          </div>
        </div>
        {!idErrorMsg && !isIdValid && (
          <div id="inputDetail">영문, 숫자 포함 5자~12자</div>
        )}
        {idErrorMsg && (
          <div
            id="inputError"
            style={{
              color:
                isIdCheckValid === true
                  ? "#19C37D" // 초록: 사용 가능
                  : "#FF4F26",
            }}
          >
            {idErrorMsg}
          </div>
        )}
      </S.InputCon>

      <S.InputCon>
        <div id="title">
          비밀번호 <span style={{ color: "#FF385C" }}>*</span>
        </div>
        <input
          type={pwType.type}
          placeholder="비밀번호 입력"
          value={pw}
          onChange={onChangePassword}
          style={{
            backgroundColor: nameErrorMsg
              ? "rgba(255, 79, 38, 0.10)"
              : "rgba(196, 196, 196, 0.30)",
          }}
        ></input>
        <img
          src={`${process.env.PUBLIC_URL}/images/${
            pwType.visible ? "Eye-open.svg" : "Eye-off.svg"
          }`}
          onClick={handlePasswordType}
        />
        {!pwErrorMsg && isPwValid && (
          <div id="inputDetail">영문, 숫자, 특수문자 포함 8~16자</div>
        )}
        {pwErrorMsg && <div id="inputError">{pwErrorMsg}</div>}
        <input
          type={pwType.type}
          placeholder="비밀번호 확인"
          value={pwCheck}
          onChange={onChangePwCheck}
          style={{
            backgroundColor: nameErrorMsg
              ? "rgba(255, 79, 38, 0.10)"
              : "rgba(196, 196, 196, 0.30)",
          }}
        ></input>
        {pwCheckErrorMsg && <div id="inputError">{pwCheckErrorMsg}</div>}
      </S.InputCon>

      <S.SignUpBtn
        style={{
          marginTop: "60px",
          background: isActive ? "#FF4F26" : "#C4C4C4",
          cursor: isActive ? "pointer" : "default",
        }}
        onClick={handleSubmit}
      >
        가입하기
      </S.SignUpBtn>
    </S.Container>
  );
};

export default Signup;
