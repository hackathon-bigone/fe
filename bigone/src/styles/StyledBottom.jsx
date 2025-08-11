import React from "react";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

export const BottomSheet = styled.div`
  display: relative;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(100%)")};
  transition: transform 0.3s ease;
  overflow-y: auto;
  height: 700px;
  width: 393px;

  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const CommentList = styled.div`
  height: 600px;
  width: 393px;
  padding: 20px;
  display: flex;
`;

export const CommentBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 393px;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  fill: #fff;
`;

export const CommentInput = styled.div`
  display: relative;
  width: 291px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 30px;
  border: 1px solid #c4c4c4;
  background: #fff;
  display: flex;
  align-items: center;

  #arrow {
    position: absolute;
    right: 39px;
  }

  textarea {
    border: none;
    width: 220px;
    margin: 0px 20px;
    align-self: center;
    resize: none;
    overflow: hidden;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    padding: 0;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  input {
    border: none;
    width: 220px;
    margin: 0px 20px;
    line-height: 38px;
    min-height: 30px;
    align-self: center;
    resize: none;
    overflow: hidden;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    padding: 0;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  :focus {
    outline: none;
    box-shadow: none;
  }

  &:focus-within {
    border-color: #ff4f26;
  }
`;

export const Circle = styled.div`
  position: absolute;
  right: 32px;
  width: 30px;
  height: 30px;
  border: 1px solid ${({ isActive }) => (isActive ? "#fff" : "#c4c4c4")};
  border-radius: 30px;
  background-color: ${({ isActive }) => (isActive ? "#ff4f26" : "transparent")};
`;

export const Profile = styled.div`
  position: relative;
  display: flex;
  width: 390px;
  height: 60px;

  #circle {
    position: absolute;
    left: 0px;
    top: 5px;
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }

  #cat {
    display: flex;
    position: absolute;
    left: 8px;
    top: 10px;
    width: 34px;
    height: 40px;
    flex-shrink: 0;
    aspect-ratio: 17/20;
  }
`;

export const Comment = styled.div`
  display: relative;

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

  #date {
    color: #969696;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  #comment {
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 20px; /* 133.333% */
  }

  #cat {
    width: 27.2px;
    height: 32.217px;
    flex-shrink: 0;
    aspect-ratio: 27.2/32.22;
  }

  #circle {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  #profile-wrapper {
    display: flex;
    position: absolute;
  }
`;
