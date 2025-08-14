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
  z-index: 5;

  height: 80px;
  width: 393px;
  display: flex;
  flex-direction: row;
  padding: 17px; /* 아이콘 여백 조절으로 인해 변경 */
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
  flex: 1 1 auto;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QnAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const QnATitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
`;

export const QnAContent = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`;

export const Date = styled.div`
  height: 25px;
  margin-top: 0;
  display: flex;
  color: #969696;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const D_Inform_gray = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const D_Inform_black = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const D_State = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(255, 79, 38, 0.1);
  padding: 4px;

  color: #ff4f26;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin: 15px 0;
`;

export const Divider = styled.div`
  height: 20px;
  border-left: 1px solid #d9d9d9;
`;

export const QMark = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  color: #ff4f26;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 79, 38, 0.1);
`;

export const Pic = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 5px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
`;
