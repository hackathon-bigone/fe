import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/StyledSignUp";

const Signup = () => {
  const navigate = useNavigate();

  const goNext = () => {
    navigate(`/`);
  };

  const goLogin = () => {
    navigate(`/login`);
  };

  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwType, setpwType] = useState({
    type: "password",
    visible: false,
  });
  const handlePasswordType = (e) => {
    setpwType(() => {
      if (!pwType.visible) {
        return { type: "text", visible: true };
      } else {
        return { type: "password", visible: false };
      }
    });
  };
  const [pwCheck, setPwCheck] = useState("");
  const isActive = id.length > 0 && pw.length > 0 && nickname.length > 0 && pwCheck.length > 0;
  const isIdCheckActivate = id.length > 0;

  return (
    <S.Container>
      <S.Header>
        <S.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={goLogin} />
        </S.Icons>
        <S.Title>회원가입</S.Title>
      </S.Header>
      <S.InputCon>
        <div id="title">
          닉네임 <span style={{ color: "#FF385C" }}>*</span>
        </div>
        <input type="text" placeholder="닉네임 입력" value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
        <div id="inputDetail">공백 포함 영문 또는 한글 2~10자</div>
      </S.InputCon>

      <S.InputCon>
        <div id="title">
          아이디 <span style={{ color: "#FF385C" }}>*</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <input type="text" placeholder="아이디 입력" style={{ width: "62%" }} value={id} onChange={(e) => setId(e.target.value)}></input>
          <div id="IdCheckBtn" style={{ background: isIdCheckActivate ? "#FF4F26" : "#C4C4C4", cursor: isActive ? "pointer" : "default" }}>
            중복확인
          </div>
        </div>
        <div id="inputDetail">영문, 숫자 포함 5자~12자</div>
      </S.InputCon>

      <S.InputCon>
        <div id="title">
          비밀번호 <span style={{ color: "#FF385C" }}>*</span>
        </div>
        <input type={pwType.type} placeholder="비밀번호 입력" value={pw} onChange={(e) => setPw(e.target.value)}></input>
        <img src={`${process.env.PUBLIC_URL}/images/${pwType.visible ? "Eye-open.svg" : "Eye-off.svg"}`} onClick={handlePasswordType} />
        <div id="inputDetail">영문, 숫자, 특수문자 포함 8~16자</div>
        <input type={pwType.type} placeholder="비밀번호 확인" value={pwCheck} onChange={(e) => setPwCheck(e.target.value)}></input>
      </S.InputCon>

      <S.SignUpBtn style={{ marginTop: "60px", background: isActive ? "#FF4F26" : "#C4C4C4", cursor: isActive ? "pointer" : "default" }}>가입하기</S.SignUpBtn>
    </S.Container>
  );
};

export default Signup;
