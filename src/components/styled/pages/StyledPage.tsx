import styled from "styled-components";

interface IStyledPage {
  $verticalCenter?: boolean;
  $horizontalCenter?: boolean;
}

export const StyledPage = styled.div<IStyledPage>`
  display: flex;
  min-height: calc(100svh - 60px);
  height: calc(100svh - 60px);
  max-height: calc(100svh - 60px);
  width: 100svw;
  background-color: #333333;
  position: fixed;
  top: 60px;
  ${({ $verticalCenter }) => $verticalCenter ? 'align-items: center;' : null }
  ${({ $horizontalCenter }) => $horizontalCenter ? 'justify-content: center;' : null }

  /* Pseudo-elements for triangles */
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: 0; /* Align triangles to the bottom of the container */
    width: 0;
    height: 0;
    border-style: solid;
    z-index: -1;
  }

  &::before {
    right: 0px;
    border-width: 0 0 75svh 40svw; /* Adjust size and shape of the triangle */
    border-color: transparent transparent #3d3d3d transparent; /* Triangle color */
  }

  &::after {
    border-width: 0 80svw 60svh 100svw; /* Adjust size and shape of the triangle */
    border-color: transparent transparent #3a3a3a transparent; /* Triangle color */
  }
`;