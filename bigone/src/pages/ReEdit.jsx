import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as R from "../styles/StyledRecipeW.jsx";
import Modal from "../pages/components/Modal.jsx";
import axios from "axios";

const ReEdit = () => {
  const navigate = useNavigate();

  const goRecipe = () => {
    navigate(`/recipe`);
  };

  const categoryLabels = {
    BEGINNER: "왕초보",
    MICROWAVE_AIRFRYER: "전자레인지•에어프라이어",
    DESSERT: "디저트",
    VEGAN: "비건",
  };
  const categoryMapping = {
    왕초보: "BEGINNER",
    "전자레인지•에어프라이어": "MICROWAVE_AIRFRYER",
    디저트: "DESSERT",
    비건: "VEGAN",
  };
  const categories = Object.values(categoryLabels);

  const [isOpen, setIsOpen] = useState(false);
  const modalOpen = () => setIsOpen(true);
  const modalClose = () => setIsOpen(false);
  const { user_id } = useParams();
  const token = localStorage.getItem("access_token");

  // 대표 이미지
  const mainPicRef = useRef(null);
  const [mainPic, setMainPic] = useState(null);

  const handleMainPicClick = () => {
    if (mainPicRef.current) mainPicRef.current.click();
  };
  const handleMainPicChange = (e) => {
    const file = e.target.files[0];
    if (file) setMainPic(file);
  };

  const getStepPicSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string") {
      // 서버 이미지 URL일 경우, 로컬 도메인 혹은 절대 경로가 필요하면 붙여서 사용
      return `http://43.203.179.188/uploads/r?key=${img}`;
    }
    if (img instanceof File || img instanceof Blob) {
      return URL.createObjectURL(img);
    }
    return "";
  };

  // 단계별 이미지 + 설명
  const stepPicRef = useRef([]);
  const [stepPic, setStepPic] = useState([""]);
  const [stepDescriptions, setStepDescriptions] = useState([""]);

  const handleStepPicClick = (index) => {
    if (stepPicRef.current[index]) stepPicRef.current[index].click();
  };

  const handleStepPicChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...stepPic];
      updated[index] = file;
      setStepPic(updated);
    }
  };

  const handleDeleteStep = (index) => {
    const newStepPics = [...stepPic];
    const newStepDescriptions = [...stepDescriptions];

    newStepPics.splice(index, 1);
    newStepDescriptions.splice(index, 1);

    setStepPic(newStepPics);
    setStepDescriptions(newStepDescriptions);
  };

  const handleStepDescriptionChange = (index, value) => {
    const updated = [...stepDescriptions];
    updated[index] = value;
    setStepDescriptions(updated);
  };

  // 입력 필드
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [detail, setDetail] = useState("");
  const [links, setLinks] = useState([""]);
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [isSelected, setIsSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://43.203.179.188/recipe/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        console.log("Fetched Data in JSON format:", JSON.stringify(data, null, 2)); // JSON 출력
        setMainPic(data.mainImageUrl);

        setTitle(data.title || "");
        setTime(data.cookingTime || "");
        setAmount("");
        setDetail(data.recipeDescription || "");
        if (data.recipeLinks && data.recipeLinks.length > 0) {
          setLinks(data.recipeLinks.map((link) => link.recipelinkUrl));
        } else {
          setLinks([""]);
        }

        if (data.ingredients && data.ingredients.length > 0) {
          setIngredients(
            data.ingredients.map((ing) => ({
              name: ing.ingredientName,
              amount: ing.ingredientAmount,
            }))
          );
        } else {
          setIngredients([{ name: "", amount: "" }]);
        }

        if (data.steps && data.steps.length > 0) {
          setStepPic(data.steps.map((s) => s.stepImageUrl || ""));
          setStepDescriptions(data.steps.map((s) => s.stepDescription || ""));
        } else {
          setStepPic([""]);
          setStepDescriptions([""]);
        }

        if (data.categories && data.categories.length > 0) {
          const mapped = data.categories.map((c) => categoryLabels[c] || c);
          setIsSelected(mapped);
        }
      } catch (error) {
        console.log("Error fetching recipe: ", error);
      }
    };

    fetchData();
  }, [user_id, token]);

  const isActive = title.length > 0 && amount.length > 0 && detail.length > 0 && time.length > 0 && links.every((link) => link.trim().length > 0);

  const handlCategoryClick = (category) => {
    setIsSelected((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
  };

  const onClickAddLinkBtn = () => {
    setLinks([...links, ""]);
  };

  const onClickAddingredientsBtn = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const onClickAddStep = () => {
    setStepPic([...stepPic, ""]);
    setStepDescriptions([...stepDescriptions, ""]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  // 이미지 업로드 함수 (공통)
  const uploadImage = async (file) => {
    if (!file) return null;
    const token = localStorage.getItem("access_token");

    const response = await axios.post(
      "http://43.203.179.188/uploads/recipe",
      [
        {
          filename: file.name,
          contentType: file.type,
        },
      ],
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { putUrl, key } = response.data[0];
    console.log(key);

    await axios.put(putUrl, file, {
      headers: { "Content-Type": "image/png" },
    });

    return key; // S3 key 반환
  };

  const handleSave = async () => {
    try {
      if (!mainPic) throw new Error("대표사진을 선택해주세요.");
      if (!title || !amount || !time || !detail || !links.every((link) => link.trim().length > 0)) {
        throw new Error("모든 필드를 올바르게 입력해주세요.");
      }

      // 대표 이미지 업로드
      const mainImageKey = typeof mainPic === "string" ? mainPic : await uploadImage(mainPic);

      // 단계별 이미지 업로드
      const uploadedStepKeys = [];
      for (let i = 0; i < stepPic.length; i++) {
        if (typeof stepPic[i] === "string") {
          uploadedStepKeys.push(stepPic[i]); // 기존 URL 그대로 사용
        } else {
          const key = await uploadImage(stepPic[i]);
          uploadedStepKeys.push(key || "");
        }
      }

      // 카테고리 변환
      const categoriesPayload = isSelected.map((cat) => categoryMapping[cat] || cat);
      const timeNumber = parseInt(time, 10);

      // payload 구성
      const payload = {
        title,
        cookingTime: timeNumber,
        mainImageUrl: mainImageKey,
        steps: stepDescriptions.map((desc, idx) => ({
          stepNumber: idx + 1,
          stepDescription: desc,
          stepImageUrl: uploadedStepKeys[idx] || "",
        })),
        recipeLinks: links.map((link) => ({ recipelinkUrl: link })),
        ingredients: ingredients.map((ing) => ({
          ingredientName: ing.name,
          ingredientAmount: ing.amount,
        })),
        categories: categoriesPayload,
        recipeDescription: detail,
      };

      console.log("PATCH payload:", payload);

      await axios.patch(`http://43.203.179.188/recipe/${user_id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      goRecipe();
    } catch (error) {
      alert(error.message || "업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <R.Container>
      <R.Header>
        <R.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={modalOpen} style={{ cursor: "pointer" }} />
          <R.Title>게시물 수정</R.Title>
        </R.Icons>
      </R.Header>

      <R.Content>
        {/* 대표사진 */}
        <R.InputWrapper>
          <R.InTitle>대표사진</R.InTitle>
          <R.InPic onClick={handleMainPicClick} style={{ cursor: "pointer" }}>
            {mainPic ? (
              <img
                src={
                  mainPic instanceof File
                    ? URL.createObjectURL(mainPic) // 사용자가 업로드한 파일 미리보기
                    : `http://43.203.179.188/uploads/r?key=${mainPic}` // 서버에서 가져온 기존 이미지
                }
                alt="Selected"
                style={{ width: 350, height: 350, objectFit: "cover", borderRadius: 5 }}
              />
            ) : (
              <>
                <img id="plus" src={`${process.env.PUBLIC_URL}/images/Plus.svg`} alt="plus" />
                <p>게시물의 대표 사진을 업로드해 주세요.</p>
              </>
            )}
          </R.InPic>
          <input type="file" accept="image/*" style={{ display: "none" }} ref={mainPicRef} onChange={handleMainPicChange} />
        </R.InputWrapper>

        {/* 제목 */}
        <R.InputWrapper>
          <R.InTitle>제목</R.InTitle>
          <R.Input value={title} onChange={(e) => setTitle(e.target.value)}></R.Input>
        </R.InputWrapper>

        {/* 양 & 시간 */}
        <R.TwinInputWrapper>
          <R.InputWrapper>
            <R.InTitle>양</R.InTitle>
            <R.Input value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: "170px" }} placeholder="0인분"></R.Input>
          </R.InputWrapper>
          <R.InputWrapper>
            <R.InTitle>소요시간</R.InTitle>
            <R.Input value={time} onChange={(e) => setTime(e.target.value)} style={{ width: "170px" }}></R.Input>
          </R.InputWrapper>
        </R.TwinInputWrapper>

        {/* 카테고리 */}
        <R.InputWrapper>
          <R.InTitle>카테고리 (선택)</R.InTitle>
          <R.CategoryWrapper>
            {categories.map((cat) => (
              <R.Category key={cat} $selected={isSelected.includes(cat)} onClick={() => handlCategoryClick(cat)}>
                {cat}
              </R.Category>
            ))}
          </R.CategoryWrapper>
        </R.InputWrapper>

        {/* 상세 설명 */}
        <R.InputWrapper>
          <R.InTitle>상세 설명</R.InTitle>
          <R.Textarea value={detail} onChange={(e) => setDetail(e.target.value)}></R.Textarea>
        </R.InputWrapper>

        {/* 링크 */}
        {links.map((linkValue, index) => (
          <R.LinkWrapper key={index}>
            {index === 0 && <R.InTitle>레시피 링크</R.InTitle>}
            <R.Input value={linkValue} onChange={(e) => handleLinkChange(index, e.target.value)} />
          </R.LinkWrapper>
        ))}
        <R.AddLinkBtn onClick={onClickAddLinkBtn}>
          <img id="plusLink" src={`${process.env.PUBLIC_URL}/images/Plus_b.svg`} alt="plus" />
          <div>링크 추가</div>
        </R.AddLinkBtn>

        {/* 재료 */}
        <R.InputWrapper>
          <R.InTitle>재료 정보</R.InTitle>
          {ingredients.map((ing, index) => (
            <R.TwinInputWrapper key={index}>
              <R.Input value={ing.name} onChange={(e) => handleIngredientChange(index, "name", e.target.value)} style={{ width: "170px" }} placeholder="재료명"></R.Input>
              <R.Input value={ing.amount} onChange={(e) => handleIngredientChange(index, "amount", e.target.value)} style={{ width: "170px" }} placeholder="수량(0개)"></R.Input>
            </R.TwinInputWrapper>
          ))}
        </R.InputWrapper>
        <R.AddLinkBtn onClick={onClickAddingredientsBtn}>
          <img id="plusLink" src={`${process.env.PUBLIC_URL}/images/Plus_b.svg`} alt="plus" />
          <div>재료 추가</div>
        </R.AddLinkBtn>

        {/* 단계 */}
        <R.InputWrapper>
          <R.InTitle>레시피 설명</R.InTitle>
          {stepPic.map((step, index) => (
            <R.StepWrapper key={index}>
              <R.InputStep onClick={() => handleDeleteStep(index)}>
                <img id="delete" src={`${process.env.PUBLIC_URL}/images/Delete.svg`} alt="delete" />
                <div id="step">STEP {index + 1}</div>
                <R.InPic
                  onClick={() => handleStepPicClick(index)}
                  style={{
                    cursor: "pointer",
                    width: "310px",
                    height: "310px",
                  }}
                >
                  {step ? (
                    <img key={index} src={getStepPicSrc(step)} alt={`step-${index}`} style={{ width: 310, height: 310, objectFit: "cover", borderRadius: 5 }} />
                  ) : (
                    <>
                      <img id="plus" src={`${process.env.PUBLIC_URL}/images/Plus.svg`} alt="plus" />
                      <p>해당 단계의 레시피 사진을 업로드해 주세요.</p>
                    </>
                  )}
                </R.InPic>
                <input type="file" accept="image/*" style={{ display: "none" }} ref={(el) => (stepPicRef.current[index] = el)} onChange={(e) => handleStepPicChange(index, e)} />
                <R.Explanation value={stepDescriptions[index]} onChange={(e) => handleStepDescriptionChange(index, e.target.value)} />
              </R.InputStep>
            </R.StepWrapper>
          ))}
        </R.InputWrapper>
        <R.AddLinkBtn onClick={onClickAddStep}>
          <img id="plusLink" src={`${process.env.PUBLIC_URL}/images/Plus_b.svg`} alt="plus" />
          <div>단계 추가</div>
        </R.AddLinkBtn>

        {/* 업로드 버튼 */}
        <R.UploadBtn
          style={{
            background: isActive ? "#FF4F26" : "#C4C4C4",
            cursor: isActive ? "pointer" : "default",
          }}
          onClick={isActive ? handleSave : undefined}
        >
          게시물 업로드
        </R.UploadBtn>
      </R.Content>

      <Modal
        title="게시물 수정을 그만둘까요?"
        content="게시물 수정 페이지를 벗어나면 수정된 내용은 저장되지 않고 사라집니다."
        isOpen={isOpen}
        onClose={modalClose}
        onConfirm={() => {
          modalClose();
          goRecipe();
        }}
      ></Modal>
    </R.Container>
  );
};

export default ReEdit;
