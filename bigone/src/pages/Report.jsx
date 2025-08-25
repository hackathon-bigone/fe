import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledReport.jsx";
import Select from "react-select";
import axios from "axios";

const ReportWrite = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my`);
  };

  const fileInputRef = useRef(null);
  const [pics, setPics] = useState([]);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [reportedUser, setReportedUser] = useState("");
  const [reportedUnit, setReportedUnit] = useState("");
  const [link, setLink] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const targetOptions = [
    { value: "USER", label: "사용자" },
    { value: "POST", label: "게시글" },
  ];

  const typeOptions = [
    { value: "INAPPROPRIATE_CONTENT", label: "게시판 성격에 부적절한 대화" },
    { value: "INSULT", label: "욕설/비하" },
    { value: "PORNOGRAPHIC", label: "음란물/불건전한 콘텐츠" },
    { value: "IMPERSONATION", label: "사칭/사기" },
  ];

  const [target, setTarget] = useState(null);
  const [reportType, setReportType] = useState(null);

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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "350px",
      height: "50px",
      minHeight: "50px",
      borderRadius: "5px",
      border: state.isFocused ? "1px solid #FF4F26" : "1px solid #C4C4C4",
      boxShadow: state.isFocused ? "0 0 0 1px #FF4F26" : "none",
      fontSize: "15px",
      "&:hover": {
        border: "1px solid #FF4F26",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "50px",
      padding: "0 15px",
      display: "flex",
      alignItems: "center",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#000",
      "&:hover": {
        color: "#FF4F26",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#fff",
      fontWeight: 500,
      fontSize: "15px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
      fontSize: "15px",
    }),
    menu: (provided) => ({
      ...provided,
      width: "350px",
      background: "rgba(255, 79, 38, 0.80)", // 옵션 배경
    }),
  };

  // 저장 함수 (S3 업로드 및 게시글 등록)
  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("access_token");

      if (!title || !detail || !target || !reportType) {
        throw new Error("모든 필드를 올바르게 입력해주세요.");
      }

      const imageKeys = [];

      // 이미지 S3 업로드
      for (const file of pics) {
        const uniqueFileName = getUniqueFileName(file);

        const response = await axios.post("https://43-203-179-188.sslip.io/uploads/qna", [{ filename: uniqueFileName, contentType: file.type }], { headers: { Authorization: `Bearer ${token}` } });

        const putUrl = response.data[0].putUrl;
        await axios.put(putUrl, file, { headers: { "Content-Type": file.type } });

        imageKeys.push(response.data[0].key);
      }

      // payload 구성
      const payload = {
        title: title,
        target: target, // USER 또는 POST
        type: reportType, // 신고 유형
        postLink: link || "", // 게시물 링크
        body: detail,
        imageKeys: imageKeys,
      };

      await axios.post("https://43-203-179-188.sslip.io/mypage/report", payload, {
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
    <R.Container>
      <R.Header>
        <R.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={goBack} style={{ cursor: "pointer" }} />
          <R.Title>신고</R.Title>
        </R.Icons>
      </R.Header>

      <R.Content>
        <R.InputWrapper>
          <R.InTitle>제목</R.InTitle>
          <R.Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </R.InputWrapper>

        <R.InputWrapper>
          <R.InTitle>신고 대상</R.InTitle>
          <Select
            options={targetOptions}
            value={targetOptions.find((opt) => opt.value === target)}
            onChange={(selected) => setTarget(selected.value)}
            styles={customStyles}
            placeholder="대상을 선택해주세요"
          />
        </R.InputWrapper>

        <R.InputWrapper>
          <R.InTitle>신고 유형</R.InTitle>
          <Select
            options={typeOptions}
            value={typeOptions.find((opt) => opt.value === reportType)}
            onChange={(selected) => setReportType(selected.value)}
            styles={customStyles}
            placeholder="유형을 선택해주세요"
          />
        </R.InputWrapper>

        <R.InputWrapper>
          <R.InTitle>게시물 링크</R.InTitle>
          <R.Input value={link} onChange={(e) => setLink(e.target.value)} />
        </R.InputWrapper>

        <R.InputWrapper>
          <R.InTitle>신고 내용</R.InTitle>
          <R.Textarea value={detail} onChange={(e) => setDetail(e.target.value)} />
        </R.InputWrapper>

        <R.InputWrapper>
          <R.InTitle>첨부 파일</R.InTitle>
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
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
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
              <R.File onClick={handleInPicClick} style={{ cursor: "pointer" }}>
                <img src={`${process.env.PUBLIC_URL}/images/File_add.svg`} alt="add" />
                <div id="text">파일 추가</div>
              </R.File>
            )}
          </div>
          <div style={{ fontSize: 13, color: "#969696", marginTop: 4 }}>{pics.length}/4</div>
          <input type="file" accept="image/*" multiple ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        </R.InputWrapper>

        <R.UploadBtn
          style={{
            background: isActive ? "#FF4F26" : "#C4C4C4",
            cursor: isActive ? "pointer" : "default",
          }}
          onClick={handleSave}
        >
          작성 완료
        </R.UploadBtn>
      </R.Content>
    </R.Container>
  );
};

export default ReportWrite;
