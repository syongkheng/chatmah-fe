import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';
import '../../css/components/Header.css';
import { Locale, StorageKeys } from '../../enums';
import useNavigation from '../../hooks/useNavigation';
import { StyleButtonPrimary } from '../../styling/ButtonPrimary';
import { AppStorageUtil } from '../../utils/AppStorageUtil';
import SquareSpacing from '../spacing/SquareSpacing';
import { SpacingSize } from '../spacing/SquareSpacing.enum';
import Branding from '../../assets/logo/brand-bg-text.png';


interface HeaderProps {
  setLocale: React.Dispatch<React.SetStateAction<string>>
}

export default function Header({
  setLocale
}: HeaderProps) {

  const [language, setLanguage] = React.useState<string>(AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);
  const navigate = useNavigation();

  React.useEffect(() => {
    AppStorageUtil.setLocal(StorageKeys.Locale, AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);
    if (AppStorageUtil.getSession(StorageKeys.Jwt)) {
      setIsAuthenticated(true);
    };
  }, [])

  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  function getLanguageLabel() {
    switch (AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en) {
      case Locale.en:
        return 'Language: ';
      case Locale.cn:
        return '语言设置: ';
      default:
        return 'Language: ';
    }
  }
  function getLogoutLabel() {
    switch (AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en) {
      case Locale.en:
        return 'Logout';
      case Locale.cn:
        return '退出账号';
      default:
        return 'Logout';
    }
  }
  function getLoginLabel() {
    switch (AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en) {
      case Locale.en:
        return 'Login';
      case Locale.cn:
        return '登录';
      default:
        return 'Login';
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    setLocale(event.target.value)
    AppStorageUtil.setLocal(StorageKeys.Locale, event.target.value);
  };

  const handleLogout = () => {
    AppStorageUtil.removeSession(StorageKeys.Jwt);
    setIsAuthenticated(false);
    setOpenMenu(false);
    navigate.goLanding();
  }

  const handleLogin = () => {
    setOpenMenu(false);
    navigate.goLogin();
  }


  return (
    <>
      <div className='header'>
        <div className='content maxw'>
          <div className='brand'>
            <img src={Branding} className='branding'/>
          </div>
          <div className='i18n-menu'>
            <div className='vc clickable' onClick={() => setOpenMenu(true)}>
              <MenuIcon />
            </div>
          </div>
        </div>
      </div>
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor='bottom'
      >
        <div className='hc'>
          <div className='menu-container'>
            <SquareSpacing spacing={SpacingSize.Large} />
            <div className='vc'>
              <span className='nw'>{getLanguageLabel()}</span>
              <SquareSpacing spacing={SpacingSize.Small} />
              <div className='selection'>
                <FormControl fullWidth>
                  <Select
                    id="demo-simple-select"
                    value={language}
                    onChange={handleChange}
                    size='small'
                    defaultValue={language}
                    autoWidth
                  >
                    <MenuItem value={Locale.en}>English</MenuItem>
                    <MenuItem value={Locale.cn}>中文</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <SquareSpacing spacing={SpacingSize.Large} />
            <Divider />
            <SquareSpacing spacing={SpacingSize.Large} />
            {isAuthenticated
              ?
              <Button
                id="logout"
                onClick={() => handleLogout()}
                fullWidth
                sx={StyleButtonPrimary}
              >
                {getLogoutLabel()}
              </Button>
              :
              <Button
                id="logout"
                onClick={() => handleLogin()}
                fullWidth
                sx={StyleButtonPrimary}
              >
                {getLoginLabel()}
              </Button>}
            <SquareSpacing spacing={SpacingSize.ExtraLarge} />
          </div>
        </div>
      </Drawer>
    </>
  )
}
