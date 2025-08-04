import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPurH";

const PurHistory = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/`);
  };

  const goRec = () => {
    navigate(`/my/wrote/recipe`);
  };

  const [isScrapped, setIsScrapped] = useState(false);

  const handleScrapClick = () => {
    setIsScrapped((prev) => !prev);
  };

  return (
    <P.Container>
      <P.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <P.Title>작성한 게시물</P.Title>
      </P.Header>
      <P.Category>
        <div id="recipe" onClick={goRec}>
          레시피
        </div>
        <div id="purchase">공동구매</div>
      </P.Category>
      <P.Body>
        <P.Component>
          <P.Image>
            <img src="" alt="represent" />
          </P.Image>
          <P.Detail>
            <P.Up>
              <P.CTitle>2L 생수 나눠 사실 분 구해요~</P.CTitle>
              <P.Scrap>
                <img
                  src={`${process.env.PUBLIC_URL}/images/${
                    isScrapped ? "star_y" : "star_w"
                  }.svg`}
                  alt="scrap"
                  onClick={handleScrapClick}
                />
              </P.Scrap>
            </P.Up>
            <P.Down>
              <P.Icons>
                <img
                  id="comment"
                  src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}
                  alt="comment"
                />
                <div id="cnum">24</div>
                <div id="hr" />
                <div id="ing">모집중</div>
              </P.Icons>
              <P.Date>1시간 전</P.Date>
            </P.Down>
          </P.Detail>
        </P.Component>
      </P.Body>
    </P.Container>
  );
};

export default PurHistory;
