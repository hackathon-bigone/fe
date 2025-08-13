import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "../styles/StyledRecipeW.jsx";
import Modal from "../pages/components/Modal.jsx";

const ReWrite = () => {
  const navigate = useNavigate();

  const goRecipe = () => {
    navigate(`/recipe`);
  };

  const [isOpen, setIsOpen] = useState(false);
  const modalOpen = () => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };

  const mainPicRef = useRef(null);
  const [mainPic, setMainPic] = useState(null);

  const handleMainPicClick = () => {
    if (mainPicRef.current) mainPicRef.current.click();
  };

  const handleMainPicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainPic(file);
    }
  };

  const stepPicRef = useRef([]);
  const [stepPic, setStepPic] = useState([""]);

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

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [detail, setDetail] = useState("");
  const [links, setLinks] = useState([""]);

  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const categories = ["왕초보", "전자레인지•에이프라이어", "디저트", "비건"];
  const [isSelected, setIsSelected] = useState([]);
  // 모든 링크가 채워져야 동작
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
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  return (
    <R.Container>
      <R.Header>
        <R.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" onClick={modalOpen} style={{ cursor: "pointer" }} />
          <R.Title>레시피 글쓰기</R.Title>
        </R.Icons>
      </R.Header>

      <R.Content>
        <R.InputWrapper>
          <R.InTitle>대표사진</R.InTitle>
          <R.InPic onClick={handleMainPicClick} style={{ cursor: "pointer" }}>
            {mainPic ? (
              <img
                src={URL.createObjectURL(mainPic)}
                alt="Selected"
                style={{
                  width: 350,
                  height: 350,
                  objectFit: "cover",
                  borderRadius: 5,
                }}
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

        <R.InputWrapper>
          <R.InTitle>제목</R.InTitle>
          <R.Input value={title} onChange={(e) => setTitle(e.target.value)}></R.Input>
        </R.InputWrapper>

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

        <R.InputWrapper>
          <R.InTitle>상세 설명</R.InTitle>
          <R.Textarea value={detail} onChange={(e) => setDetail(e.target.value)}></R.Textarea>
        </R.InputWrapper>

        {links.map((linkValue, index) => (
          <R.LinkWrapper key={index}>
            {index === 0 && <R.InTitle>레시피 링크</R.InTitle>}
            <R.Input
              value={linkValue}
              onChange={(e) => {
                const newLinks = [...links];
                newLinks[index] = e.target.value;
                setLinks(newLinks);
              }}
            />
          </R.LinkWrapper>
        ))}

        <R.AddLinkBtn onClick={onClickAddLinkBtn}>
          <img id="plusLink" src={`${process.env.PUBLIC_URL}/images/Plus_b.svg`} alt="plus" />
          <div>링크 추가</div>
        </R.AddLinkBtn>

        <R.InputWrapper>
          <R.InTitle>재료 정보</R.InTitle>
          {ingredients.map((ingredients, index) => (
            <R.TwinInputWrapper>
              <R.Input value={ingredients.name} onChange={(e) => handleIngredientChange(index, "name", e.target.value)} style={{ width: "170px" }} placeholder="재료명"></R.Input>
              <R.Input value={ingredients.amount} onChange={(e) => handleIngredientChange(index, "amount", e.target.value)} style={{ width: "170px" }} placeholder="수량(0개)"></R.Input>
            </R.TwinInputWrapper>
          ))}
        </R.InputWrapper>

        <R.AddLinkBtn onClick={onClickAddingredientsBtn}>
          <img id="plusLink" src={`${process.env.PUBLIC_URL}/images/Plus_b.svg`} alt="plus" />
          <div>재료 추가</div>
        </R.AddLinkBtn>

        <R.InputWrapper>
          <R.InTitle>레시피 설명</R.InTitle>

          {stepPic.map((stepPic, index) => (
            <R.StepWrapper>
              <R.InputStep key={index}>
                <img id="delete" src={`${process.env.PUBLIC_URL}/images/Delete.svg`} alt="delete" />
                <div id="step">STEP {index + 1}</div>
                <R.InPic onClick={() => handleStepPicClick(index)} style={{ cursor: "pointer", width: "310px", height: "310px" }}>
                  {stepPic ? (
                    <img src={URL.createObjectURL(stepPic)} alt={`step-${index}`} style={{ width: 310, height: 310, objectFit: "cover", borderRadius: 5 }} />
                  ) : (
                    <>
                      <img id="plus" src={`${process.env.PUBLIC_URL}/images/Plus.svg`} alt="plus" />
                      <p>해당 단계의 레시피 사진을 업로드해 주세요.</p>
                    </>
                  )}
                </R.InPic>
                <input type="file" accept="image/*" style={{ display: "none" }} ref={(el) => (stepPicRef.current[index] = el)} onChange={(e) => handleStepPicChange(index, e)} />
                <R.Explanation />
              </R.InputStep>
            </R.StepWrapper>
          ))}
        </R.InputWrapper>

        <R.AddLinkBtn onClick={onClickAddStep}>
          <img id="plusLink" src={`${process.env.PUBLIC_URL}/images/Plus_b.svg`} alt="plus" />
          <div>단계 추가</div>
        </R.AddLinkBtn>

        <R.UploadBtn
          style={{
            background: isActive ? "#FF4F26" : "#C4C4C4",
            cursor: isActive ? "pointer" : "default",
          }}
        >
          게시물 업로드
        </R.UploadBtn>
      </R.Content>

      <Modal
        title="게시물 작성을 그만둘까요?"
        content="게시물 작성 페이지를 벗어나면 작성된 내용은 저장되지 않고 사라집니다."
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

export default ReWrite;
