import styled from "styled-components";

export const HorizontalCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const VerticalCenter = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

interface IFlexDirectionColumn {
  $fullHeight?: boolean;
}

export const FlexDirectionColumn = styled.div<IFlexDirectionColumn>`
  display: flex;
  flex-direction: column;
  ${({ $fullHeight }) => $fullHeight ? `height: 100%;` : null}
`;

interface IFlexDirectionRow {
  $reverse?: boolean;
}

export const FlexDirectionRow = styled.div<IFlexDirectionRow>`
  display: flex;
  flex-direction: ${({ $reverse = false }) => $reverse ? `row-reverse;` : `row;`};
`;

interface IFixedHeight {
  height: string;
}

export const FixedHeightBox = styled.div<IFixedHeight>`
    height: ${({ height }) => `${height}`};
`;

interface IFixedWidth {
  width: string;
  minWidth?: string;
  $maxWidth?: string;
}

export const FixedWidthBox = styled.div<IFixedWidth>`
    width: ${({ width }) => `${width}`};
    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : null};
    ${({ $maxWidth }) => $maxWidth ? `max-width: ${$maxWidth};` : null};
`;

interface IFullWidthBox {
  $svw?: boolean;
}

export const FullWidthBox = styled.div<IFullWidthBox>`
  width: ${({ $svw }) => $svw ? `100svw;` : `100%;`};
`;

export const FullHeightBox = styled.div`
  height: 100%;
`;