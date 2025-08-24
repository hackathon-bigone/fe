import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Q from "../styles/StyledQnA.jsx";
import axios from "axios";

const QnA = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my`);
  };

  const goWrite = () => {
    navigate(`/my/question/write`);
  };

  const goDetail = (id) => {
    navigate(`/my/question/detail/${id}`);
  };

  const token = localStorage.getItem("access_token");
  const [qna, setQna] = useState([]);
  const [count, setCount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://43-203-179-188.sslip.io/mypage/qna`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCount(response.data.count);
        setQna(response.data.items);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <Q.Container>
      <Q.Header>
        <Q.Icons>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg`}
            alt="back"
            style={{ cursor: "pointer" }}
            onClick={goBack}
          />
          <Q.Title>Q&A</Q.Title>
        </Q.Icons>
        <Q.Icons>
          <img
            id="pencil"
            src={`${process.env.PUBLIC_URL}/images/pencil_w.svg`}
            alt="pencil"
            style={{ cursor: "pointer" }}
            onClick={goWrite}
          />
        </Q.Icons>
      </Q.Header>

      <Q.Content>
        <Q.Wrapper>
          <Q.D_Inform_black>문의 내역</Q.D_Inform_black>
          <Q.D_Inform_gray>{count}건</Q.D_Inform_gray>
        </Q.Wrapper>
        {qna.map((item, idx) => (
          <Q.QnAWrapper onClick={() => goDetail(item.question_id)} key={idx}>
            <Q.QnATitle>
              <Q.QMark>Q</Q.QMark>
              {item.title}
            </Q.QnATitle>
            <Q.QnAContent>
              {item.body.length > 50
                ? item.body.slice(0, 50) + "..."
                : item.body}
            </Q.QnAContent>
            <Q.Wrapper style={{ gap: "10px" }}>
              <Q.Date>{item.displayDate}</Q.Date>
              <Q.Divider />
              <Q.D_State>{item.answerStatus}</Q.D_State>
            </Q.Wrapper>
          </Q.QnAWrapper>
        ))}
      </Q.Content>
    </Q.Container>
  );
};

export default QnA;
