import styled from "styled-components";

export const Container = styled.div`
  width: 320px;
  height: 130px;
  left: 20px;
  top: 454px;
  background: #ffffff;
  border-radius: 12px;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #000000;
    margin-bottom: 0.5rem;
  }
  & p {
    margin: 0;
    margin-bottom: 1rem;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: rgba(0, 0, 0, 0.58);
  }
`;
