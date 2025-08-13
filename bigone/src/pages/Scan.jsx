import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledScan";

const Scan = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

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
        <div id="detail">영수증 스캔 중...</div>
      </E.Body>
    </E.Container>
  );
};

export default Scan;
