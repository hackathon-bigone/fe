import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Q from "../styles/StyledQnA.jsx";
import axios from "axios";

const QnAWrite = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my/question`);
  };

  const fileInputRef = useRef(null);
  const [pics, setPics] = useState([]);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const isActive = title.length > 0 && detail.length > 0;

  // 숨겨진 input 클릭 트리거
  const handleInPicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 시 상태 배열에 추가, 최대 4장까지
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPics((prev) => [...prev, ...files].slice(0, 4));
  };

  // 개별 이미지 삭제
  const handleDeletePic = (idx) => {
    setPics((prev) => prev.filter((_, i) => i !== idx));
  };

  const getUniqueFileName = (file) => {
    const timestamp = Date.now();
    return `${timestamp}-${file.name}`;
  };

  // 저장 함수 (S3 업로드 및 게시글 등록)
  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("access_token");
      const imageKeys = [];

      for (const file of pics) {
        const uniqueFileName = getUniqueFileName(file);

        // presigned url 획득
        const response = await axios.post(
          "http://43.203.179.188/uploads/qna",
          [
            {
              filename: uniqueFileName,
              contentType: file.type,
            },
          ],
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const putUrl = response.data[0].putUrl;

        // S3 업로드
        await axios.put(putUrl, file, {
          headers: { "Content-Type": file.type },
        });

        imageKeys.push(response.data[0].key);
      }

      // 게시글 데이터 전송
      const payload = {
        title,
        body: detail,
        imageKeys,
      };

      await axios.post("http://43.203.179.188/mypage/qna", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      goBack();
    } catch (error) {
      setErrorMsg(error.message || "업로드 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Q.Container>
      <Q.Header>
        <Q.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={goBack} style={{ cursor: "pointer" }} />
          <Q.Title>문의 글쓰기</Q.Title>
        </Q.Icons>
      </Q.Header>

      <Q.Content>
        <Q.InputWrapper>
          <Q.InTitle>제목</Q.InTitle>
          <Q.Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Q.InputWrapper>

        <Q.InputWrapper>
          <Q.InTitle>문의 내용</Q.InTitle>
          <Q.Textarea value={detail} onChange={(e) => setDetail(e.target.value)} />
        </Q.InputWrapper>

        <Q.InputWrapper>
          <Q.InTitle>첨부 파일</Q.InTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {pics.map((file, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  width: 80,
                  height: 80,
                  border: "1px solid #eee",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <img
                  src={`${process.env.PUBLIC_URL}/images/Delete.svg`}
                  alt="delete"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 18,
                    height: 18,
                    cursor: "pointer",
                    background: "#fff",
                    borderRadius: "50%",
                  }}
                  onClick={() => handleDeletePic(idx)}
                />
              </div>
            ))}
            {pics.length < 4 && (
              <Q.File onClick={handleInPicClick} style={{ cursor: "pointer" }}>
                <img src={`${process.env.PUBLIC_URL}/images/File_add.svg`} alt="add" />
                <div id="text">파일 추가</div>
              </Q.File>
            )}
          </div>
          <div style={{ fontSize: 13, color: "#969696", marginTop: 4 }}>{pics.length}/4</div>
          <input type="file" accept="image/*" multiple ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        </Q.InputWrapper>

        <Q.UploadBtn style={{ background: isActive ? "#FF4F26" : "#C4C4C4", cursor: isActive ? "pointer" : "default" }} onClick={handleSave}>
          작성 완료
        </Q.UploadBtn>
      </Q.Content>
    </Q.Container>
  );
};

export default QnAWrite;
