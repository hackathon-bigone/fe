import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as I from "../styles/StyledInform.jsx";
import axios from "axios";

const Inform = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my`);
  };

  const goDetail = (id) => {
    navigate(`/my/inform/detail/${id}`);
  };

  const token = localStorage.getItem("access_token");
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://43-203-179-188.sslip.io/mypage/notice`,
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
          <I.Title>공지사항</I.Title>
        </I.Icons>
      </I.Header>
      <I.Content>
        {notice.map((item, idx) => (
          <I.InformWrapper key={idx} onClick={() => goDetail(item.notice_id)}>
            <I.InformTitle>{item.title}</I.InformTitle>
            <I.InformContent>
              {item.body.length > 50
                ? item.body.slice(0, 50) + "..."
                : item.body}
            </I.InformContent>
            <I.Date>{item.displayDate}</I.Date>
          </I.InformWrapper>
        ))}
      </I.Content>
    </I.Container>
  );
};

export default Inform;
