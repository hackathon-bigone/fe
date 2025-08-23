import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledScPur";
import axios from "axios";

const API_BASE = "http://43.203.179.188/";

const buildImageUrl = (val) => {
  if (!val) return `${API_BASE}uploads/r?key=__none__`;
  if (/^https?:\/\//i.test(val)) return val;
  if (val.startsWith("/uploads/"))
    return `${API_BASE}${val.replace(/^\//, "")}`;
  if (val.startsWith("uploads/")) return `${API_BASE}${val}`;
  return `${API_BASE}uploads/r?key=${encodeURIComponent(val)}`;
};

// "RECRUITING" → "모집중", 그 외 → "모집완료"
const translateStatus = (status) =>
  status === "RECRUITING" ? "모집중" : "모집완료";

const ScrapPur = () => {
  const recruitingPillStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "25px",
    borderRadius: "5px",
    padding: "0 8px",
    background: "rgba(255, 79, 38, 0.10)",
    color: "#FF4F26",
    fontWeight: 400,
    fontSize: "15px",
    fontFamily: "Pretendard",
  };

  const completedPillStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60px", // ✅ 문자열로
    height: "25px", // ✅ 문자열로
    flexShrink: 0,
    borderRadius: "5px",
    background: "#C4C4C4",
    color: "#FFF",
    fontWeight: 400,
    fontSize: "15px",
    fontFamily: "Pretendard",
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my`);
  };

  const goRec = () => {
    navigate(`/my/scrap`);
  };
  const goDetail = (id) => navigate(`/purchase/detail/${id}`);
  const token = localStorage.getItem("access_token");
  const [groupbuys, setGroupbuys] = useState([]);
  const [pending, setPending] = useState({}); // 스크랩 토글 중복 방지
  const [scrappedMap, setScrappedMap] = useState({}); // 항목별 별 표시(선택)

  // ✅ "RECRUITING" → "모집중", "COMPLETED" → "모집완료"
  const translateStatus = (status) => {
    return status === "RECRUITING" ? "모집중" : "모집완료";
  };

  // ✅ "몇 분 전" 표시 함수
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}시간 전`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일 전`;
  };

  const handleUnscrap = async (e, groupbuyId) => {
    e.stopPropagation(); // 카드 클릭으로 상세 이동 방지
    if (!token) return alert("로그인이 필요합니다.");
    if (pending[groupbuyId]) return; // 중복 클릭 방지

    setPending((p) => ({ ...p, [groupbuyId]: true }));
    try {
      await axios.post(`${API_BASE}groupbuy/${groupbuyId}/scrap`, null, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });
      // ✅ 성공: 목록에서 제거
      setGroupbuys((prev) => prev.filter((g) => g.groupbuyId !== groupbuyId));
      setScrappedMap((m) => {
        const { [groupbuyId]: _, ...rest } = m;
        return rest;
      });
    } catch (err) {
      console.error("스크랩 해제 실패:", err);
      alert("스크랩 해제에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setPending((p) => ({ ...p, [groupbuyId]: false }));
    }
  };

  // ✅ 스크랩 목록 불러오기 (/mypage/groupbuy-scrap)
  useEffect(() => {
    const fetchScraps = async () => {
      try {
        const res = await axios.get(`${API_BASE}mypage/groupbuy-scrap`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 응답이 배열이거나 { groupbuys: [...] }일 수 있으니 방어적으로 파싱
        // 목록 가져온 뒤
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.groupbuys)
          ? res.data.groupbuys
          : [];

        setGroupbuys(list);

        // ✅ 기본값: 모두 스크랩된 상태
        const init = {};
        list.forEach((g) => (init[g.groupbuyId] = true));
        setScrappedMap(init);

        console.log("✅ 공동구매 스크랩 목록:", list);
      } catch (err) {
        console.error("❌ 공동구매 스크랩 목록 조회 실패:", err);
        setGroupbuys([]);
      }
    };

    if (token) fetchScraps();
    else setGroupbuys([]);
  }, [token]);

  // (선택) 스크랩 토글: /groupbuy/{id}/scrap → 해제 시 목록에서 제거
  const handleScrapToggle = async (e, groupbuyId) => {
    e.stopPropagation();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (pending[groupbuyId]) return;

    setPending((p) => ({ ...p, [groupbuyId]: true }));
    setScrappedMap((m) => ({ ...m, [groupbuyId]: !m[groupbuyId] }));

    try {
      await axios.post(`${API_BASE}groupbuy/${groupbuyId}/scrap`, null, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });
      // 해제됐다면 목록에서 제거
      setGroupbuys((prev) => prev.filter((g) => g.groupbuyId !== groupbuyId));
    } catch (err) {
      console.error("스크랩 토글 실패:", err);
      // 롤백
      setScrappedMap((m) => ({ ...m, [groupbuyId]: !m[groupbuyId] }));
    } finally {
      setPending((p) => ({ ...p, [groupbuyId]: false }));
    }
  };

  return (
    <P.Container>
      <P.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <P.Title>스크랩</P.Title>
      </P.Header>
      <P.Category>
        <div id="recipe" onClick={goRec}>
          레시피
        </div>
        <div id="purchase">공동구매</div>
      </P.Category>
      <P.Body>
        {groupbuys.length === 0 ? (
          <P.EmptyWrapper>
            <img
              src={`${process.env.PUBLIC_URL}/images/null.png`}
              alt="no posts"
            />
            <div>스크랩한 공동구매가 없습니다.</div>
          </P.EmptyWrapper>
        ) : (
          groupbuys.map((item) => (
            <P.Component
              key={item.groupbuyId}
              onClick={() => goDetail(item.groupbuyId)}
            >
              <P.Image>
                <img src={buildImageUrl(item.mainImageUrl)} alt="represent" />
              </P.Image>

              <P.Detail>
                <P.Up>
                  <P.CTitle>
                    {item.groupbuyTitle?.length > 23
                      ? item.groupbuyTitle.slice(0, 23) + "..."
                      : item.groupbuyTitle}
                  </P.CTitle>

                  {/* (선택) 별 아이콘으로 스크랩 해제 지원 */}
                  <img
                    src={`${process.env.PUBLIC_URL}/images/star_y.svg`} // ✅ 기본 채워진 별
                    alt="스크랩 해제"
                    onClick={(e) => handleUnscrap(e, item.groupbuyId)}
                    aria-label="스크랩 해제"
                  />
                </P.Up>

                <P.Down>
                  <P.Icons>
                    <img
                      id="comment"
                      src={`${process.env.PUBLIC_URL}/images/comment_w.svg`}
                      alt="comment"
                    />
                    <div id="cnum">{item.commentCount}</div>
                    <div id="hr" />
                    <div
                      style={
                        item.status === "RECRUITING"
                          ? recruitingPillStyle
                          : completedPillStyle
                      }
                    >
                      {translateStatus(item.status)}
                    </div>
                  </P.Icons>

                  {/* 서버가 'n분 전' 형태를 주면 그대로 표시 */}
                  <P.Date>{item.createDate}</P.Date>
                </P.Down>
              </P.Detail>
            </P.Component>
          ))
        )}
      </P.Body>
    </P.Container>
  );
};

export default ScrapPur;
