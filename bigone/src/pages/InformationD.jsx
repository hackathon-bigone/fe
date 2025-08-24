import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as I from "../styles/StyledInform.jsx";
import axios from "axios";

const Inform_Detail = () => {
  const navigate = useNavigate();

  const goBack = () => {
    console.log("goBack clicked");
    navigate(`/my/inform`);
  };

  const token = localStorage.getItem("access_token");
  const [notice, setNotice] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://43-203-179-188.sslip.io/mypage/notice/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotice(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <I.Container>
      <I.Header>
        <I.Icons>
          <img
            id="back"
            src={`${process.env.PUBLIC_URL}/images/back.svg`}
            alt="back"
            style={{ cursor: "pointer" }}
            onClick={goBack}
          />
          <I.Title>공지사항 상세</I.Title>
        </I.Icons>
      </I.Header>
      <I.Content>
        <I.InformWrapper>
          <I.InformTitle>{notice.title}</I.InformTitle>
          <I.InformContentD>{notice.body}</I.InformContentD>
          <I.Date>{notice.displayDate}</I.Date>
        </I.InformWrapper>
      </I.Content>
    </I.Container>
  );
};

export default Inform_Detail;
