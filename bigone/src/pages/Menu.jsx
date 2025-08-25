import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as M from "../styles/StyledMenu";

const MENUS = [
  {
    key: "my",
    label: "마이",
    icon: { active: "my.svg", inactive: "my_w.svg" },
    details: [
      { label: "프로필 수정", path: "/my/edit" },
      { label: "작성한 게시물", path: "/my/wrote/recipe" },
      { label: "댓글 단 게시물", path: "/my/comment" },
      { label: "스크랩", path: "/my/scrap" },
      { label: "Q&A", path: "/my/question" },
      { label: "신고", path: "/my/report" },
      { label: "로그아웃", path: "/my" },
    ],
  },
  {
    key: "ref",
    label: "냉장고",
    icon: { active: "refrigerator.svg", inactive: "refrigerator_w.svg" },
    details: [
      { label: "유통기한 임박", path: "/refrigerator" },
      { label: "식품 전체", path: "/refrigerator/ingredients" },
      { label: "식품 목록 수정", path: "/refrigerator/ingredients/edit" },
    ],
  },
  {
    key: "rec",
    label: "레시피",
    icon: { active: "recipe.svg", inactive: "recipe_w.svg" },
    details: [
      { label: "게시물 목록", path: "/recipe" },
      { label: "스크랩", path: "/my/scrap" },
      { label: "게시물 작성", path: "/recipe/write" },
    ],
  },
  {
    key: "pur",
    label: "공동구매",
    icon: { active: "purchase.svg", inactive: "purchase_w.svg" },
    details: [
      { label: "게시물 목록", path: "/purchase" },
      { label: "스크랩", path: "/my/scrap/purchase" },
      { label: "게시물 작성", path: "/purchase/write" },
    ],
  },
];

const Menu = () => {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0); // 0: 마이
  const [highlightTop, setHighlightTop] = useState(0);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  const goBack = () => {
    navigate(`/`);
  };

  // 클릭 시: 활성 탭 변경 + 하이라이트 이동
  const handleSelect = (idx) => {
    setActiveIdx(idx);
    const el = itemRefs.current[idx];
    if (el && listRef.current) {
      setHighlightTop(el.offsetTop); // 메뉴 컨테이너 기준 top
    }
  };

  // 처음 렌더 + 리사이즈 때 위치 재계산
  useEffect(() => {
    const recalc = () => {
      const el = itemRefs.current[activeIdx];
      if (el && listRef.current) setHighlightTop(el.offsetTop);
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [activeIdx]);

  const activeMenu = MENUS[activeIdx];

  return (
    <M.Container>
      <M.Header>
        <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={goBack} />
        <div>전체 메뉴</div>
      </M.Header>
      <M.Body>
        {/* 왼쪽 컬럼 */}
        <M.Menu>
          <M.Items ref={listRef}>
            {MENUS.map((m, idx) => {
              const active = idx === activeIdx;
              const icon = active ? m.icon.active : m.icon.inactive;
              return (
                <M.Item key={m.key} ref={(el) => (itemRefs.current[idx] = el)} onClick={() => handleSelect(idx)} $active={active}>
                  <img src={`${process.env.PUBLIC_URL}/images/${icon}`} alt={m.label} />
                  <div>{m.label}</div>
                </M.Item>
              );
            })}
            {/* ✅ Item들 '밑'에 위치 */}
            <M.Highlight style={{ top: highlightTop }} />
          </M.Items>
        </M.Menu>

        {/* 오른쪽 디테일 */}
        <M.Detail>
          <M.Details>
            {activeMenu.details.map((d) => (
              <M.DetailRow key={d.label} onClick={() => navigate(d.path)}>
                {d.label}
              </M.DetailRow>
            ))}
          </M.Details>
        </M.Detail>
      </M.Body>
    </M.Container>
  );
};

export default Menu;
