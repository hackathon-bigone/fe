import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as L from "../styles/StyledLogin";
import axios from "axios";

const Login = ({ setLoginAuth }) => {
  const navigate = useNavigate();

  const goSignUp = () => {
    navigate(`/signup`);
  };

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("http://43.203.179.188/user/login", {
        username: id,
        password: pw,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      navigate(`/home`);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response && error.response.status === 401) {
        setErrorMsg(error.response.data.message); // 서버 메시지
        setId("");
        setPw("");
      } else {
        console.log("로그인 실패");
      }
    }
  };

  return (
    <L.Container>
      <L.Logo>
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} />
      </L.Logo>

      <L.Input style={{ backgroundColor: errorMsg ? "rgba(255, 79, 38, 0.10)" : "white" }}>
        <img src={`${process.env.PUBLIC_URL}/images/Id.svg`} />
        <input placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)}></input>
      </L.Input>
      <L.Input style={{ backgroundColor: errorMsg ? "rgba(255, 79, 38, 0.10)" : "white" }}>
        <img src={`${process.env.PUBLIC_URL}/images/Password.svg`} />
        <input placeholder="비밀번호(8자 이상)" type={pwType.type} value={pw} onChange={(e) => setPw(e.target.value)}></input>
        <img src={`${process.env.PUBLIC_URL}/images/${pwType.visible ? "Eye-open.svg" : "Eye-off.svg"}`} onClick={handlePasswordType} />
      </L.Input>
      <L.ErrorMsg visible={!!errorMsg}>{errorMsg}</L.ErrorMsg>
      <L.LoginBtn style={{ marginTop: "30px", background: isActive ? "#FF4F26" : "#C4C4C4", cursor: isActive ? "pointer" : "default" }} onClick={handleSubmit}>
        로그인
      </L.LoginBtn>
      <L.SignUpBtn onClick={goSignUp}>회원가입</L.SignUpBtn>
    </L.Container>
  );
};

export default Login;
