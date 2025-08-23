import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as P from "../styles/StyledPurW.jsx";
import Modal from "../pages/components/Modal.jsx";
import Select from "react-select";
import axios from "axios";

const PurEdit = () => {
  const navigate = useNavigate();

  const goPur = () => {
    navigate(`/purchase`);
  };

  const modalOpen = () => {
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  const token = localStorage.getItem("access_token");
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [pic, setPic] = useState(null);
  const [title, setTitle] = useState("");
  const [member, setMember] = useState("");
  const [detail, setDetail] = useState("");
  const [links, setLinks] = useState([""]);
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const { user_id } = useParams();

  const statusOptions = [
    { value: "RECRUITING", label: "모집중" },
    { value: "COMPLETED", label: "모집완료" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "170px",
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
      width: "170px",
      background: "rgba(255, 79, 38, 0.80)", // 옵션 배경
    }),
  };

  const isActive =
    typeof title === "string" &&
    title.length > 0 &&
    typeof member === "string" &&
    member.length > 0 &&
    typeof detail === "string" &&
    detail.length > 0 &&
    Array.isArray(links) &&
    links.length > 0 &&
    links.every((link) => typeof link === "string" && link.trim().length > 0);

  const getUniqueFileName = (file) => {
    const timestamp = Date.now();
    const originalName = file.name;
    return `${timestamp}-${originalName}`;
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://43.203.179.188/groupbuys/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        console.log("Loaded data:\n", JSON.stringify(data, null, 2));
        console.log(data.groupbuyLinkUrls);
        setPic(data.mainImageUrl);
        setTitle(data.groupbuyTitle || "");
        setDetail(data.groupbuyDescription || "");
        setStatus(data.status);
        setMember(data.groupbuyCount !== undefined && data.groupbuyCount !== null ? String(data.groupbuyCount) : "");
        setLinks(data.groupbuyLinkUrls && Array.isArray(data.groupbuyLinkUrls) ? data.groupbuyLinkUrls : [""]);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [user_id, token]);

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!title || !member || !detail || !links.every((link) => link.trim().length > 0)) {
        throw new Error("모든 필드를 올바르게 입력해주세요.");
      }

      const token = localStorage.getItem("access_token");
      let mainImageUrl = pic;

      if (pic && pic instanceof File) {
        const uniqueFileName = getUniqueFileName(pic);

        const response = await axios.post(
          "http://43.203.179.188/uploads/groupbuy",
          [
            {
              filename: uniqueFileName,
              contentType: "image/png",
            },
          ],
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const putUrl = response.data[0].putUrl;

        await axios.put(putUrl, pic, {
          headers: { "Content-Type": "image/png" },
        });

        mainImageUrl = response.data[0].key;
      } else if (!pic) {
        throw new Error("이미지를 선택해주세요.");
      }

      const payload = {
        groupbuyTitle: title,
        mainImageUrl: mainImageUrl,
        groupbuyCount: Number(member),
        groupbuyDescription: detail,
        status: status,
        buyLinks: links.map((link) => link.trim()),
      };

      await axios.put(`http://43.203.179.188/groupbuys/${user_id}`, payload, {
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
          <P.Title>게시물 수정</P.Title>
        </P.Icons>
      </P.Header>
      <P.Content>
        <P.InputWrapper>
          <P.InTitle>대표사진</P.InTitle>
          <P.InPic onClick={handleInPicClick} style={{ cursor: "pointer" }}>
            {pic ? (
              <img
                src={
                  pic instanceof File
                    ? URL.createObjectURL(pic) // 사용자가 업로드한 파일 미리보기
                    : `http://43.203.179.188/uploads/r?key=${pic}` // 서버에서 가져온 기존 이미지
                }
                alt="Selected"
                style={{ width: 350, height: 350, objectFit: "cover", borderRadius: 5 }}
              />
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
          <P.Row>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <P.InTitle>모집 인원</P.InTitle>
              <P.Input placeholder="0명" value={member} onChange={(e) => setMember(e.target.value)} style={{ width: "170px", height: "50px" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <P.InTitle>모집 상태</P.InTitle>
              <Select options={statusOptions} value={statusOptions.find((opt) => opt.value === status)} onChange={(e) => setStatus(e.value)} styles={customStyles} placeholder="상태 선택" />
            </div>
          </P.Row>
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
          수정 완료
        </P.UploadBtn>
      </P.Content>
      <Modal
        title="게시물 수정을 그만둘까요?"
        content="게시물 수정 페이지를 벗어나면 수정된 내용은 저장되지 않고 사라집니다."
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

export default PurEdit;
