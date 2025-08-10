import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as M from "../styles/StyledMy";

const My = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/home`);
  };

  const goPur = () => {
    navigate(`/purchase`);
  };

  const goRec = () => {
    navigate(`/recipe`);
  };

  const goRef = () => {
    navigate(`/refrigerator`);
  };

  const goWro = () => {
    navigate(`/my/wrote/recipe`);
  };

  const goEdit = () => {
    navigate(`/my/edit`);
  };

  const goPw = () => {
    navigate(`/my/edit/password`);
  };

  return (
    <M.Container>
      <M.Header>
        <div>마이페이지</div>
      </M.Header>
      <M.Profile>
        <M.Welcome>
          <M.Name>
            <div id="name">짜파게티 요리사</div>
            <div id="sama">님,</div>
          </M.Name>
          <div id="welcome">반가워요!</div>
          <div id="id">yorisa024</div>
        </M.Welcome>
        <M.Image></M.Image>
      </M.Profile>
      <M.Button>
        <div id="edit" onClick={goEdit}>
          프로필 수정
        </div>
        <div id="logout">로그아웃</div>
      </M.Button>

      <M.Activity>
        <M.ATitle>나의 활동 내역</M.ATitle>
        <M.AList>
          <M.Write onClick={goWro}>
            <img
              src={`${process.env.PUBLIC_URL}/images/pencil.png`}
              alt="write"
            />
            <div id="num">1</div>
            <div id="title">작성한 게시물</div>
          </M.Write>
          <M.Hr />
          <M.Comment>
            <img
              src={`${process.env.PUBLIC_URL}/images/comment.png`}
              alt="comment"
            />
            <div id="num">2</div>
            <div id="title">댓글 단 게시물</div>
          </M.Comment>
          <M.Hr />
          <M.Scrap>
            <img
              src={`${process.env.PUBLIC_URL}/images/star.png`}
              alt="scrap"
            />
            <div id="num">4</div>
            <div id="title">스크랩</div>
          </M.Scrap>
        </M.AList>
      </M.Activity>

      <M.Help>
        <M.HTitle>고객지원</M.HTitle>
        <M.HList>
          <M.Announce>
            <img
              src={`${process.env.PUBLIC_URL}/images/announcement.png`}
              alt="announcement"
            />
            <div id="title">공지사항</div>
          </M.Announce>
          <M.Hr />
          <M.Qna>
            <img src={`${process.env.PUBLIC_URL}/images/qna.png`} alt="qna" />
            <div id="title">Q&A</div>
          </M.Qna>
          <M.Hr />
          <M.Declar>
            <img
              src={`${process.env.PUBLIC_URL}/images/declaration.png`}
              alt="declaration"
            />
            <div id="title">신고</div>
          </M.Declar>
        </M.HList>
      </M.Help>

      <M.Nav>
        <M.NHome onClick={goHome}>
          <img src={`${process.env.PUBLIC_URL}/images/home_w.svg`} alt="home" />
          <div>홈</div>
        </M.NHome>
        <M.NRefri onClick={goRef}>
          <img
            src={`${process.env.PUBLIC_URL}/images/refrigerator_w.svg`}
            alt="refrigerator"
          />
          <div>냉장고</div>
        </M.NRefri>
        <M.NRecipe onClick={goRec}>
          <img
            src={`${process.env.PUBLIC_URL}/images/recipe_w.svg`}
            alt="recipe"
          />
          <div>레시피</div>
        </M.NRecipe>
        <M.NPur onClick={goPur}>
          <img
            src={`${process.env.PUBLIC_URL}/images/purchase_w.svg`}
            alt="purchase"
          />
          <div>공동구매</div>
        </M.NPur>
        <M.NMy>
          <img src={`${process.env.PUBLIC_URL}/images/my_b.svg`} alt="my" />
          <div>마이</div>
        </M.NMy>
      </M.Nav>
    </M.Container>
  );
};

export default My;
