import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as M from "../styles/StyledMenu";

const Menu = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/`);
  };

  return (
    <M.Container>
      <M.Header>
        <img
          id="back"
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <div>전체 메뉴</div>
      </M.Header>
      <M.Body>
        <M.Menu></M.Menu>
        <M.Detail></M.Detail>
      </M.Body>
    </M.Container>
  );
};

export default Menu;
