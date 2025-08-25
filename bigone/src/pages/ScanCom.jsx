import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as E from "../styles/StyledSCom";

const ScanCom = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const items = state?.items ?? [];

  const goResult = () => {
    navigate("/refrigerator/ingredients/receipt/scan/result", {
      state: { items },
    });
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
