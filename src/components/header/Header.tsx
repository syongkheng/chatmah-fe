import React from 'react';
import BrandingLogo from '../../assets/logo/brand-bg-text.png';
import { Locale, StorageKeys } from '../../enums';
import useNavigation from '../../hooks/useNavigation';
import { AppStorageUtil } from '../../utils/AppStorageUtil';
import BottomDrawer from '../drawer/BottomDrawerComponent';
import { Clickable } from '../styled/ClickableComponents';
import { StyledHeader } from '../styled/header/HeaderComponents';

interface HeaderProps {
  setLocale: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ setLocale }) => {
  const navigate = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

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
            <BottomDrawer
              setLocale={setLocale}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          </StyledHeader.Menu>
        </Clickable>
      </StyledHeader.Content>
    </StyledHeader>
  );
};

export default Header;
