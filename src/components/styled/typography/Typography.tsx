import styled from "styled-components";

export const PreserveWhitespace = styled.div`
  white-space: pre-line;
`

export const NoWrapText = styled.span`
  white-space: nowrap;
`;

export const Hyperlink = styled.a`
  font-weight: 500;
  color: #535bf2;
  text-decoration: inherit;
  cursor: pointer;
`;

interface IStyledText {
  $fontSize?: string;
  color?: string;
}

export const StyledText = styled.span<IStyledText>`
  font-size: ${({ $fontSize }) => $fontSize ? $fontSize : '14px;'};
  color: ${({color}) => color ? color : '#333333'};
`;

export const StyledPromptTypography = styled.span`
  font-size: 48px;
  color: #EFEFEF99;
`;