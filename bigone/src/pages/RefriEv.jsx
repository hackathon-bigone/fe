import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledEvery";
import axios from "axios";

const RefEv = () => {
  const navigate = useNavigate();

  const goMy = () => {
    navigate(`/my`);
  };

  const goHome = () => {
    navigate(`/`);
  };

  const goPur = () => {
    navigate(`/purchase`);
  };

  const goRec = () => {
    navigate(`/recipe`);
  };

  const goEdit = () => {
    navigate(`/refrigerator/ingredients/edit`);
  };

  const goExp = () => {
    navigate(`/refrigerator`);
  };
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToReceipt = () => {
    navigate(`/refrigerator/ingredients/receipt`);
  };

  const goToManual = () => {
    navigate(`/refrigerator/ingredients/write`);
  };
  const [todayLabel, setTodayLabel] = useState("");
  const [groups, setGroups] = useState([]); // [{key:'25.08.24', items:[...]}]
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // 'YY.MM.DD' -> Date (정렬용)
  const parseYYMMDD = (s) => {
    const m = /^(\d{2})\.(\d{2})\.(\d{2})$/.exec(s || "");
    if (!m) return null;
    return new Date(2000 + +m[1], +m[2] - 1, +m[3]);
  };

  useEffect(() => {
    const fetchFoodbox = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setErrorMsg("로그인이 필요합니다.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("https://43-203-179-188.sslip.io/foodbox", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data || {};
        setTodayLabel(data.today || "");

        // items 그룹화 (expiryDate 없으면 '상시')
        const map = {};
        (data.items || []).forEach((it) => {
          const key = it.expiryDate ?? "상시";
          if (!map[key]) map[key] = [];
          map[key].push(it);
        });

        // 키 정렬: 날짜 오름차순 + '상시'는 맨 뒤
        const sortedKeys = Object.keys(map).sort((a, b) => {
          if (a === "상시") return 1;
          if (b === "상시") return -1;
          const da = parseYYMMDD(a);
          const db = parseYYMMDD(b);
          if (!da && !db) return 0;
          if (!da) return 1;
          if (!db) return -1;
          return da - db;
        });

        setGroups(sortedKeys.map((k) => ({ key: k, items: map[k] })));
      } catch (err) {
        console.error("❌ /foodbox 실패:", err?.response || err);
        setErrorMsg("식품 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchFoodbox();
  }, []);

  return (
    <R.Container>
      <R.Header>
        <R.Title>나의 냉장고</R.Title>
        <R.Icons>
          <img
            id="scrap"
            src={`${process.env.PUBLIC_URL}/images/Plus_B.svg`}
            alt="plus"
            onClick={() => setShowPopup(!showPopup)}
          />
          {showPopup && (
            <R.Popup ref={popupRef}>
              <R.PopupItem onClick={goToReceipt}>
                영수증 인식
                <img
                  src={`${process.env.PUBLIC_URL}/images/receipt.svg`}
                  alt="receipt"
                />
              </R.PopupItem>
              <R.Hr />
              <R.PopupItem onClick={goToManual}>
                직접 입력
                <img
                  src={`${process.env.PUBLIC_URL}/images/write.svg`}
                  alt="edit"
                />
              </R.PopupItem>
            </R.Popup>
          )}
        </R.Icons>
      </R.Header>

      <R.Category>
        <div id="recipe" onClick={goExp}>
          유통기한 임박
        </div>
        <div id="purchase">식품 전체</div>
      </R.Category>

      <R.Body>
        <R.Date>{todayLabel || (loading ? "불러오는 중..." : "")}</R.Date>
        <R.Detail>
          <R.L>
            <div id="circle" />
            <div id="date">식품 전체</div>
          </R.L>
          <R.R onClick={goEdit}>수정</R.R>
        </R.Detail>

        {loading ? (
          <div style={{ padding: 16 }}>불러오는 중...</div>
        ) : errorMsg ? (
          <div style={{ padding: 16 }}>{errorMsg}</div>
        ) : groups.length === 0 ? (
          <R.EmptyWrapper>
            <img
              src={`${process.env.PUBLIC_URL}/images/null.png`}
              alt="no items"
            />
            <div>식품 목록을 추가해보세요</div>
          </R.EmptyWrapper>
        ) : (
          groups.map((g) => (
            <R.List key={g.key}>
              <R.CDate>{g.key}</R.CDate>
              {g.items.map((it, idx) => (
                <R.Component key={`${g.key}-${it.food_id ?? it.name}-${idx}`}>
                  <R.Content>
                    <R.Ing>{it.name}</R.Ing>
                    <R.Num>{it.quantity}개</R.Num>
                  </R.Content>
                </R.Component>
              ))}
            </R.List>
          ))
        )}
      </R.Body>

      <R.Nav>
        <R.NHome onClick={goHome}>
          <img src={`${process.env.PUBLIC_URL}/images/home_w.svg`} alt="home" />
          <div>홈</div>
        </R.NHome>
        <R.NRefri>
          <img
            src={`${process.env.PUBLIC_URL}/images/refrigerator_b.svg`}
            alt="refrigerator"
          />
          <div>냉장고</div>
        </R.NRefri>
        <R.NRecipe onClick={goRec}>
          <img
            src={`${process.env.PUBLIC_URL}/images/recipe_w.svg`}
            alt="recipe"
          />
          <div>레시피</div>
        </R.NRecipe>
        <R.NPur onClick={goPur}>
          <img
            src={`${process.env.PUBLIC_URL}/images/purchase_w.svg`}
            alt="purchase"
          />
          <div>공동구매</div>
        </R.NPur>
        <R.NMy onClick={goMy}>
          <img src={`${process.env.PUBLIC_URL}/images/my_w.svg`} alt="my" />
          <div>마이</div>
        </R.NMy>
      </R.Nav>
    </R.Container>
  );
};

export default RefEv;
