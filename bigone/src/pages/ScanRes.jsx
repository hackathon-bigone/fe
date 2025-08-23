import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as E from "../styles/StyledScanRes";
import axios from "axios";

// 개발환경에서 CRA 프록시(setupProxy.js) 사용을 권장: 절대URL 대신 상대경로
const API_BASE = "/foodbox";

const ScanRes = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // ScanCom에서 넘겨준 스캔 결과 (예: [{name:"복숭아", quantity:1}, ...])
  const scannedItems = Array.isArray(state?.items) ? state.items : [];

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 인풋 행: { name, quantity, date }
  const [inputs, setInputs] = useState([{ name: "", quantity: "", date: "" }]);

  // 스캔 결과로 초기값 채우기
  useEffect(() => {
    if (!scannedItems.length) return;

    const prefilled = scannedItems.map((it) => ({
      name: String(it?.name ?? "").trim(),
      // 인풋은 문자열이 다루기 편함
      quantity: it?.quantity != null ? String(it.quantity) : "",
      date: "",
    }));

    // 마지막에 “빈 줄 하나” 추가해서 사용자가 더 입력할 수 있게
    setInputs([...prefilled, { name: "", quantity: "", date: "" }]);
  }, [scannedItems]);

  // 뒤로가기(모달)
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

  // 첫 행이 모두 채워졌는지 체크(이 규칙은 기존 UX 유지)
  const isFirstRowFilled = useMemo(() => {
    const first = inputs[0] || { name: "", quantity: "", date: "" };
    return (
      first.name.trim() !== "" &&
      first.quantity.trim() !== "" &&
      first.date.trim() !== ""
    );
  }, [inputs]);

  // 숫자만 뽑기: "3개", "02", " 5 " 모두 OK
  const extractNumber = (str) => {
    if (typeof str !== "string") return 0;
    const m = str.trim().match(/^\d+/);
    return m ? parseInt(m[0], 10) : 0;
  };

  // 저장(POST)
  const handleSave = async () => {
    if (!isFirstRowFilled || saving) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token)
        throw new Error("로그인 토큰이 없습니다. 다시 로그인해 주세요.");

      // 완전히 빈 줄은 제외하고, 서버 규격에 맞게 변환
      const payload = inputs
        .filter((row) => (row.name || row.quantity || row.date).trim() !== "")
        .map((row) => ({
          name: row.name.trim(),
          quantity: extractNumber(row.quantity),
          // 빈 문자열이면 null 전송 (백엔드가 null 허용)
          expiryDate: row.date.trim() === "" ? null : row.date.trim(),
        }));

      if (payload.length === 0) {
        throw new Error("보낼 데이터가 없습니다.");
      }

      await axios.post(`${API_BASE}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // 성공 시 이전 화면으로 (필요시 원하는 경로로 변경)
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
