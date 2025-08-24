import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledDelete";
import axios from "axios";

const API_BASE = "https://43-203-179-188.sslip.io/foodbox";

const withUnit = (n) => `${Number(n ?? 0)}개`;

const RefDel = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]); // [{food_id,name,quantity,expiryDate,checked}]
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleting, setDeleting] = useState(false);

  const goBack = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const [checked, setChecked] = useState(false);

  const toggleCheck = (idx) => {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], checked: !next[idx].checked };
      return next;
    });
  };

  const allChecked = items.length > 0 && items.every((it) => it.checked);
  const anyChecked = items.some((it) => it.checked);

  const toggleAll = () => {
    setItems((prev) => prev.map((it) => ({ ...it, checked: !allChecked })));
  };

  const openDeleteConfirm = () => {
    if (!anyChecked) return;
    setShowModal(true);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const token = localStorage.getItem("access_token");
        if (!token)
          throw new Error("로그인 토큰이 없습니다. 다시 로그인해주세요.");

        const { data } = await axios.get(API_BASE, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const list = (Array.isArray(data) ? data : data?.items || []).map(
          (it) => ({
            ...it,
            checked: false,
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

  const handleConfirm = async () => {
    if (!anyChecked || deleting) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token)
        throw new Error("로그인 토큰이 없습니다. 다시 로그인해주세요.");

      const ids = items.filter((it) => it.checked).map((it) => it.food_id);

      // axios에서 DELETE body는 config.data에 넣는다
      await axios.delete(API_BASE, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: ids, // [2,3,...]
      });

      // 성공: 이전 페이지로
      navigate(-1);
    } catch (e) {
      console.error(e);
      setErrorMsg(
        e?.response?.data?.message || e?.message || "삭제에 실패했어요."
      );
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <E.Container>
      <E.Header>
        <img src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" />
        <div>식품 목록 수정</div>
      </E.Header>
      <E.Body>
        <E.Detail>
          <E.Status>
            <div id="circle" />
            <div id="all">식품 전체</div>
          </E.Status>
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
              <E.Input key={it.food_id}>
                <E.Check
                  checked={it.checked}
                  onClick={() => toggleCheck(idx)}
                />
                <E.Name>{it.name}</E.Name>
                <E.Num>{withUnit(it.quantity)}</E.Num>
                <E.Date>{it.expiryDate}</E.Date>
              </E.Input>
            ))
          )}
        </E.List>
      </E.Body>

      <E.Enter>
        <E.All onClick={toggleAll}>
          {allChecked ? "전체 해제" : "전체 선택"}
        </E.All>
        <E.Del
          selected={anyChecked}
          onClick={openDeleteConfirm}
          disabled={!anyChecked}
        >
          {deleting ? "삭제 중..." : "삭제"}
        </E.Del>
      </E.Enter>

      {showModal && (
        <E.ModalOverlay>
          <E.ModalContent>
            <p>선택한 항목을 삭제할까요?</p>
            <div>삭제된 항목은 복구할 수 없습니다.</div>
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

export default RefDel;
