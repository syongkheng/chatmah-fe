import styled, { css, keyframes } from "styled-components";

const pulse = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

// Create a styled component for the rotating element
interface IRotatingDiv extends React.HTMLProps<HTMLDivElement> {
  disabled?: boolean;
}

// Styled component using the props to conditionally apply the animation
export const RotatingDiv = styled.div<IRotatingDiv>`
${({ disabled }) =>
    disabled &&
    css`
    animation: ${pulse} 1s linear infinite;
  `}
`;