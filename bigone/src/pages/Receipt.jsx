import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledReceipt";
import axios from "axios";

const Receipt = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [previewUrl, setPreviewUrl] = useState(null); // 미리보기용
  const [file, setFile] = useState(null); // 업로드용 원본 파일
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 20 * 1024 * 1024) {
      alert("파일 최대 20MB 입니다.");
      e.target.value = "";
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  // 컴포넌트 unmount 시 URL 해제
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const goScan = async () => {
    if (!file) return;

    navigate("/refrigerator/ingredients/receipt/scan", {
      state: { file }, // ✅ File 객체 전달
    });

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("로그인 토큰이 없습니다. 다시 로그인 해주세요.");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("file", file); // 명세: key = file

      const { data } = await axios.post(
        "http://43.203.179.188/foodbox/receipt/upload",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Content-Type 은 넣지 말기 (axios가 boundary 자동 세팅)
          },
          timeout: 60000,
        }
      );

      // data 예시: [{ name: "현미밥", quantity: 1 }, ...]
      navigate(`/refrigerator/ingredients/receipt/scan`, {
        state: { items: data },
      });
    } catch (err) {
      console.error("영수증 업로드 실패:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "업로드 중 오류가 발생했습니다.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <E.Container>
      <E.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <div>영수증 인식</div>
      </E.Header>
      <E.Body>
        <E.Title>영수증 첨부</E.Title>

        <E.Image onClick={handleImageClick} isUploaded={!!previewUrl}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="영수증 미리보기"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <E.PlusIcon>
                <img
                  src={`${process.env.PUBLIC_URL}/images/Plus.svg`}
                  alt="plus"
                />
              </E.PlusIcon>
              <E.ImageText>
                영수증 이미지 파일을
                <br />
                첨부해 주세요.
              </E.ImageText>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </E.Image>

        <E.Button disabled={!file} onClick={goScan}>
          스캔하기
        </E.Button>
      </E.Body>
    </E.Container>
  );
};

export default Receipt;
