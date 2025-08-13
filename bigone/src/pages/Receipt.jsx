import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledReceipt";

const Receipt = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const goScan = () => {
    if (!image) return;
    navigate(`/refrigerator/ingredients/receipt/scan`);
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
        <E.Image onClick={handleImageClick} isUploaded={!!image}>
          {image ? (
            <img
              src={image}
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
        <E.Button disabled={!image} onClick={goScan}>
          스캔하기
        </E.Button>
      </E.Body>
    </E.Container>
  );
};

export default Receipt;
