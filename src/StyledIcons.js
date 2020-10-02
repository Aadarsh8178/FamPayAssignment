import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "./Assets/arrow.svg";

//we can pass color as prop to StyledArrowIcon to change the color
export const StyledArrowIcon = styled(ArrowIcon)`
  & path {
    fill: ${({ color }) => color || "#797979"};
  }
`;
