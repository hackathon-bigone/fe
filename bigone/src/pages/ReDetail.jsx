import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledRecipeD";
import BottomSheet from "../pages/components/BottomSheet";

const R_Detail = () => {
  const navigate = useNavigate();
  const goRec = () => {
    navigate(`/recipe`);
  };

  const [isOpen, setIsOpen] = useState(false);

  const [isHeart, setIsHeart] = useState(false);
  const handleHeart = () => {
    setIsHeart((prev) => !prev);
  };

  const [isScrapped, setIsScrapped] = useState(false);
  const handleScrapClick = () => {
    setIsScrapped((prev) => !prev);
  };

  const [isSelected, setIsSelected] = useState("ingredients");
  const handleSelectClick = (type) => {
    setIsSelected(type);
  };

  return (
    <R.Container>
      <R.Header>
        <R.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={goRec} />
          <R.Title>레시피 상세</R.Title>
        </R.Icons>
        <img id="share" src={`${process.env.PUBLIC_URL}/images/Share.svg`} alt="share" />
      </R.Header>
      <R.Content>
        <R.Pic>
          <img alt="pic"></img>
        </R.Pic>
        <R.Wrapper>
          <R.D_Title>에어프라이어만으로 만드는 스모어 크래커</R.D_Title>
          <img id="star" src={`${process.env.PUBLIC_URL}/images/${isScrapped ? "star_y.svg" : "star_w.svg"}`} alt="star" onClick={handleScrapClick} />
        </R.Wrapper>
        <R.Wrapper style={{ justifyContent: "start", gap: "7px" }}>
          <R.D_Inform_gray>양</R.D_Inform_gray>
          <R.D_Inform_black>1인분</R.D_Inform_black>
          <R.D_Inform_gray>소요시간</R.D_Inform_gray>
          <R.D_Inform_black>약 20분</R.D_Inform_black>
        </R.Wrapper>
        <R.Wrapper style={{ justifyContent: "start", gap: "7px" }}>
          <R.D_State>왕초보</R.D_State>
          <R.D_State>전자레인지•에어프라이어</R.D_State>
          <R.D_State>디저트</R.D_State>
          <R.D_State>비건</R.D_State>
        </R.Wrapper>

        <R.Wrapper style={{ marginTop: "30px", marginBottom: "20px" }}>
          <R.Profile>
            <img id="circle" src={`${process.env.PUBLIC_URL}/images/Circle.svg`} alt="circle" />
            <img id="cat" src={`${process.env.PUBLIC_URL}/images/Profile.png`} alt="cat" />
            <div id="profile_inform">
              <div id="username">짜파게티 요리사</div>
              <div style={{ display: "flex", flexDirection: "row", gap: "7px", marginLeft: "10px" }}>
                <R.D_Inform_gray>게시물</R.D_Inform_gray>
                <R.D_Inform_black>1개</R.D_Inform_black>
              </div>
            </div>
          </R.Profile>
          <R.PostDate>8월 12일</R.PostDate>
        </R.Wrapper>
        <R.Post>
          안녕하세요, 저는 밥 보다 디저트를 더 좋아하는 짜파게티 요리사 입니다^^ 요즘 날씨가 많이 덥다보니 밥은 별로 안 땡기고 디저트 사러 나가기는 귀찮고..ㅎ 그래서 집에 있는 재료와 에어프라이어로
          스모어를 만들어 봤는데 간단하고 맛있더라고요!? 저만 알기 아까워서 여러분들께 레시피 공유합니다🤗
        </R.Post>
        <R.PostURL>
          <p>레시피 링크</p>
          <a href="https://open.kakao.com/o/szqBpBlh">https://open.kakao.com/o/szqBpBlh</a>
        </R.PostURL>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <R.Heart>
            <img id="heart" src={`${process.env.PUBLIC_URL}/images/${isHeart ? "heart_b.png" : "heart_w.svg"}`} alt="heart" onClick={handleHeart} />
            <div id="heart_cnt">84</div>
          </R.Heart>
          <R.Comment onClick={() => setIsOpen(true)}>
            <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`} alt="comment" />
            <div id="comment_cnt">21</div>
          </R.Comment>
        </div>
      </R.Content>
      <R.ContentBar>
        <R.Tap id="ingredients" $selected={isSelected === "ingredients"} onClick={() => handleSelectClick("ingredients")}>
          재료
        </R.Tap>
        <R.Tap id="recipe" $selected={isSelected === "recipe"} onClick={() => handleSelectClick("recipe")}>
          레시피
        </R.Tap>
      </R.ContentBar>
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}></BottomSheet>
    </R.Container>
  );
};

export default R_Detail;
