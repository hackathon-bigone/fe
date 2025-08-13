import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as E from "../styles/StyledRefW";

const RefWrite = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
  const [inputs, setInputs] = useState([{ name: "", quantity: "", date: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { name: "", quantity: "", date: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };
  // 첫 번째 줄이 모두 채워졌는지 확인
  const isFirstRowFilled =
    inputs[0].name.trim() !== "" &&
    inputs[0].quantity.trim() !== "" &&
    inputs[0].date.trim() !== "";

  return (
    <E.Container>
      <E.Header>
        <img
          src={`${process.env.PUBLIC_URL}/images/back.svg`}
          alt="back"
          onClick={goBack}
        />
        <div>직접 입력</div>
      </E.Header>
      <E.Body>
        <E.Title>식품 추가</E.Title>
        <E.Detail>
          <div id="name">식품명</div>
          <div id="num">수량</div>
          <div id="date">유통기한</div>
        </E.Detail>
        <E.List>
          {inputs.map((item, index) => {
            const hasInput =
              item.name.trim() !== "" ||
              item.quantity.trim() !== "" ||
              item.date.trim() !== "";

            return (
              <E.Input key={index}>
                <E.Name>
                  <input
                    type="text"
                    placeholder="식품명"
                    value={item.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </E.Name>

                <E.Num>
                  <input
                    type="text"
                    placeholder="O개"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                  />
                </E.Num>

                <E.Date hasDelete={hasInput}>
                  <input
                    type="text"
                    placeholder="ex) 25.01.01"
                    value={item.date}
                    onChange={(e) =>
                      handleChange(index, "date", e.target.value)
                    }
                  />
                </E.Date>
                {hasInput && (
                  <E.DeleteIcon
                    src={`${process.env.PUBLIC_URL}/images/delete_o.svg`}
                    alt="delete"
                    onClick={() => handleRemoveInput(index)}
                  />
                )}
              </E.Input>
            );
          })}

          <E.Plus onClick={handleAddInput}>
            <img
              src={`${process.env.PUBLIC_URL}/images/Plus_B.svg`}
              alt="plus"
            />
            <div>목록 추가</div>
          </E.Plus>
        </E.List>
        <E.Button active={isFirstRowFilled}>저장하기</E.Button>
      </E.Body>

      {showModal && (
        <E.ModalOverlay>
          <E.ModalContent>
            <p>식품 목록 추가를 그만둘까요?</p>
            <div>
              식품 목록 추가 페이지를 벗어나면
              <br />
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

export default RefWrite;
