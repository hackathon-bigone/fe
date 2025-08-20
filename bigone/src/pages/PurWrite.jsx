import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPurW.jsx";
import Modal from "../pages/components/Modal.jsx";
import axios from "axios";

const PurWrite = () => {
  const navigate = useNavigate();

  const goPur = () => {
    navigate(`/purchase`);
  };

  const [isOpen, setIsOpen] = useState(false);
  const modalOpen = () => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };

  const fileInputRef = useRef(null);
  const [pic, setPic] = useState(null);

  const [title, setTitle] = useState("");
  const [member, setMember] = useState("");
  const [detail, setDetail] = useState("");
  const [links, setLinks] = useState([""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const isActive = title.length > 0 && member.length > 0 && detail.length > 0 && links.every((link) => link.trim().length > 0); // 모든 공동구매 링크가 채워져야 동작하도록 구현

  const onClickAddLinkBtn = () => {
    setLinks([...links, ""]);
  };

  const handleInPicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPic(file);
    }
  };

  const handleRemoveInput = (index) => {
    if (links.length > 1) {
      const newLinks = [...links];
      newLinks.splice(index, 1); // index 위치의 요소를 제거
      setLinks(newLinks);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!pic) throw new Error("이미지를 선택해주세요.");
      if (!title || !member || !detail || !links.every((link) => link.trim().length > 0)) {
        throw new Error("모든 필드를 올바르게 입력해주세요.");
      }

      const token = localStorage.getItem("access_token");

      // 1. Presigned URL 요청 → 파일명과 타입만 배열로 전달
      const response = await axios.post(
        "http://43.203.179.188/uploads/groupbuy",
        [
          {
            filename: "groupbuyImage",
            contentType: "image/png",
          },
        ],
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const putUrl = response.data[0].putUrl;
      console.log(putUrl);

      // 2. S3에 파일 업로드(put)
      await axios.put(putUrl, pic, {
        headers: { "Content-Type": "image/png" },
      });

      // 3. 게시물 데이터 서버에 전송
      const payload = {
        groupbuyTitle: title,
        mainImageUrl: response.data[0].key,
        groupbuyCount: Number(member),
        groupbuyDescription: detail,
        buyLinks: links.map((link) => ({ groupbuyLinkUrls: link.trim() })),
      };
      console.log(typeof member, member);
      console.log(payload);
      await axios.post("http://43.203.179.188/groupbuys", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      goPur();
    } catch (error) {
      setErrorMsg(error.message || "업로드 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <P.Container>
      <P.Header>
        <P.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={modalOpen} style={{ cursor: "pointer" }} />
          <P.Title>공동구매 글쓰기</P.Title>
        </P.Icons>
      </P.Header>
      <P.Content>
        <P.InputWrapper>
          <P.InTitle>대표사진</P.InTitle>
          <P.InPic onClick={handleInPicClick} style={{ cursor: "pointer" }}>
            {pic ? (
              <img src={URL.createObjectURL(pic)} alt="Selected" style={{ width: 350, height: 350, objectFit: "cover", borderRadius: 5 }} />
            ) : (
              <>
                <img id="plus" src={`${process.env.PUBLIC_URL}/images/Plus.svg`} alt="plus" />
                <p>게시물의 대표 사진을 업로드해 주세요.</p>
              </>
            )}
          </P.InPic>
          <input type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
        </P.InputWrapper>
        <P.InputWrapper>
          <P.InTitle>제목</P.InTitle>
          <P.Input value={title} onChange={(e) => setTitle(e.target.value)}></P.Input>
        </P.InputWrapper>
        <P.InputWrapper>
          <P.InTitle>모집인원</P.InTitle>
          <P.Input placeholder="0명" value={member} onChange={(e) => setMember(e.target.value)}></P.Input>
        </P.InputWrapper>
        <P.InputWrapper>
          <P.InTitle>상세 설명</P.InTitle>
          <P.Textarea value={detail} onChange={(e) => setDetail(e.target.value)}></P.Textarea>
        </P.InputWrapper>

        {links.map((linkValue, index) => (
          <P.LinkWrapper key={index}>
            {index === 0 && <P.InTitle>공동구매 링크</P.InTitle>}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
              <P.Input
                value={linkValue}
                onChange={(e) => {
                  const newLinks = [...links];
                  newLinks[index] = e.target.value;
                  setLinks(newLinks);
                }}
                style={{ width: links.length > 1 ? "300px" : "350px" }} // 2개 이상이면 줄임
              />
              {links.length > 1 && <P.DeleteIcon src={`${process.env.PUBLIC_URL}/images/delete_o.svg`} alt="delete" onClick={() => handleRemoveInput(index)} style={{ cursor: "pointer" }} />}
            </div>
          </P.LinkWrapper>
        ))}

        <P.AddLinkBtn onClick={onClickAddLinkBtn}>
          <img id="plusLink" src={`${process.env.PUBLIC_URL}/images/Plus_b.svg`} alt="plus" />
          <div>링크 추가</div>
        </P.AddLinkBtn>
        <P.UploadBtn style={{ background: isActive ? "#FF4F26" : "#C4C4C4", cursor: isActive ? "pointer" : "default" }} onClick={handleSave}>
          게시물 업로드
        </P.UploadBtn>
      </P.Content>
      <Modal
        title="게시물 작성을 그만둘까요?"
        content="게시물 작성 페이지를 벗어나면 작성된 내용은 저장되지 않고 사라집니다."
        isOpen={isOpen}
        onClose={modalClose}
        onConfirm={() => {
          modalClose();
          goPur();
        }}
      ></Modal>
    </P.Container>
  );
};

export default PurWrite;
