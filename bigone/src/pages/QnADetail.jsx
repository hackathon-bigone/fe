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
  const [modalOpen, setModalOpen] = useState(false); // 모달창 열림 여부
  const [modalImg, setModalImg] = useState(""); // 모달에 띄울 이미지 URL

  const handleImageClick = (src) => {
    setModalImg(src);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://43-203-179-188.sslip.io/mypage/qna/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg`}
            alt="back"
            style={{ cursor: "pointer" }}
            onClick={goBack}
          />
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
                    <img
                      alt={`image-${idx}`}
                      src={imgSrc}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleImageClick(imgSrc)}
                    />
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

        {modalOpen && (
          <Q.Modal onClick={() => setModalOpen(false)}>
            {/* <img id="back" src={`${process.env.PUBLIC_URL}/images/Delete_p.svg`} alt="back" style={{ cursor: "pointer" }} /> */}
            <img
              src={modalImg}
              alt="modal-img"
              style={{
                maxWidth: "350px",
                maxHeight: "350px",
                borderRadius: "5px",
                background: "#fff",
                objectFit: "contain",
              }}
              onClick={(e) => e.stopPropagation()} // 이미지 누르면 모달 안 닫힘
            />
          </Q.Modal>
        )}
      </Q.Content>
    </Q.Container>
  );
};

export default QnADetail;
