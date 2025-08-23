import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledRefW";
import axios from "axios";
const API_URL = "http://43.203.179.188/foodbox";

const RefWrite = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const goBack = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate(-1);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const [inputs, setInputs] = useState([{ name: "", quantity: "", date: "" }]);

  const handleAddInput = () => {
    setInputs((prev) => [...prev, { name: "", quantity: "", date: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  // 첫 번째 줄이 모두 채워졌는지 확인
  const isFirstRowFilled =
    inputs[0].name.trim() !== "" &&
    inputs[0].quantity.trim() !== "" &&
    inputs[0].date.trim() !== "";

  // 저장(POST)
  const handleSave = async () => {
    if (!isFirstRowFilled || saving) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("로그인 토큰이 없습니다. 다시 로그인해 주세요.");
      }

      const extractNumber = (str) => {
        const match = str.trim().match(/^\d+/); // 맨 앞 연속된 숫자만
        return match ? parseInt(match[0], 10) : 0;
      };

      // 완전히 빈 행은 제외하고, 스펙에 맞게 매핑
      const payload = inputs
        .filter((row) => (row.name || row.quantity || row.date).trim() !== "")
        .map((row) => ({
          name: row.name.trim(),
          quantity: extractNumber(row.quantity), // 숫자만 추출
          expiryDate: row.date.trim() === "" ? null : row.date.trim(),
        }));

      if (payload.length === 0) {
        throw new Error("보낼 데이터가 없습니다.");
      }

      await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 서버가 다른 헤더명을 요구하면 여기만 바꾸면 됨
        },
      });

      // 성공 처리: 이전 화면으로 이동(원하면 경로 변경)
      navigate(-1);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err?.response?.data?.message ||
          err?.message ||
          "저장 중 오류가 발생했습니다."
      );
    } finally {
      setSaving(false);
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
        <div>직접 입력</div>
      </E.Header>
      <E.Body>
        <E.Title>식품 추가</E.Title>
        <E.Detail>
          <div id="name">식품명</div>
          <div id="num">수량</div>
          <div id="date">유통기한</div>
        </E.Detail>
        <E.List>
          {inputs.map((item, index) => {
            const hasInput =
              item.name.trim() !== "" ||
              item.quantity.trim() !== "" ||
              item.date.trim() !== "";

            return (
              <E.Input key={index}>
                <E.Name>
                  <input
                    type="text"
                    placeholder="식품명"
                    value={item.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </E.Name>

                <E.Num>
                  <input
                    type="text"
                    placeholder="0개"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                  />
                </E.Num>

                <E.Date hasDelete={hasInput}>
                  <input
                    type="text"
                    placeholder="ex) 25.08.20"
                    value={item.date}
                    onChange={(e) =>
                      handleChange(index, "date", e.target.value)
                    }
                  />
                </E.Date>

                {hasInput && (
                  <E.DeleteIcon
                    src={`${process.env.PUBLIC_URL}/images/delete_o.svg`}
                    alt="delete"
                    onClick={() => handleRemoveInput(index)}
                  />
                )}
              </E.Input>
            );
          })}

          <E.Plus onClick={handleAddInput}>
            <img
              src={`${process.env.PUBLIC_URL}/images/Plus_B.svg`}
              alt="plus"
            />
            <div>목록 추가</div>
          </E.Plus>
        </E.List>
        {/* 에러 메시지(있을 때만)
        {errorMsg && <E.ErrorMsg>{errorMsg}</E.ErrorMsg>} */}
        <E.Button
          active={isFirstRowFilled && !saving}
          disabled={!isFirstRowFilled || saving}
          onClick={handleSave}
        >
          {saving ? "저장 중..." : "저장하기"}
        </E.Button>
      </E.Body>

      {showModal && (
        <E.ModalOverlay>
          <E.ModalContent>
            <p>식품 목록 추가를 그만둘까요?</p>
            <div>
              식품 목록 추가 페이지를 벗어나면
              <br />
              작성된 내용은 저장되지 않고 사라집니다.
            </div>
            <E.ModalButtons>
              <button onClick={handleCancel}>취소</button>
              <button onClick={handleConfirm}>확인</button>
            </E.ModalButtons>
          </E.ModalContent>
        </E.ModalOverlay>
      )}
    </E.Container>
  );
};

export default RefWrite;
