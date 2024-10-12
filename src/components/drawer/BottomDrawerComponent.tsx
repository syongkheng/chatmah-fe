import MenuIcon from '@mui/icons-material/Menu';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import React from 'react';
import { Locale, StorageKeys } from "../../enums";
import useNavigation from '../../hooks/useNavigation';
import { AppStorageUtil } from "../../utils/AppStorageUtil";
import SquareSpacing from "../spacing/SquareSpacing";
import { SpacingSize } from "../spacing/SquareSpacing.enum";
import { Clickable } from '../styled/ClickableComponents';
import { FixedWidthBox, FlexDirectionColumn, HorizontalCenter } from '../styled/alignment/AlignmentComponents';
import { NoWrapText } from '../styled/typography/Typography';
import LoadingComponent from '../loader/LoadingComponent';

const LazyStyledButton = React.lazy(() => import('../styled/buttons/ButtonComponents'));
const LazyDrawer = React.lazy(() => import('@mui/material/Drawer'));

interface IBottomDrawer {
  setLocale: (locale: string) => void;
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
      <React.Suspense fallback={<LoadingComponent show />}>
        <LazyDrawer open={openMenu} onClose={() => setOpenMenu(false)} anchor='bottom'>
          <HorizontalCenter>
            <FixedWidthBox width='80svw' $maxWidth='520px'>
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
                <React.Suspense fallback={<LoadingComponent show />}>
                  <LazyStyledButton
                    $primary
                    $fullWidth
                    id="auth-button"
                    onClick={isAuthenticated ? handleLogout : handleLogin}
                  >
                    {isAuthenticated ? getLogoutLabel() : getLoginLabel()}
                  </LazyStyledButton>
                </React.Suspense>
                <SquareSpacing spacing={SpacingSize.ExtraLarge} />
              </FlexDirectionColumn>
            </FixedWidthBox>
          </HorizontalCenter>
        </LazyDrawer>
      </React.Suspense>
    </>
  )
}