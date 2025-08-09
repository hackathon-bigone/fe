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
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(100%)")};
  transition: transform 0.3s ease;
  overflow-y: auto;
  height: 90vh;
  width: 393px;

  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;
