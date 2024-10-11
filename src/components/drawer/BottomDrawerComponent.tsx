import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';
import { Locale, StorageKeys } from "../../enums";
import useNavigation from '../../hooks/useNavigation';
import { AppStorageUtil } from "../../utils/AppStorageUtil";
import SquareSpacing from "../spacing/SquareSpacing";
import { SpacingSize } from "../spacing/SquareSpacing.enum";
import StyledButton from '../styled/buttons/ButtonComponents';
import { Clickable } from '../styled/ClickableComponents';
import { FixedWidthBox, FlexDirectionColumn, HorizontalCenter } from '../styled/alignment/AlignmentComponents';
import { NoWrapText } from '../styled/typography/Typography';

interface IBottomDrawer {
  setLocale: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BottomDrawer({
  setLocale,
  isAuthenticated,
  setIsAuthenticated,
}: IBottomDrawer) {

  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const navigate = useNavigation();
  const [language, setLanguage] = React.useState<string>(
    AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en
  );

  const getLanguageLabel = () => {
    const labels = {
      [Locale.en]: 'Language: ',
      [Locale.cn]: '语言设置: ',
    };
    return labels[AppStorageUtil.getLocal(StorageKeys.Locale) as Locale ?? Locale.en] || 'Language: ';
  };

  const getLogoutLabel = () => {
    const labels = {
      [Locale.en]: 'Logout',
      [Locale.cn]: '退出账号',
    };
    return labels[AppStorageUtil.getLocal(StorageKeys.Locale) as Locale ?? Locale.en] || 'Logout';
  };

  const getLoginLabel = () => {
    const labels = {
      [Locale.en]: 'Login',
      [Locale.cn]: '登录',
    };
    return labels[AppStorageUtil.getLocal(StorageKeys.Locale) as Locale ?? Locale.en] || 'Login';
  };

  const handleChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value as string;
    setLanguage(newLanguage);
    setLocale(newLanguage);
    AppStorageUtil.setLocal(StorageKeys.Locale, newLanguage);
  };

  const handleLogout = () => {
    AppStorageUtil.removeSession(StorageKeys.Jwt);
    setIsAuthenticated(false);
    setOpenMenu(false);
    navigate.goLanding();
  };

  const handleLogin = () => {
    setOpenMenu(false);
    navigate.goLogin();
  };
  return (
    <>
      <Clickable onClick={() => setOpenMenu(true)}>
        <MenuIcon />
      </Clickable>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor='bottom'>
        <HorizontalCenter>
          <FixedWidthBox width='80svw' maxWidth='520px'>
            <FlexDirectionColumn>
              <SquareSpacing spacing={SpacingSize.Large} />
              <NoWrapText>{getLanguageLabel()}</NoWrapText>
              <SquareSpacing spacing={SpacingSize.Small} />
              <FormControl fullWidth>
                <Select
                  id="language-select"
                  value={language}
                  onChange={handleChange}
                  size='small'
                  autoWidth
                >
                  <MenuItem value={Locale.en}>English</MenuItem>
                  <MenuItem value={Locale.cn}>中文</MenuItem>
                </Select>
              </FormControl>
              <SquareSpacing spacing={SpacingSize.Large} />
              <Divider />
              <SquareSpacing spacing={SpacingSize.Large} />
              <StyledButton
                $primary
                $fullWidth
                id="auth-button"
                onClick={isAuthenticated ? handleLogout : handleLogin}
              >
                {isAuthenticated ? getLogoutLabel() : getLoginLabel()}
              </StyledButton>
              <SquareSpacing spacing={SpacingSize.ExtraLarge} />
            </FlexDirectionColumn>
          </FixedWidthBox>
        </HorizontalCenter>
      </Drawer>
    </>
  )
}