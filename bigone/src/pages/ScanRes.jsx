import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as E from "../styles/StyledScanRes";
import axios from "axios";

const API_URL = "https://43-203-179-188.sslip.io/foodbox/ocr/save";

const ScanRes = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const scannedItems = Array.isArray(state?.items) ? state.items : [];

  const [inputs, setInputs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ✅ 처음 진입 시 서버에 저장 요청 후 응답 받아오기
  useEffect(() => {
    const saveAndLoad = async () => {
      if (!scannedItems.length) return;

      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("로그인이 필요합니다.");

        const response = await axios.post(API_URL, scannedItems, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("[✅ 저장 후 응답 데이터]", response.data);

        const formatted = response.data.map((item) => ({
          name: item.name,
          quantity: String(item.quantity),
          date: item.expiryDate ?? "",
        }));

        setInputs([...formatted, { name: "", quantity: "", date: "" }]);
      } catch (err) {
        console.error("❌ 저장 실패:", err);
        setErrorMsg(
          err?.response?.data?.message ||
            err?.message ||
            "데이터를 불러오는 데 실패했습니다."
        );
      }
    };

    saveAndLoad();
  }, [scannedItems]);

  const goBack = () => setShowModal(true);
  const handleConfirm = () => {
    setShowModal(false);
    navigate(`/`);
  };
  const handleCancel = () => setShowModal(false);

  const handleAddInput = () => {
    setInputs((prev) => [...prev, { name: "", quantity: "", date: "" }]);
  };

  const handleChange = (index, field, value) => {
    setInputs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleRemoveInput = (index) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const isFirstRowFilled = useMemo(() => {
    const first = inputs[0] || { name: "", quantity: "", date: "" };
    return (
      first.name.trim() !== "" &&
      first.quantity.trim() !== "" &&
      first.date.trim() !== ""
    );
  }, [inputs]);

  const extractNumber = (str) => {
    if (typeof str !== "string") return 0;
    const m = str.trim().match(/^\d+/);
    return m ? parseInt(m[0], 10) : 0;
  };

  const handleSave = async () => {
    if (!isFirstRowFilled || saving) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("로그인이 필요합니다.");

      const payload = inputs
        .filter((row) => (row.name || row.quantity || row.date).trim() !== "")
        .map((row) => ({
          name: row.name.trim(),
          quantity: extractNumber(row.quantity),
          expiryDate: row.date.trim() === "" ? null : row.date.trim(),
        }));

      console.log("[💾 저장 요청 payload]", payload);

      await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/refrigerator/ingredients");
    } catch (err) {
      console.error("[❌ 저장 중 오류]", err);
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
            const isFilled =
              item.name.trim() !== "" &&
              item.quantity.trim() !== "" &&
              item.date.trim() !== "";

            // "유효한 항목만" + "마지막 줄은 항상 남기기"
            const isLast = index === inputs.length - 1;
            if (!isFilled && !isLast) return null;

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

export default ScanRes;
