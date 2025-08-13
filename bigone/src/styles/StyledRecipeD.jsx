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
  width: 270px;
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
  margin-right: 20px;
`;

export const D_State = styled.div`
  height: 25px;
  padding: 0 5px;
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

export const Heart = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  #heart_cnt {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 4px;
  }

  #heart {
    width: 17px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const ContentBar = styled.div`
  width: 393px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
`;

export const Tap = styled.div`
  width: 197px;
  height: 50px;
  border-bottom: ${({ $selected }) => ($selected ? "2px solid #ff4f26" : "2px solid transparent")};

  color: ${({ $selected }) => ($selected ? " #000" : "#969696")};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Ingredients = styled.div`
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  position: relative;

  #wrapper {
    display: flex;
    position: relative;
    padding: 20px;
    width: 393px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #title {
    display: inline-block;
    position: relative;
    padding-right: 11px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background-color: #fff;
    z-index: 10;
  }

  #count {
    display: inline-block;
    position: relative;
    padding-left: 11px;
    color: #000;
    text-align: right;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: #fff;
    z-index: 10;
  }

  #line {
    position: absolute;
    top: 20px;
    right: 40px;
    width: 307px;
    height: 1px;
  }
`;

export const Recipe = styled.div`
  background: rgba(196, 196, 196, 0.1);
  padding: 20px;

  #count {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const RecipeStep = styled.div`
  width: 350px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
  padding: 20px;
  margin: 20px 0;

  #step {
    color: #ff4f26;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  #explanation {
    margin-top: 5px;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 133.333% */
  }
`;

export const PicStep = styled.div`
  width: 310px;
  height: 310px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;
