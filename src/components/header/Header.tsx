import React from 'react';
import BrandingLogo from '../../assets/logo/brand-bg-text.png';
import { Locale, StorageKeys } from '../../enums';
import useNavigation from '../../hooks/useNavigation';
import { AppStorageUtil } from '../../utils/AppStorageUtil';
import { Clickable } from '../styled/ClickableComponents';
import { StyledHeader } from '../styled/header/HeaderComponents';
import LoadingComponent from '../loader/LoadingComponent';
import { useLocale } from '../../contexts/LocaleContext';
const LazyBottomDrawer = React.lazy(() => import("../drawer/BottomDrawerComponent"));

const Header: React.FC = () => {
  const navigate = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const { setLocale } = useLocale();


  React.useEffect(() => {
    const storedLocale = AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en;
    AppStorageUtil.setLocal(StorageKeys.Locale, storedLocale);
    if (AppStorageUtil.getSession(StorageKeys.Jwt)) {
      setIsAuthenticated(true);
    }
  }, []);

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
              <LazyBottomDrawer
                setLocale={setLocale}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            </React.Suspense>
          </StyledHeader.Menu>
        </Clickable>
      </StyledHeader.Content>
    </StyledHeader>
  );
};

export default Header;
