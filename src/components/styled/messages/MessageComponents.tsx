import styled from "styled-components";

interface IStyledMessageCard {
  $isUser?: boolean;
}

const StyledMessageCard = styled.div<IStyledMessageCard>`
  font-size: 12px;
  max-width: 275px;
  border-radius: 0.5rem;
  padding: 0.4rem;
  margin: 0.1rem;
  color: #333333;
  min-width: 200px;
  background-color: ${({ $isUser = false }) => $isUser ? `#A7D49B;` : `#F5F5F599;`}
  ${({$isUser}) => $isUser ? null : `display: flex;`}
`;


interface IContentBackdrop extends IStyledMessageCard { }

export const ContentBackdrop = styled.div<IContentBackdrop>`
  border-radius: 0.5rem;
  padding: 0.4rem;
  margin: 0.3rem 0;
  background-color: ${({ $isUser = false }) => $isUser ? `#FFFFFF;` : `transparent;`}
`;

export const BrandingIcon = styled.img`
  margin: 1vh 1vw 1vh 1vw;
  border-radius: 15px;
  width: 30px;
  height: 30px;
`;


// Extend the type to include additional components
type StyledMessageCardType = typeof StyledMessageCard & {
  ContentBackdrop: typeof ContentBackdrop;
  BrandingIcon: typeof BrandingIcon;
  // Menu: typeof StyledHeaderMenu;
  // Content: typeof StyledHeaderContent;
  // Branding: typeof StyledHeaderBranding;
  // BrandImage: typeof StyledHeaderBrandImage;
};

const EnhancedMessageCard = StyledMessageCard as StyledMessageCardType;
EnhancedMessageCard.ContentBackdrop = ContentBackdrop;
EnhancedMessageCard.BrandingIcon = BrandingIcon;

export { EnhancedMessageCard as StyledMessageCard };