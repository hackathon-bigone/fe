import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as W from "../styles/StyledWrote";

const Wrote = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/`);
  };

  const goPur = () => {
    navigate(`/my/wrote/purchase`);
  };

  const [isScrapped, setIsScrapped] = useState(false);

  const handleScrapClick = () => {
    setIsScrapped((prev) => !prev);
  };

  return (
    <W.Container>
      <W.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <W.Title>작성한 게시물</W.Title>
      </W.Header>
      <W.Category>
        <div id="recipe">레시피</div>
        <div id="purchase" onClick={goPur}>
          공동구매
        </div>
      </W.Category>
      <W.Body>
        <W.Component>
          <W.Image>
            <img src="" alt="represent" />
          </W.Image>
          <W.Detail>
            <W.Up>
              <W.CTitle>에어프라이어만으로 만드는 스모어 크래커</W.CTitle>
              <W.Scrap>
                <img
                  src={`${process.env.PUBLIC_URL}/images/${
                    isScrapped ? "star_y" : "star_w"
                  }.svg`}
                  alt="scrap"
                  onClick={handleScrapClick}
                />
              </W.Scrap>
            </W.Up>
            <W.Down>
              <W.Icons>
                <img
                  id="heart"
                  src={`${process.env.PUBLIC_URL}/images/heart_w.svg`}
                  alt="heart"
                />
                <div id="hnum">105</div>
                <img
                  id="comment"
                  src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}
                  alt="comment"
                />
                <div id="cnum">24</div>
              </W.Icons>
              <W.Date>8월 24일</W.Date>
            </W.Down>
          </W.Detail>
        </W.Component>
      </W.Body>
    </W.Container>
  );
};

export default Wrote;
