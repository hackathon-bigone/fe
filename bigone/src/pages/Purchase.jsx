import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPur";

const Purchase = () => {
  const navigate = useNavigate();

  const goWrite = () => {
    navigate(`/purchase/write`);
  };

  const goDetail = () => {
    navigate(`/purchase/detail`);
  };

  const goMy = () => {
    navigate(`/my`);
  };

  const goHome = () => {
    navigate(`/home`);
  };

  const goRec = () => {
    navigate(`/recipe`);
  };

  const goRef = () => {
    navigate(`/refrigerator`);
  };

  const [isScrapped, setIsScrapped] = useState(false);
  const handleScrapClick = () => {
    setIsScrapped((prev) => !prev);
  };

  return (
    <P.Container>
      <P.Header>
        <P.Title>공동구매</P.Title>
        <P.Icons>
          <img id="scrap" src={`${process.env.PUBLIC_URL}/images/star_w.svg`} />
          <img id="write" src={`${process.env.PUBLIC_URL}/images/pencil_w.svg`} alt="pencil" onClick={goWrite} />
        </P.Icons>
      </P.Header>

      <P.Body>
        <P.Search>
          <img src={`${process.env.PUBLIC_URL}/images/search.svg`} alt="search" />
          <input type="text" placeholder="냉장고 속 재료를 검색해보세요." />
        </P.Search>
        <P.Bar>
          <P.Post>
            <div id="bold">게시물</div>
            <div id="num">5</div>
            <div id="gun">건</div>
          </P.Post>
          <P.Recent>
            <div id="dot"></div>
            최신순
          </P.Recent>
        </P.Bar>
        <P.Component>
          <P.Img>
            <img alt="임시"></img>
          </P.Img>
          <P.ImformBox>
            <P.CTitle>
              <div id="title" onClick={goDetail}>
                2L 생수 나눠 사실 분 구해요~
              </div>
              <img id="scrap" src={`${process.env.PUBLIC_URL}/images/${isScrapped ? "star_y" : "star_w"}.svg`} onClick={handleScrapClick} />
            </P.CTitle>
            <P.Detail>
              <div style={{ display: "flex", gap: "2px" }}>
                <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}></img>
                <div id="comment-num">2</div>
                <img id="line" src={`${process.env.PUBLIC_URL}/images/Line.png`}></img>
                <P.D_State>모집중</P.D_State>
              </div>
              <P.D_Date>1시간 전</P.D_Date>
            </P.Detail>
          </P.ImformBox>
        </P.Component>
        <P.Component>
          <P.Img>
            <img alt="임시"></img>
          </P.Img>
          <P.ImformBox>
            <P.CTitle>
              <div id="title" onClick={goDetail}>
                2L 생수 나눠 사실 분 구해요~
              </div>
              <img id="scrap" src={`${process.env.PUBLIC_URL}/images/${isScrapped ? "star_y" : "star_w"}.svg`} onClick={handleScrapClick} />
            </P.CTitle>
            <P.Detail>
              <div style={{ display: "flex", gap: "2px" }}>
                <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}></img>
                <div id="comment-num">2</div>
                <img id="line" src={`${process.env.PUBLIC_URL}/images/Line.png`}></img>
                <P.D_State>모집중</P.D_State>
              </div>
              <P.D_Date>1시간 전</P.D_Date>
            </P.Detail>
          </P.ImformBox>
        </P.Component>
        <P.Component>
          <P.Img>
            <img alt="임시"></img>
          </P.Img>
          <P.ImformBox>
            <P.CTitle>
              <div id="title" onClick={goDetail}>
                2L 생수 나눠 사실 분 구해요~
              </div>
              <img id="scrap" src={`${process.env.PUBLIC_URL}/images/${isScrapped ? "star_y" : "star_w"}.svg`} onClick={handleScrapClick} />
            </P.CTitle>
            <P.Detail>
              <div style={{ display: "flex", gap: "2px" }}>
                <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}></img>
                <div id="comment-num">2</div>
                <img id="line" src={`${process.env.PUBLIC_URL}/images/Line.png`}></img>
                <P.D_State>모집중</P.D_State>
              </div>
              <P.D_Date>1시간 전</P.D_Date>
            </P.Detail>
          </P.ImformBox>
        </P.Component>
        <P.Component>
          <P.Img>
            <img alt="임시"></img>
          </P.Img>
          <P.ImformBox>
            <P.CTitle>
              <div id="title" onClick={goDetail}>
                2L 생수 나눠 사실 분 구해요~
              </div>
              <img id="scrap" src={`${process.env.PUBLIC_URL}/images/${isScrapped ? "star_y" : "star_w"}.svg`} onClick={handleScrapClick} />
            </P.CTitle>
            <P.Detail>
              <div style={{ display: "flex", gap: "2px" }}>
                <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}></img>
                <div id="comment-num">2</div>
                <img id="line" src={`${process.env.PUBLIC_URL}/images/Line.png`}></img>
                <P.D_State>모집중</P.D_State>
              </div>
              <P.D_Date>1시간 전</P.D_Date>
            </P.Detail>
          </P.ImformBox>
        </P.Component>
        <P.Component>
          <P.Img>
            <img alt="임시"></img>
          </P.Img>
          <P.ImformBox>
            <P.CTitle>
              <div id="title" onClick={goDetail}>
                2L 생수 나눠 사실 분 구해요~
              </div>
              <img id="scrap" src={`${process.env.PUBLIC_URL}/images/${isScrapped ? "star_y" : "star_w"}.svg`} onClick={handleScrapClick} />
            </P.CTitle>
            <P.Detail>
              <div style={{ display: "flex", gap: "2px" }}>
                <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}></img>
                <div id="comment-num">2</div>
                <img id="line" src={`${process.env.PUBLIC_URL}/images/Line.png`}></img>
                <P.D_State>모집중</P.D_State>
              </div>
              <P.D_Date>1시간 전</P.D_Date>
            </P.Detail>
          </P.ImformBox>
        </P.Component>
        <P.Component>
          <P.Img>
            <img alt="임시"></img>
          </P.Img>
          <P.ImformBox>
            <P.CTitle>
              <div id="title" onClick={goDetail}>
                2L 생수 나눠 사실 분 구해요~
              </div>
              <img id="scrap" src={`${process.env.PUBLIC_URL}/images/${isScrapped ? "star_y" : "star_w"}.svg`} onClick={handleScrapClick} />
            </P.CTitle>
            <P.Detail>
              <div style={{ display: "flex", gap: "2px" }}>
                <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}></img>
                <div id="comment-num">2</div>
                <img id="line" src={`${process.env.PUBLIC_URL}/images/Line.png`}></img>
                <P.D_State>모집중</P.D_State>
              </div>
              <P.D_Date>1시간 전</P.D_Date>
            </P.Detail>
          </P.ImformBox>
        </P.Component>
      </P.Body>

      <P.Nav>
        <P.NHome onClick={goHome}>
          <img src={`${process.env.PUBLIC_URL}/images/home_w.svg`} alt="home" />
          <div>홈</div>
        </P.NHome>
        <P.NRefri onClick={goRef}>
          <img src={`${process.env.PUBLIC_URL}/images/refrigerator_w.svg`} alt="refrigerator" />
          <div>냉장고</div>
        </P.NRefri>
        <P.NRecipe onClick={goRec}>
          <img src={`${process.env.PUBLIC_URL}/images/recipe_w.svg`} alt="recipe" />
          <div>레시피</div>
        </P.NRecipe>
        <P.NPur>
          <img src={`${process.env.PUBLIC_URL}/images/purchase_b.svg`} alt="purchase" />
          <div>공동구매</div>
        </P.NPur>
        <P.NMy onClick={goMy}>
          <img src={`${process.env.PUBLIC_URL}/images/my_w.svg`} alt="my" />
          <div>마이</div>
        </P.NMy>
      </P.Nav>
    </P.Container>
  );
};

export default Purchase;
