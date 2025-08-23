import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as R from "../styles/StyledRecipeD";
import BottomSheet from "../pages/components/BottomSheet";
import axios from "axios";

const R_Detail = () => {
  const navigate = useNavigate();
  const goRec = () => {
    navigate(`/recipe`);
  };
  const goEdit = (id) => {
    navigate(`/recipe/edit/${id}`);
  };

  const categoryLabels = {
    BEGINNER: "왕초보",
    MICROWAVE_AIRFRYER: "전자레인지•에어프라이어",
    DESSERT: "디저트",
    VEGAN: "비건",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [component, setComponent] = useState({});
  const [comment, setComment] = useState([]);
  const [step, setStep] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("access_token");
  const lastStepNumber = step.length > 0 ? step[step.length - 1].stepNumber : 0;
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const [isHeart, setIsHeart] = useState(false);
  const handleHeart = async () => {
    try {
      const response = await axios.post(
        `http://43.203.179.188/recipe/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsHeart((prev) => !prev);
    } catch (error) {
      console.error("좋아요 요청 에러:", error.response ? error.response.data : error.message);
    }
  };

  const [isScrapped, setIsScrapped] = useState(false);
  const handleScrapClick = async () => {
    try {
      const response = await axios.post(
        `http://43.203.179.188/recipe/${id}/scrap`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsScrapped((prev) => !prev);
    } catch (error) {
      console.error("스크랩 요청 에러:", error.response ? error.response.data : error.message);
    }
  };

  const [isSelected, setIsSelected] = useState("ingredients");
  const handleSelectClick = (type) => {
    setIsSelected(type);
  };

  useEffect(() => {
    console.log("Steps data", step);
  }, [step]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://43.203.179.188/recipe/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setComponent(data);
        setComment(data.comments);
        setIngredients(data.ingredients);
        setStep(data.steps);
      } catch (error) {
        console.log("Error fetching recipe: ", error);
      }
    };

    const fetchScrap = async () => {
      try {
        const res = await axios.get("http://43.203.179.188/mypage/recipe-scrap", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const scrapList = res.data;
        const scrapped = scrapList.some((item) => item.postId === Number(id));
        setIsScrapped(scrapped);
      } catch (error) {
        console.log("스크랩 목록 불러오기 에러:", error);
      }
    };

    fetchData();
    fetchScrap();
  }, [id, token]);

  const handleShareClick = () => {
    const shareUrl = window.location.href; // 현재 페이지 URL 복사 예시
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch(() => {
        alert("복사에 실패했습니다.");
      });
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://43.203.179.188/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("삭제되었습니다.");
      goRec();
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const myId = localStorage.getItem("user_id");
  const isMine = myId === String(component.authorUsername);
  console.log(component.authorUsername);

  return (
    <R.Container>
      <R.Header>
        <R.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={goRec} />
          <R.Title>레시피 상세</R.Title>
        </R.Icons>
        <R.Icons>
          <img id="share" src={`${process.env.PUBLIC_URL}/images/Share.svg`} alt="share" onClick={handleShareClick} />
          {isMine && <img id="share" src={`${process.env.PUBLIC_URL}/images/Fix.svg`} alt="share" onClick={() => setShowPopup(!showPopup)} />}
        </R.Icons>
        {showPopup && (
          <R.Popup ref={popupRef}>
            <R.PopupItem onClick={() => goEdit(id)}>
              수정
              <img src={`${process.env.PUBLIC_URL}/images/write.svg`} alt="edit" />
            </R.PopupItem>
            <R.Hr />
            <R.PopupItem onClick={handleDeleteClick}>
              삭제
              <img src={`${process.env.PUBLIC_URL}/images/Trash_c.svg`} alt="edit" />
            </R.PopupItem>
          </R.Popup>
        )}
      </R.Header>
      <R.Content>
        <R.Pic>
          <img src={`http://43.203.179.188/uploads/r?key=${component.mainImageUrl}`} alt="임시" />
        </R.Pic>
        <R.Wrapper>
          <R.D_Title>{component.title}</R.D_Title>
          <img id="star" src={`${process.env.PUBLIC_URL}/images/${isScrapped ? "star_y.svg" : "star_w.svg"}`} alt="star" onClick={handleScrapClick} />
        </R.Wrapper>
        <R.Wrapper style={{ justifyContent: "start", gap: "7px" }}>
          <R.D_Inform_gray>양</R.D_Inform_gray>
          <R.D_Inform_black>1인분</R.D_Inform_black>
          <R.D_Inform_gray>소요시간</R.D_Inform_gray>
          <R.D_Inform_black>{component.cookingTime}</R.D_Inform_black>
        </R.Wrapper>
        <R.Wrapper style={{ justifyContent: "start", gap: "7px" }}>
          {component.categories && component.categories.map((category) => (categoryLabels[category] ? <R.D_State key={category}>{categoryLabels[category]}</R.D_State> : null))}
        </R.Wrapper>

        <R.Wrapper style={{ marginTop: "30px", marginBottom: "20px" }}>
          <R.Profile>
            <img id="circle" src={`${process.env.PUBLIC_URL}/images/Circle.svg`} alt="circle" />
            <img id="cat" src={`${process.env.PUBLIC_URL}/images/Profile.png`} alt="cat" />
            <div id="profile_inform">
              <div id="username">{component.authorName}</div>
              <div style={{ display: "flex", flexDirection: "row", gap: "7px", marginLeft: "10px" }}>
                <R.D_Inform_gray>게시물</R.D_Inform_gray>
                <R.D_Inform_black>{component.authorPostCount}개</R.D_Inform_black>
              </div>
            </div>
          </R.Profile>
          <R.PostDate>{component.createdAt}</R.PostDate>
        </R.Wrapper>
        <R.Post>{component.recipeDescription}</R.Post>
        <R.PostURL>
          <p>레시피 링크</p>
          {Array.isArray(component.recipeLinks) && component.recipeLinks.length > 0 ? (
            component.recipeLinks.map((link) => (
              <p key={link.recipelinkId}>
                <a href={link.recipelinkUrl} target="_blank" rel="noopener noreferrer">
                  {link.recipelinkUrl}
                </a>
              </p>
            ))
          ) : (
            <p></p>
          )}
        </R.PostURL>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <R.Heart>
            <img id="heart" src={`${process.env.PUBLIC_URL}/images/${isHeart ? "heart_b.png" : "heart_w.svg"}`} alt="heart" onClick={handleHeart} />
            <div id="heart_cnt">{component.likeCount}</div>
          </R.Heart>
          <R.Comment onClick={() => setIsOpen(true)}>
            <img id="comment" src={`${process.env.PUBLIC_URL}/images/comment_w.svg`} alt="comment" />
            <div id="comment_cnt">{component.commentCount}</div>
          </R.Comment>
        </div>
      </R.Content>
      <R.ContentBar>
        <R.Tap id="ingredients" $selected={isSelected === "ingredients"} onClick={() => handleSelectClick("ingredients")}>
          재료
        </R.Tap>
        <R.Tap id="recipe" $selected={isSelected === "recipe"} onClick={() => handleSelectClick("recipe")}>
          레시피
        </R.Tap>
      </R.ContentBar>

      {isSelected === "ingredients" && (
        <R.Ingredients>
          {ingredients.map((ingredient) => (
            <div id="wrapper" key={ingredient.ingredientId}>
              <span id="title">{ingredient.ingredientName}</span>
              <img id="line" src={`${process.env.PUBLIC_URL}/images/Line_in.png`} alt="line" />
              <span id="count">{ingredient.ingredientAmount}</span>
            </div>
          ))}
        </R.Ingredients>
      )}

      {isSelected === "recipe" && (
        <R.Recipe>
          <div id="count">총 {lastStepNumber}단계</div>
          {step?.map((step) => (
            <R.RecipeStep key={step.stepId}>
              <R.PicStep>
                <img src={step.stepImageUrl ? `http://43.203.179.188/uploads/r?key=${step.stepImageUrl}` : "/images/scrap.svg"} alt="임시" />
              </R.PicStep>
              <div id="step">STEP {step.stepNumber}</div>
              <div id="explanation">{step.stepDescription}</div>
            </R.RecipeStep>
          ))}
        </R.Recipe>
      )}
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} comments={comment} type="recipe" targetId={id}></BottomSheet>
    </R.Container>
  );
};

export default R_Detail;
