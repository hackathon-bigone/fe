import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Q from "../styles/StyledQnA.jsx";

const QnADetail = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my/question`);
  };

  return (
    <Q.Container>
      <Q.Header>
        <Q.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" style={{ cursor: "pointer" }} onClick={goBack} />
          <Q.Title>Q&A 상세</Q.Title>
        </Q.Icons>
      </Q.Header>

      <Q.Content>
        <Q.QnAWrapper>
          <Q.QnATitle>
            <Q.QMark>Q</Q.QMark>제 계정이 해킹 당한 것 같습니다
          </Q.QnATitle>
          <Q.QnAContent>
            안녕하세요, 순삭 앱을 애용하고 있는 유저입니다. 제가 최근에 바빠서 앱 접속을 많이 못했는데, 오랜만에 들어와 보니까 제 닉네임이랑 게시물 내역이 모두 바뀌어 있더라구요... 일단 프로필은 다시
            수정해 두었는데, 삭제된 게시물은 다시 복구할 수 없는 걸까요? ㅠㅠㅠ 답변 부탁드립니다.!!
          </Q.QnAContent>
          <Q.Wrapper style={{ gap: "10px" }}>
            <Q.Pic>
              <img alt="임시" style={{ cursor: "pointer" }} onClick={goBack} />
            </Q.Pic>
            <Q.Pic>
              <img alt="임시" style={{ cursor: "pointer" }} onClick={goBack} />
            </Q.Pic>
            <Q.Pic>
              <img alt="임시" style={{ cursor: "pointer" }} onClick={goBack} />
            </Q.Pic>
            <Q.Pic>
              <img alt="임시" style={{ cursor: "pointer" }} onClick={goBack} />
            </Q.Pic>
          </Q.Wrapper>
          <Q.Wrapper style={{ gap: "10px" }}>
            <Q.Date>8월 1일</Q.Date>
            <Q.Divider />
            <Q.D_State>답변완료</Q.D_State>
          </Q.Wrapper>
        </Q.QnAWrapper>

        <Q.QnAWrapper>
          <Q.QnATitle>
            <Q.QMark>A</Q.QMark>
            계정이 해킹 당한 것 같습니다에 대한 답변
          </Q.QnATitle>
          <Q.QnAContent>
            안녕하세요, 짜파게티 요리사님! 순삭 고객지원 담당자입니다. 우선, 고객님께 불편을 드려 죄송합니다. 계정 해킹 건에 관해서는 마이페이지의 신고 기능을 통해 신고해주시면, 이와 같은 일이 다시
            발생하지 않도록 조치를 취하겠습니다. 다만, 이미 삭제된 게시물에 대해서는 복구가 어렵다는 점 양해 부탁드립니다. 감사합니다.
          </Q.QnAContent>
          <Q.Wrapper style={{ gap: "10px" }}>
            <Q.Date>8월 1일</Q.Date>
          </Q.Wrapper>
        </Q.QnAWrapper>
      </Q.Content>
    </Q.Container>
  );
};

export default QnADetail;
