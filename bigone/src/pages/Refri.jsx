import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledRefri";
import axios from "axios";

const Refri = () => {
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

  const goEver = () => {
    navigate(`/refrigerator/ingredients`);
  };

  const [today, setToday] = useState("");
  const [groups, setGroups] = useState([]); // [{ dlabel: 'D+3', items: [...] }, ...]
  const [loading, setLoading] = useState(true);
  const [emptyMsg, setEmptyMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ⬇️ 추가: 'YY.MM.DD' -> Date
  const parseYYMMDD = (s) => {
    const m = /^(\d{2})\.(\d{2})\.(\d{2})$/.exec(s || "");
    if (!m) return null;
    return new Date(2000 + +m[1], +m[2] - 1, +m[3]);
  };

  // ⬇️ 보조: dlabel을 일수로 환산(D+3 -> -3, D-0 -> 0, D-7 -> 7) — 날짜가 없을 때 tie-break 용
  const dlabelToDelta = (s) => {
    const m = /^D([+-])(\d+)$/.exec(s || "");
    if (!m) return Number.POSITIVE_INFINITY;
    const n = Number(m[2]);
    return m[1] === "+" ? -n : n;
  };

  useEffect(() => {
    const fetchImminent = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setErrorMsg("로그인이 필요합니다.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          "http://43.203.179.188/foodbox?filter=imminent",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data || {};
        setToday(data.today || "");

        const items = Array.isArray(data.items) ? data.items : [];

        if (items.length === 0) {
          setEmptyMsg(data.message || "유통기한 임박 목록이 없어요");
          setGroups([]);
          return;
        }

        // 1) dlabel별 그룹화
        const map = new Map();
        items.forEach((it) => {
          const key = it.dlabel || "-";
          if (!map.has(key)) map.set(key, []);
          map.get(key).push(it);
        });

        // 2) 각 그룹 내부 정렬(유통기한 → 이름) + 그룹 대표 날짜(가장 이른 날짜) 계산
        const groupsArr = Array.from(map.entries()).map(([dlabel, arr]) => {
          const sortedItems = [...arr].sort((a, b) => {
            const da = parseYYMMDD(a.expiryDate);
            const db = parseYYMMDD(b.expiryDate);
            if (da && db && da.getTime() !== db.getTime()) return da - db; // 빠른 날짜 우선
            if (da && !db) return -1;
            if (!da && db) return 1;
            return (a.name || "").localeCompare(b.name || "");
          });

          const groupDate = sortedItems.reduce((min, cur) => {
            const d = parseYYMMDD(cur.expiryDate);
            if (!d) return min;
            return !min || d < min ? d : min;
          }, null);

          return {
            dlabel,
            items: sortedItems,
            groupDate,
            delta: dlabelToDelta(dlabel),
          };
        });

        // 3) 그룹 정렬: 대표 expiryDate 오름차순(가장 임박/지남 ↑) → 날짜 없으면 dlabel로 tie-break
        groupsArr.sort((a, b) => {
          if (a.groupDate && b.groupDate) return a.groupDate - b.groupDate;
          if (a.groupDate && !b.groupDate) return -1;
          if (!a.groupDate && b.groupDate) return 1;
          return a.delta - b.delta;
        });

        setGroups(groupsArr);
        setEmptyMsg("");
      } catch (err) {
        console.error(
          "❌ /foodbox?filter=imminent 실패:",
          err?.response || err
        );
        setErrorMsg("유통기한 임박 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchImminent();
  }, []);

  return (
    <R.Container>
      <R.Header>
        <R.Title>나의 냉장고</R.Title>
        <R.Icons>
          <img
            id="scrap"
            src={`${process.env.PUBLIC_URL}/images/Plus_B.svg`}
            alt="scrap"
          />
        </R.Icons>
      </R.Header>

      <R.Category>
        <div id="recipe">유통기한 임박</div>
        <div id="purchase" onClick={goEver}>
          식품 전체
        </div>
      </R.Category>

      <R.Body>
        <R.Date>{today || (loading ? "불러오는 중..." : "")}</R.Date>
        <R.Detail>
          <div id="circle" />
          <div id="date">유통기한 임박</div>
        </R.Detail>

        {loading ? (
          <div style={{ padding: 16 }}>불러오는 중...</div>
        ) : errorMsg ? (
          <div style={{ padding: 16 }}>{errorMsg}</div>
        ) : groups.length === 0 ? (
          <div style={{ padding: 16 }}>{emptyMsg}</div>
        ) : (
          <R.List>
            {groups.map((g) => (
              <R.Component key={g.dlabel}>
                {/* 왼쪽 큰 라벨: D+3 / D-1 등 */}
                <R.Left>{g.dlabel}</R.Left>

                {/* 오른쪽: 같은 dlabel의 아이템들 나열 */}
                <div style={{ flex: 1 }}>
                  {g.items.map((it, idx) => (
                    <div
                      key={`${g.dlabel}-${it.food_id ?? it.name}-${idx}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: idx === 0 ? "0 0 0 0" : "12px 0 0 0",
                      }}
                    >
                      <R.Name>
                        <div id="ingre">{it.name}</div>
                        <div id="date">{it.expiryDate ?? "-"}</div>
                      </R.Name>
                      <R.Num>
                        {typeof it.quantity === "number"
                          ? `${it.quantity}개`
                          : "-"}
                      </R.Num>
                    </div>
                  ))}
                </div>
              </R.Component>
            ))}
          </R.List>
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

export default Refri;
