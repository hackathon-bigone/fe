import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledRecipe";

const Recipe = () => {
  const navigate = useNavigate();

  const goMy = () => {
    navigate(`/my`);
  };

  const goHome = () => {
    navigate(`/home`);
  };

  const goPur = () => {
    navigate(`/purchase`);
  };

  const goRef = () => {
    navigate(`/refrigerator`);
  };

  const goWrite = () => {
    navigate(`/recipe/write`);
  };

  const [isScrapped, setIsScrapped] = useState(false);

  const handleScrapClick = () => {
    setIsScrapped((prev) => !prev);
  };

  const [isHeart, setIsHeart] = useState(false);

  const handleHeart = () => {
    setIsHeart((prev) => !prev);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  const [selectedSort, setSelectedSort] = useState("popular");

  const handleSelectSort = (type) => {
    setSelectedSort(type);
  };

  return (
    <R.Container>
      <R.Header>
        <R.Title>레시피</R.Title>
        <R.Icons>
          <img
            id="scrap"
            src={`${process.env.PUBLIC_URL}/images/scrap.svg`}
            alt="scrap"
          />
          <img
            id="bar"
            src={`${process.env.PUBLIC_URL}/images/pencil_w.svg`}
            alt="pencil"
            onClick={goWrite}
          />
        </R.Icons>
      </R.Header>

      <R.Category>
        <div>전체</div>
        <img
          src={`${process.env.PUBLIC_URL}/images/more.svg`}
          alt="more"
          onClick={toggleSheet}
        />
      </R.Category>

      {isOpen && <R.Overlay onClick={toggleSheet} />}
      <R.Sheet isOpen={isOpen}>
        <h4>카테고리 설정</h4>
        <ul>
          <li>전체</li>
          <li>왕초보</li>
          <li>전자레인지 · 에어프라이어</li>
          <li>디저트</li>
          <li>비건</li>
        </ul>
        <R.CloseButton onClick={toggleSheet}>×</R.CloseButton>
      </R.Sheet>

      <R.Body>
        <R.Search>
          <img
            src={`${process.env.PUBLIC_URL}/images/search.svg`}
            alt="search"
          />
          <input type="text" placeholder="냉장고 속 재료를 검색해보세요." />
        </R.Search>
        <R.Condition>
          <R.Post>
            <div id="title">게시물</div>
            <div id="num">7</div>
            <div id="gun">건</div>
          </R.Post>
          <R.Select>
            <R.Popular
              selected={selectedSort === "popular"}
              onClick={() => handleSelectSort("popular")}
            >
              <div id="dot" />
              <div id="detail">인기순</div>
            </R.Popular>
            <R.New
              selected={selectedSort === "new"}
              onClick={() => handleSelectSort("new")}
            >
              <div id="dot" />
              <div id="detail">최신순</div>
            </R.New>
          </R.Select>
        </R.Condition>
        <R.List>
          <R.Component>
            <R.Image>
              <img src="" alt="represent" />
            </R.Image>
            <R.Detail>
              <R.Up>
                <R.CTitle>에어프라이어만으로 만드는 스모어 크래커</R.CTitle>
                <R.Scrap>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${
                      isScrapped ? "star_y" : "star_w"
                    }.svg`}
                    alt="scrap"
                    onClick={handleScrapClick}
                  />
                </R.Scrap>
              </R.Up>
              <R.Down>
                <R.Icon>
                  <img
                    id="heart"
                    src={`${process.env.PUBLIC_URL}/images/${
                      isHeart ? "heart_b.png" : "heart_w.svg"
                    }`}
                    alt="heart"
                    onClick={handleHeart}
                  />
                  <div id="hnum">105</div>
                  <img
                    id="comment"
                    src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}
                    alt="comment"
                  />
                  <div id="cnum">24</div>
                </R.Icon>
                <R.Date>8월 24일</R.Date>
              </R.Down>
            </R.Detail>
          </R.Component>
        </R.List>
      </R.Body>

      <R.Nav>
        <R.NHome onClick={goHome}>
          <img src={`${process.env.PUBLIC_URL}/images/home_w.svg`} alt="home" />
          <div>홈</div>
        </R.NHome>
        <R.NRefri onClick={goRef}>
          <img
            src={`${process.env.PUBLIC_URL}/images/refrigerator_w.svg`}
            alt="refrigerator"
          />
          <div>냉장고</div>
        </R.NRefri>
        <R.NRecipe>
          <img
            src={`${process.env.PUBLIC_URL}/images/recipe_b.svg`}
            alt="recipe"
          />
          <div>레시피</div>
        </R.NRecipe>
        <R.NPur onClick={goPur}>
          <img
            src={`${process.env.PUBLIC_URL}/images/purchase_w.svg`}
            alt="purchase"
          />
          <div>공동구매</div>
        </R.NPur>
        <R.NMy onClick={goMy}>
          <img src={`${process.env.PUBLIC_URL}/images/my_w.svg`} alt="my" />
          <div>마이</div>
        </R.NMy>
      </R.Nav>
    </R.Container>
  );
};

export default Recipe;
