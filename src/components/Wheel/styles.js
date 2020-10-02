import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Wrapper = styled.div`
  position: relative;
`;

export const DownArrow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
`;
export const Rectangle = styled.div`
  width: 40px;
  height: 6px;
  background: #ffdda1;
  border-radius: 2px;
`;
export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 16.06px solid transparent;
  border-right: 16.06px solid transparent;
  border-top: 28.06px solid #ffdda1;
`;

export const Circle = styled.ul`
  height: 266px;
  width: 267px;
  background: rgba(0, 0, 0, 0.06);
  box-shadow: 0px 3.16862px 6.33724px rgba(0, 0, 0, 0.12);
  position: relative;
  padding: 0;
  margin: 1rem auto;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
  border: 5px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  animation: ${rotate}
    ${({ rotationTime }) => (rotationTime ? rotationTime + "s" : "1s")} linear
    infinite;
  ${({ stopRotation }) =>
    stopRotation &&
    css`
      animation-play-state: paused;
    `}
`;

export const WheelSegment = styled.li`
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  transform-origin: 0% 100%;
  background: ${({ background }) => background || "#832A4B"};
  transform: rotate(${({ rotate }) => (rotate ? rotate + "deg" : "0deg")})
    skewY(${({ skewY }) => (skewY ? "-" + skewY + "deg" : "-60deg")});
  box-shadow: 0px 3.74199px 3.74199px rgba(0, 0, 0, 0.25);
`;

export const Text = styled.div`
  position: absolute;
  left: -100%;
  width: 200%;
  height: 200%;
  text-align: center;
  display: block;
  transform: skewY(45deg) rotate(20deg);
  padding-top: 20px;
  font-weight: 500;
  font-size: 11.226px;
  line-height: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  & p {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }
  & span {
    display: block;
  }
`;

export const SpinButtonWrapper = styled.div`
  position: absolute;
  padding: 3px;
  background: #fbaf03;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
`;
export const SpinButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  background: #ffdda1;
  box-shadow: 0px 3.74199px 3.74199px rgba(89, 57, 0, 0.25);
  border-radius: 50%;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;

  &:hover {
    background: #e9c586;
  }
`;

export const ThickArrow = styled.div`
  clip-path: polygon(
    60% 59%,
    79% 56%,
    77% 44%,
    100% 53%,
    83% 76%,
    79% 64%,
    37% 69%,
    17% 65%,
    0 57%,
    35% 62%
  );
  background: black;
  height: 280px;
  width: 280px;
`;
