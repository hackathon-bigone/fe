import { styled } from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 0px;
  min-height: 100vh;
  padding: 0; /* 불필요한 패딩 제거 */
  box-sizing: border-box; /* 패딩이 width에 포함되도록 설정 */
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 393px;
  flex-shrink: 0;
  padding-bottom: 200px;
`;

export const Header = styled.div`
  /* 스크롤 만들기 위해 추가 */
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  z-index: 10;

  height: 80px;
  width: 393px;
  display: flex;
  flex-direction: row;
  padding: 20px;
  align-items: end;
  justify-content: space-between;
`;

export const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px; /*자간*/
`;

export const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const Content = styled.div`
  margin-top: 60px;
  padding: 20px;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
`;

export const Search = styled.div`
  width: 350px;
  height: 50px;
  flex-shrink: 0;
  padding: 15px;
  margin-top: 10px;
  border-radius: 5px;
  background: rgba(196, 196, 196, 0.2);
  display: flex;
  flex-direction: row;

  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  input {
    color: black;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 15px;
    border: none;
    outline: none;
    background-color: transparent;
    width: 250px;
    text-align: left;
  }
`;

export const Bar = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Post = styled.div`
  display: flex;

  #bold {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0 6px;
  }

  #num {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  #gun {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const Recent = styled.div`
  #dot {
    display: flex;
    background-color: #ff4f26;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  gap: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  color: #ff4f26;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const Component = styled.div`
  position: relative;
  width: 390px;
  height: 100px;
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;

export const Img = styled.div`
  img {
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: 5px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  }
`;

export const ImformBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  position: relative;
`;

export const CTitle = styled.div`
  width: 245px;
  display: flex;
  justify-content: space-between;

  #title {
    display: flex;
    width: 185px;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  #scrap {
    display: flex;
    width: 23px;
    height: 22px;
    flex-shrink: 0;
    margin: 3px 0;
  }
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 7px;
  gap: 2px;

  #comment {
    margin-top: 4px;
    width: 17px;
    height: 16px;
    flex-shrink: 0;
  }

  #comment-num {
    margin-left: 2px;
    margin-bottom: 3px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  #line {
    display: flex;
    margin: 3px 5px; /* 나중에 다시 수정*/
    width: 1px;
    height: 20px;
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const D_State = styled.div`
  height: 25px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(255, 79, 38, 0.1);

  color: #ff4f26;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0 5px;
`;

export const D_Date = styled.div`
  display: flex;
  justify-content: end;
  color: #969696;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const Nav = styled.div`
  width: 390px;
  height: 104px;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  padding-top: 15px;
  padding-bottom: 43px;
  padding-left: 20px;
  padding-right: 20px;
  gap: 50px;
`;

export const NHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NRefri = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 21.406px;
    height: 28.286px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NRecipe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28.071px;
    height: 28.065px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NPur = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 25.356px;
    height: 28px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NMy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  div {
    margin-top: 6px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
