import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPur";
import axios from "axios";

const Purchase = () => {
  const navigate = useNavigate();

  const goWrite = () => {
    navigate(`/purchase/write`);
  };

  const goDetail = (id) => {
    navigate(`/purchase/detail/${id}`);
  };

  const goMy = () => {
    navigate(`/my`);
  };

  const goHome = () => {
    navigate(`/home`);
  };

  const goRec = () => {
    navigate(`/recipe`);
  };

  const goRef = () => {
    navigate(`/refrigerator`);
  };

  const [scrappedMap, setScrappedMap] = useState({});
  const token = localStorage.getItem("access_token");
  const [component, setComponent] = useState([]);
  const [total, setTotal] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [filteredComponents, setFilteredComponents] = useState([]);

  useEffect(() => {
    if (userInput.trim() === "") {
      setFilteredComponents(component);
    } else {
      const filtered = component.filter((item) => item.groupbuyTitle.toLowerCase().includes(userInput.toLowerCase()));
      setFilteredComponents(filtered);
    }
  }, [userInput, component]);

  const getSearchData = (e) => {
    setUserInput(e.target.value);
  };

  const fetchGroupBuys = async () => {
    try {
      const response = await axios.get("http://43.203.179.188/groupbuys", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setComponent(Array.isArray(data.groupbuys) ? data.groupbuys : []);
      setTotal(typeof data.totalCount === "number" ? data.totalCount : 0);
    } catch (error) {
      console.log(error.response?.data?.message);
      setComponent([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    fetchGroupBuys();
  }, []);

  const handleScrapClick = async (postId) => {
    try {
      await axios.post(`http://43.203.179.188/groupbuy/${postId}/scrap`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 성공 시 상태 토글
      setScrappedMap((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
    } catch (error) {
      console.error("스크랩 처리 실패:", error);
    }
  };

  const renderDateOrRelative = (dateString) => {
    return dateString || "";
  };

  return (
    <P.Container>
      <P.Header>
        <P.Title>공동구매</P.Title>
        <P.Icons>
          <img id="scrap" src={`${process.env.PUBLIC_URL}/images/star_w.svg`} alt="star" />
          <img id="write" src={`${process.env.PUBLIC_URL}/images/pencil_w.svg`} alt="pencil" onClick={goWrite} />
        </P.Icons>
      </P.Header>

      <P.Content>
        <P.Search>
          <img src={`${process.env.PUBLIC_URL}/images/search.svg`} alt="search" />
          <input type="text" placeholder="냉장고 속 재료를 검색해보세요." onChange={getSearchData} />
        </P.Search>
        <P.Bar>
          <P.Post>
            <div id="bold">게시물</div>
            <div id="num">{total}</div>
            <div id="gun">건</div>
          </P.Post>
          <P.Recent>
            <div id="dot"></div>
            최신순
          </P.Recent>
        </P.Bar>

        <P.Body>
          {(filteredComponents || []).map((item) => {
            const scrapped = scrappedMap[item.groupbuyId] || false;
            const isRecruiting = item.status === "RECRUITING";
            const status = isRecruiting ? "모집중" : "모집완료";
            const statusStyle = {
              color: isRecruiting ? "#FF4F26" : "#FFF",
              backgroundColor: isRecruiting ? "rgba(255, 79, 38, 0.10)" : "#C4C4C4",
            };

            return (
              <P.Component key={item.groupbuyId}>
                <P.Img>
                  <img src={`http://43.203.179.188/uploads/r?key=${item.mainImageUrl}`} alt="image" />
                </P.Img>
                <P.ImformBox>
                  <P.CTitle>
                    <div id="title" onClick={() => goDetail(item.groupbuyId)}>
                      {item.groupbuyTitle.length > 22 ? item.groupbuyTitle.slice(0, 22) + "..." : item.groupbuyTitle}
                    </div>
                    <img id="scrap" src={`${process.env.PUBLIC_URL}/images/${scrapped ? "star_y" : "star_w"}.svg`} alt="scrap" onClick={() => handleScrapClick(item.groupbuyId)} />
                  </P.CTitle>
                  <P.Detail>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`} alt="comment" />
                      <div id="comment-num">{item.commentCount}</div>
                      <img id="line" src={`${process.env.PUBLIC_URL}/images/Line.png`} alt="line" />
                      <P.D_State style={statusStyle}>{status}</P.D_State>
                    </div>
                    <P.D_Date>{renderDateOrRelative(item.createDate)}</P.D_Date>
                  </P.Detail>
                </P.ImformBox>
              </P.Component>
            );
          })}
        </P.Body>
      </P.Content>

      <P.Nav>
        <P.NHome onClick={goHome}>
          <img src={`${process.env.PUBLIC_URL}/images/home_w.svg`} alt="home" />
          <div>홈</div>
        </P.NHome>
        <P.NRefri onClick={goRef}>
          <img src={`${process.env.PUBLIC_URL}/images/refrigerator_w.svg`} alt="refrigerator" />
          <div>냉장고</div>
        </P.NRefri>
        <P.NRecipe onClick={goRec}>
          <img src={`${process.env.PUBLIC_URL}/images/recipe_w.svg`} alt="recipe" />
          <div>레시피</div>
        </P.NRecipe>
        <P.NPur>
          <img src={`${process.env.PUBLIC_URL}/images/purchase_b.svg`} alt="purchase" />
          <div>공동구매</div>
        </P.NPur>
        <P.NMy onClick={goMy}>
          <img src={`${process.env.PUBLIC_URL}/images/my_w.svg`} alt="my" />
          <div>마이</div>
        </P.NMy>
      </P.Nav>
    </P.Container>
  );
};

export default Purchase;
