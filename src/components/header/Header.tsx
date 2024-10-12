import React from 'react';
import BrandingLogo from '../../assets/logo/brand-bg-text.png';
import useNavigation from '../../hooks/useNavigation';
import { Clickable } from '../styled/ClickableComponents';
import { StyledHeader } from '../styled/header/HeaderComponents';
import LoadingComponent from '../loader/LoadingComponent';

const LazyBottomDrawer = React.lazy(() => import("../drawer/BottomDrawerComponent"));

const Header: React.FC = () => {
  const navigate = useNavigation();

  return (
    <StyledHeader>
      <StyledHeader.Content>
        <Clickable>
          <StyledHeader.Branding onClick={navigate.goLanding}>
            <StyledHeader.BrandImage src={BrandingLogo} alt="Branding Logo" />
          </StyledHeader.Branding>
        </Clickable>
        <Clickable>
          <StyledHeader.Menu>
            <React.Suspense fallback={<LoadingComponent show />}>
              <LazyBottomDrawer />
            </React.Suspense>
          </StyledHeader.Menu>
        </Clickable>
      </StyledHeader.Content>
    </StyledHeader>
  );
};

export default Header;
