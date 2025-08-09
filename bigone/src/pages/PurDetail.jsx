import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPurD";
import BottomSheet from "./BottomSheet";

const P_Detail = () => {
  const navigate = useNavigate();
  const goPur = () => {
    navigate(`/purchase`);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <P.Container>
      <P.Header>
        <P.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={goPur} />
          <P.Title>공동구매 상세</P.Title>
        </P.Icons>
        <img id="share" src={`${process.env.PUBLIC_URL}/images/Share.svg`} alt="share" />
      </P.Header>
      <P.Content>
        <P.Pic>
          <img alt="pic"></img>
        </P.Pic>
        <P.Wrapper>
          <P.D_Title>두루마리 휴지 30개 3개씩 나눠 가져요!!</P.D_Title>
          <img id="star" src={`${process.env.PUBLIC_URL}/images/star_w.svg`} alt="star" />
        </P.Wrapper>
        <P.Wrapper style={{ justifyContent: "start", gap: "7px" }}>
          <P.D_Inform_gray>모집인원</P.D_Inform_gray>
          <P.D_Inform_black>9명</P.D_Inform_black>
          <P.D_State>모집중</P.D_State>
        </P.Wrapper>
        <P.Wrapper>
          <P.Profile>
            <img id="circle" src={`${process.env.PUBLIC_URL}/images/Circle.svg`} alt="circle" />
            <img id="cat" src={`${process.env.PUBLIC_URL}/images/Profile.png`} alt="cat" />
            <div id="profile_inform">
              <div id="username">월곡동 쩝쩝박사</div>
              <div style={{ display: "flex", flexDirection: "row", gap: "7px", marginLeft: "10px" }}>
                <P.D_Inform_gray>게시물</P.D_Inform_gray>
                <P.D_Inform_black>2개</P.D_Inform_black>
              </div>
            </div>
          </P.Profile>
          <P.PostDate>8월 12일</P.PostDate>
        </P.Wrapper>
        <P.Post>
          <p>안녕하세요, 월곡동 쩝쩝박사 공구가 돌아왔습니다!</p>
          <p>쿠팡에서 두루마리 휴지 30개입 짜리를 할인하고 있는데, 제가 혼자 자취 중이라 같이 공동구매 하실 분을 구합니다!!</p>
          <p>휴지는 저 포함 10명이서 3개씩 나눠가지고 N빵한 가격만큼 입금해주시면 됩니다. 밑에 옵챗 링크 올려두겠습니다~</p>
        </P.Post>
        <P.PostURL>
          <p>공동구매 링크</p>
          <a href="https://open.kakao.com/o/szqBpBlh">https://open.kakao.com/o/szqBpBlh</a>
        </P.PostURL>
        <P.Comment onClick={() => setIsOpen(true)}>
          <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`} alt="comment" />
          <div id="comment_cnt">21</div>
        </P.Comment>
      </P.Content>
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}></BottomSheet>
    </P.Container>
  );
};

export default P_Detail;
