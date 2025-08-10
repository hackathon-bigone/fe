import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledEdit";

const Edit = () => {
  const navigate = useNavigate();

  const goNick = () => {
    navigate(`/my/edit/nickname`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goPw = () => {
    navigate(`/my/edit/password`);
  };

  return (
    <E.Container>
      <E.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <div>프로필 수정</div>
      </E.Header>
      <E.Body>
        <E.Nickname onClick={goNick}>
          <div>닉네임 변경</div>
          <img
            src={`${process.env.PUBLIC_URL}/images/detail.svg`}
            alt="detail"
          />
        </E.Nickname>
        <E.Password onClick={goPw}>
          <div>비밀번호 변경</div>
          <img
            src={`${process.env.PUBLIC_URL}/images/detail.svg`}
            alt="detail"
          />
        </E.Password>
      </E.Body>
    </E.Container>
  );
};

export default Edit;
