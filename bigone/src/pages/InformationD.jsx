import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as I from "../styles/StyledInform.jsx";

const Inform_Detail = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my/inform`);
  };

  return (
    <I.Container>
      <I.Header>
        <I.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" style={{ cursor: "pointer" }} onClick={goBack} />
          <I.Title>공지사항 상세</I.Title>
        </I.Icons>
      </I.Header>
      <I.Content>
        <I.InformWrapper>
          <I.InformTitle>v.1.2.1 버전 업데이트 안내</I.InformTitle>
          <I.InformContent>
            안녕하세요, 순삭입니다. 더욱 쾌적하고 안정적인 서비스 지원을 위해 다음과 같이 서비스의 시스템 업데이트를 진행할 예정입니다.순삭 서비스를 이용해 주시는 모든 분들께 감사드리며, 더 나은
            서비스로 보답할 있도록 늘 노력하겠습니다. 감사합니다.
          </I.InformContent>
          <I.Date>8월 1일</I.Date>
        </I.InformWrapper>
      </I.Content>
    </I.Container>
  );
};

export default Inform_Detail;
