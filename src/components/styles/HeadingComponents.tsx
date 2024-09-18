import styled from "styled-components";

interface IHeadingStyledComponents {
  color?: string;
  fontSize?: string;
}

export const H1 = styled.h1<IHeadingStyledComponents>`
  color: ${({ color }) => color || '#333333'};
  font-size: ${({ fontSize }) => fontSize || '2em'};
`