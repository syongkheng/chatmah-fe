import styled from 'styled-components';

// Base styled header
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
  height: 60px;
  width: 100svw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  z-index: 1000;
`;

// Styled components for the header's content, branding, menu, and brand image
const StyledHeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  padding: 0 2svw;
  max-width: 1080px;
`;

const StyledHeaderBranding = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
`;

const StyledHeaderMenu = styled.div`
  display: flex;
  flex-direction: row;
  color: #efefef;
  height: 100%;
  align-items: center;
`;

const StyledHeaderBrandImage = styled.img`
  height: 100%;
`;

// Extend the type to include additional components
type StyledHeaderType = typeof StyledHeader & {
  Menu: typeof StyledHeaderMenu;
  Content: typeof StyledHeaderContent;
  Branding: typeof StyledHeaderBranding;
  BrandImage: typeof StyledHeaderBrandImage;
};

// Assign the styled components to StyledHeader
const EnhancedStyledHeader = StyledHeader as StyledHeaderType;
EnhancedStyledHeader.Menu = StyledHeaderMenu;
EnhancedStyledHeader.Content = StyledHeaderContent;
EnhancedStyledHeader.Branding = StyledHeaderBranding;
EnhancedStyledHeader.BrandImage = StyledHeaderBrandImage;

// Export the enhanced styled header
export { EnhancedStyledHeader as StyledHeader };
