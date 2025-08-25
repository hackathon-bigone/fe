import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as L from "../styles/StyledLogin";
import axios from "axios";

const API_BASE = "https://43-203-179-188.sslip.io";

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

  const handleSubmit = async () => {
    setErrorMsg("");
    try {
      const res = await axios.post(
        `${API_BASE}/user/login`,
        {
          username: id,
          password: pw,
        },
        {
          // withCredentials: true,   // 쿠키 세션이라면 활성화 + 백엔드 CORS 세팅 필요
          headers: { Accept: "application/json" },
          timeout: 15000,
        }
      );

      const data = res?.data || {};
      const accessToken = data.accessToken ?? data.access_token;
      const refreshToken = data.refreshToken ?? data.refresh_token;

      if (!accessToken) {
        throw new Error("응답에 accessToken이 없습니다.");
      }

      localStorage.setItem("access_token", accessToken);
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_id", id);

      navigate(`/`);
    } catch (err) {
      // Axios 에러 안전 처리
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message || err?.response?.data;
      const genericMsg = err?.message || "로그인 실패";

      // 디버깅용 로그 (개발 중에만 참고)
      console.error("Login error detail:", {
        status,
        serverMsg,
        url: `https://43-203-179-188.sslip.io/user/login`,
        axiosCode: err?.code,
      });

      if (status === 401) {
        setErrorMsg(serverMsg || "아이디 또는 비밀번호가 올바르지 않습니다.");
        setId("");
        setPw("");
      } else if (status >= 500) {
        setErrorMsg("서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else if (!status) {
        // 네트워크/혼합콘텐츠/CORS/프록시 문제 등으로 response 자체가 없는 경우
        setErrorMsg("서버에 연결할 수 없습니다. 네트워크/프록시 설정을 확인하세요.");
      } else {
        setErrorMsg(serverMsg || genericMsg);
      }
    }
  };

  return (
    <L.Container>
      <L.Logo>
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} />
      </L.Logo>

      <L.Input
        style={{
          backgroundColor: errorMsg ? "rgba(255, 79, 38, 0.10)" : "white",
        }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/Id.svg`} />
        <input placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)}></input>
      </L.Input>
      <L.Input
        style={{
          backgroundColor: errorMsg ? "rgba(255, 79, 38, 0.10)" : "white",
        }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/Password.svg`} />
        <input placeholder="비밀번호(8자 이상)" type={pwType.type} value={pw} onChange={(e) => setPw(e.target.value)}></input>
        <img src={`${process.env.PUBLIC_URL}/images/${pwType.visible ? "Eye-open.svg" : "Eye-off.svg"}`} onClick={handlePasswordType} />
      </L.Input>
      <L.ErrorMsg visible={!!errorMsg}>{errorMsg}</L.ErrorMsg>
      <L.LoginBtn
        style={{
          marginTop: "30px",
          background: isActive ? "#FF4F26" : "#C4C4C4",
          cursor: isActive ? "pointer" : "default",
        }}
        onClick={handleSubmit}
      >
        로그인
      </L.LoginBtn>
      <L.SignUpBtn onClick={goSignUp}>회원가입</L.SignUpBtn>
    </L.Container>
  );
};

export default Login;
