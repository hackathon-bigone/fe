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
  width: 390px;
  flex-shrink: 0;
  padding-bottom: 200px;
  align-items: center;
`;

export const Header = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 20px;
  align-items: center;

  div {
    margin-top: 6px;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const Profile = styled.div`
  width: 390px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  #welcome {
    white-space: normal; /* 기본 줄바꿈 허용 */
    word-break: keep-all; /* 단어(음절) 중간에서 끊지 않음(한글/영문 모두 효과적) */
    overflow-wrap: break-word; /* 너무 긴 단어(긴 URL 등)는 줄 끝에서만 적당히 개행 */
    // padding-left: 20px;
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  #id {
    margin-top: 10px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const Name = styled.div`
  display: flex;
  flex-direction: row;

  #name {
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  #sama {
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Image = styled.div`
  margin-left: 48px;
  width: 110px;
  height: 110px;
  flex-shrink: 0;
  background-color: #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 74px;
    height: 88px;
    flex-shrink: 0;
    aspect-ratio: 37/44;
  }
`;

export const Button = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;

  div {
    align-items: center;
    justify-content: center;
    display: flex;
    width: 170px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 5px;
    background: #ff4f26;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Activity = styled.div`
  width: 350px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ATitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
  width: 350px;
`;

export const AList = styled.div`
  margin-top: 6px;
  width: 350px;
  height: 110px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(229, 229, 229, 0.3);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Write = styled.div`
  width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 36px;
    height: 35px;
    flex-shrink: 0;
  }

  #num {
    margin-top: 10px;
    margin-bottom: 5px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  #title {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Hr = styled.div`
  width: 0.5px;
  height: 90px;
  background: rgba(0, 0, 0, 0.2);
`;

export const Comment = styled.div`
  width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 36px;
    height: 35px;
    flex-shrink: 0;
  }

  #num {
    margin-top: 10px;
    margin-bottom: 5px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  #title {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Scrap = styled.div`
  width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 36px;
    height: 35px;
    flex-shrink: 0;
  }

  #num {
    margin-top: 10px;
    margin-bottom: 5px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  #title {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Help = styled.div`
  width: 350px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
  width: 350px;
`;

export const HList = styled.div`
  margin-top: 6px;
  width: 350px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(229, 229, 229, 0.3);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Announce = styled.div`
  width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 36px;
    height: 35px;
    flex-shrink: 0;
  }

  #title {
    margin-top: 10px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Qna = styled.div`
  width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 36px;
    height: 35px;
    flex-shrink: 0;
  }

  #title {
    margin-top: 10px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Declar = styled.div`
  width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 36px;
    height: 35px;
    flex-shrink: 0;
  }

  #title {
    margin-top: 10px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Nav = styled.div`
  width: 390px;
  height: 64px;
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
  padding-bottom: 13px;
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
