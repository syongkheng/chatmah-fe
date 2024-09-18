import styled from "styled-components";

interface ITypewriterStyledComponents {
  color?: string;
  $blinkerColor?: string;
  fontSize?: string;
}

export const TypewriterEffect = styled.div<ITypewriterStyledComponents>`
  color: ${({ color }) => color || '#333333'};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '12px')};
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid ${({ $blinkerColor }) => $blinkerColor || '#333333'};
  animation: blink-caret 0.75s step-end infinite;
  width: fit-content;

  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: currentColor; }
  }
`;
