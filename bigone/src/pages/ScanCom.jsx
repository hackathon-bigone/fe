import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as E from "../styles/StyledSCom";
import axios from "axios";

const API_URL = "https://43-203-179-188.sslip.io/foodbox/ocr/save";

const ScanCom = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const scannedItems = Array.isArray(state?.items) ? state.items : [];

  const goResult = async () => {
    if (!scannedItems.length) {
      alert("스캔된 항목이 없습니다.");
      navigate("/refrigerator/ingredients");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("로그인이 필요합니다.");

      // ✅ 서버로 OCR 결과 전송
      await axios.post(API_URL, scannedItems, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // ✅ 저장 성공 시 냉장고 재료 목록 페이지로 이동
      navigate("/refrigerator/ingredients");
    } catch (err) {
      console.error("❌ OCR 저장 실패:", err);
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "데이터 저장에 실패했습니다."
      );
      navigate("/refrigerator/ingredients");
    }
  };

  return (
    <E.Container>
      <E.Body>
        <div id="ment">
          영수증 스캔이
          <br />
          완료되었습니다
        </div>
        <div id="go" onClick={goResult}>
          확인하러 가기 →
        </div>
      </E.Body>
    </E.Container>
  );
};

export default ScanCom;
