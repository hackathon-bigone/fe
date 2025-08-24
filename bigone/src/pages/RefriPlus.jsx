import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledRPlus";
import axios from "axios";

const API_GET_URL = "https://43-203-179-188.sslip.io/foodbox"; // 목록 조회
const API_PATCH_URL = "https://43-203-179-188.sslip.io/foodbox";

// 숫자만 추출(앞자리), 없으면 0
const extractNumber = (str) => {
  const m = String(str ?? "")
    .trim()
    .match(/^\d+/);
  return m ? parseInt(m[0], 10) : 0;
};

// UI: 숫자를 '개'로 보여주기
const withUnit = (val) => {
  const n = typeof val === "number" ? val : extractNumber(val);
  return n === 0 && String(val ?? "").trim() === "" ? "" : `${n}개`;
};

// blur 시 '개' 보장
const ensureUnitOnBlur = (str) => {
  const n = extractNumber(str);
  return String(str ?? "").trim() === "" ? "" : `${n}개`;
};

const RefPlus = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]); // [{food_id, name, quantity, expiryDate}]
  const [loading, setLoading] = useState(true);
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

  const goDel = () => {
    navigate(`/refrigerator/ingredients/delete`);
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const token = localStorage.getItem("access_token");
        if (!token)
          throw new Error("로그인 토큰이 없습니다. 다시 로그인해주세요.");

        const { data } = await axios.get(API_GET_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const list = (Array.isArray(data) ? data : data?.items || []).map(
          (it) => ({
            ...it,
            quantity: withUnit(it.quantity), // 숫자만 와도 UI는 'n개'로
          })
        );
        setItems(list);
      } catch (e) {
        console.error(e);
        setErrorMsg(
          e?.response?.data?.message ||
            e?.message ||
            "목록을 불러오지 못했어요."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleQtyFocus = (idx) => {
    setItems((prev) => {
      const next = [...prev];
      const v = String(next[idx].quantity ?? "");
      next[idx].quantity = v.endsWith("개") ? v.replace(/개$/, "") : v;
      return next;
    });
  };
  const handleQtyBlur = (idx) => {
    setItems((prev) => {
      const next = [...prev];
      next[idx].quantity = ensureUnitOnBlur(next[idx].quantity);
      return next;
    });
  };

  const canSubmit = items.length > 0 && !loading && !saving;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSaving(true);
    setErrorMsg("");
    try {
      const token = localStorage.getItem("access_token");
      if (!token)
        throw new Error("로그인 토큰이 없습니다. 다시 로그인해주세요.");

      const payload = {
        items: items.map((it) => ({
          food_id: it.food_id,
          name: String(it.name ?? "").trim(),
          quantity: extractNumber(it.quantity), // 숫자만 전송
          expiryDate: String(it.expiryDate ?? "").trim() || null, // 명세에 null 허용
        })),
      };

      await axios.patch(API_PATCH_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 정확히 이 형태
        },
      });

      navigate("/refrigerator");
    } catch (e) {
      console.error(e);
      setErrorMsg(
        e?.response?.data?.message || e?.message || "수정 저장에 실패했어요."
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
        <div>식품 목록 수정</div>
      </E.Header>
      <E.Body>
        <E.Detail>
          <E.Status>
            <div id="circle" />
            <div id="all">식품 전체</div>
          </E.Status>
          <E.Delete onClick={goDel}>삭제</E.Delete>
        </E.Detail>
        <E.Title>
          <div id="name">식품명</div>
          <div id="num">수량</div>
          <div id="date">유통기한</div>
        </E.Title>
        <E.List>
          {loading ? (
            <div style={{ padding: "12px 0" }}>불러오는 중...</div>
          ) : items.length === 0 ? (
            <div style={{ padding: "12px 0" }}>표시할 항목이 없어요.</div>
          ) : (
            items.map((it, idx) => (
              <E.Input key={it.food_id ?? idx}>
                <E.Name>
                  <input
                    type="text"
                    value={it.name ?? ""}
                    onChange={(e) => handleChange(idx, "name", e.target.value)}
                    placeholder="식품명"
                  />
                </E.Name>

                <E.Num>
                  <input
                    type="text"
                    value={it.quantity ?? ""} // UI엔 'n개'
                    onChange={(e) =>
                      handleChange(idx, "quantity", e.target.value)
                    }
                    onFocus={() => handleQtyFocus(idx)} // 편집 시 '개' 제거
                    onBlur={() => handleQtyBlur(idx)} // 포커스아웃 시 '개' 붙임
                    placeholder="0개"
                  />
                </E.Num>

                <E.Date>
                  <input
                    type="text"
                    value={it.expiryDate ?? ""}
                    onChange={(e) =>
                      handleChange(idx, "expiryDate", e.target.value)
                    }
                    placeholder="ex) 25.08.11"
                  />
                </E.Date>
              </E.Input>
            ))
          )}
        </E.List>
      </E.Body>

      <E.Enter>
        <E.Button onClick={handleSubmit} disabled={!canSubmit}>
          {saving ? "저장 중..." : "수정 완료"}
        </E.Button>
      </E.Enter>

      {showModal && (
        <E.ModalOverlay>
          <E.ModalContent>
            <p>식품 목록 수정을 그만둘까요?</p>
            <div>
              식품 목록 수정 페이지를 벗어나면 <br />
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

export default RefPlus;
