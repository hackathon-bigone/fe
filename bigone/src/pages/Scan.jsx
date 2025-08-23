import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as E from "../styles/StyledScan";
import axios from "axios";

const Scan = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const file = state?.file; // ✅ Receipt에서 받은 파일
  const [error, setError] = useState("");

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (!file) {
      // 파일 없이 들어오면 되돌리기
      navigate("/refrigerator/ingredients/receipt", { replace: true });
      return;
    }

    const run = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("로그인 토큰이 없습니다.");

        const form = new FormData();
        form.append("file", file); // 명세: key는 file

        const { data } = await axios.post(
          "http://43.203.179.188/foodbox/receipt/upload",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            timeout: 60000,
          }
        );

        // ✅ 업로드/인식 완료 → complete 페이지로 결과 전달
        navigate("/refrigerator/ingredients/receipt/scan/complete", {
          state: { items: data }, // [{name, quantity}, ...]
          replace: true,
        });
      } catch (e) {
        console.error(e);
        setError(
          e?.response?.data?.message ||
            e?.message ||
            "스캔 중 오류가 발생했습니다."
        );
      }
    };

    run();
  }, [file, navigate]);

  return (
    <E.Container>
      <E.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
      </E.Header>
      <E.Body>
        <img src={`${process.env.PUBLIC_URL}/images/scanning.gif`} alt="scan" />
        <div id="detail">
          {error ? (
            <span style={{ color: "crimson" }}>{error}</span>
          ) : (
            "영수증 스캔 중..."
          )}
        </div>
      </E.Body>
    </E.Container>
  );
};

export default Scan;
