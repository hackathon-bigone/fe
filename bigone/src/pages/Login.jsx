import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as L from "../styles/StyledLogin";

const Login = () => {
  const navigate = useNavigate();

  const goSignUp = () => {
    navigate(`/signup`);
  };

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const isActive = id.length > 0 && pw.length > 0;
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

  return (
    <L.Container>
      <L.Logo>순삭</L.Logo>

      <L.Input>
        <img src={`${process.env.PUBLIC_URL}/images/Id.svg`} />
        <input placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)}></input>
      </L.Input>
      <L.Input>
        <img src={`${process.env.PUBLIC_URL}/images/Password.svg`} />
        <input placeholder="비밀번호(8자 이상)" type={pwType.type} value={pw} onChange={(e) => setPw(e.target.value)}></input>
        <img src={`${process.env.PUBLIC_URL}/images/${pwType.visible ? "Eye-open.svg" : "Eye-off.svg"}`} onClick={handlePasswordType} />
      </L.Input>
      <L.LoginBtn style={{ marginTop: "60px", background: isActive ? "#FF4F26" : "#C4C4C4", cursor: isActive ? "pointer" : "default" }}>로그인</L.LoginBtn>
      <L.SignUpBtn onClick={goSignUp}>회원가입</L.SignUpBtn>
    </L.Container>
  );
};

export default Login;
