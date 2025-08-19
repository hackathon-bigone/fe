import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Q from "../styles/StyledQnA.jsx";
import axios from "axios";

const QnADetail = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my/question`);
  };

  const token = localStorage.getItem("access_token");
  const [qna, setQna] = useState([]);
  const [answer, setAnswer] = useState({});
  const [image, setImage] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://43.203.179.188/mypage/qna/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQna(response.data);
        setAnswer(response.data.answer);
        setImage(response.data.imageUrls);
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
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" style={{ cursor: "pointer" }} onClick={goBack} />
          <Q.Title>Q&A 상세</Q.Title>
        </Q.Icons>
      </Q.Header>

      <Q.Content>
        <Q.QnAWrapper>
          <Q.QnATitle>
            <Q.QMark>Q</Q.QMark>
            {qna.title}
          </Q.QnATitle>
          <Q.QnAContent>{qna.body}</Q.QnAContent>
          <Q.Wrapper style={{ gap: "10px" }}>
            {image.length > 0
              ? image.map((imgSrc, idx) => (
                  <Q.Pic key={idx}>
                    <img alt={`image-${idx}`} src={imgSrc} style={{ cursor: "pointer" }} />
                  </Q.Pic>
                ))
              : null}
          </Q.Wrapper>
          <Q.Wrapper style={{ gap: "10px" }}>
            <Q.Date>{qna.displayDate}</Q.Date>
            <Q.Divider />
            <Q.D_State>{qna.answerStatus}</Q.D_State>
          </Q.Wrapper>
        </Q.QnAWrapper>

        {qna.answerStatus !== "답변중" && (
          <Q.QnAWrapper>
            <Q.QnATitle>
              <Q.QMark>A</Q.QMark>
              {answer?.title}
            </Q.QnATitle>
            <Q.QnAContent>{answer?.body}</Q.QnAContent>
            <Q.Wrapper style={{ gap: "10px" }}>
              <Q.Date>{answer?.displayDate}</Q.Date>
            </Q.Wrapper>
          </Q.QnAWrapper>
        )}
      </Q.Content>
    </Q.Container>
  );
};

export default QnADetail;
