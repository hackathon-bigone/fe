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

  #back {
    width: 10px;
    height: 22px;
    flex-shrink: 0;
  }

  #share {
    width: 19px;
    height: 22px;
    flex-shrink: 0;
  }
`;

export const Content = styled.div`
  margin-top: 60px;
  padding: 20px;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Pic = styled.div`
  width: 390px;
  height: 390px;
  flex-shrink: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 15px 0;

  #star {
    margin-top: 7px;
  }
`;

export const D_Title = styled.div`
  width: 250px;
  color: #000;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const D_Inform_gray = styled.div`
  color: #969696;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
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
  height: 25px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(255, 79, 38, 0.1);
  margin: 0 20px;

  color: #ff4f26;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0 5px;
`;

export const Profile = styled.div`
  position: relative;
  display: flex;
  width: 390px;
  height: 60px;

  #profile_inform {
    display: flex;
    flex-direction: column;
  }

  #circle {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }

  #cat {
    display: flex;
    position: absolute;
    left: 8px;
    top: 5px;
    width: 34px;
    height: 40px;
    flex-shrink: 0;
    aspect-ratio: 17/20;
  }

  #username {
    width: 150px;
    margin: 0px 10px;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const PostDate = styled.div`
  width: 90px;
  color: #969696;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const Post = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
`;

export const PostURL = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  p {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  a {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
  }
`;

export const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  #comment_cnt {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 4px;
  }

  #comment {
    width: 17px;
    height: 16px;
    flex-shrink: 0;
  }
`;
