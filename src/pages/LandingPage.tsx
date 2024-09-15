import { Button } from '@mui/material';
import React from 'react';
import Header from '../components/header/Header';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import { defaultLandingPageCopywriting, ILandingPageCopywriting } from '../copywriting/interfaces/ILandingPage';
import '../css/LandingPage.css';
import { Locale, StorageKeys } from '../enums';
import { useChangingConversationLabel } from '../hooks/useChangingConversationLabel';
import { useCopywritingFromFile } from '../hooks/useCopywritingFromFile';
import useNavigation from '../hooks/useNavigation';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import { AppStorageUtil } from '../utils/AppStorageUtil';

export default function LandingPage() {
  const navigate = useNavigation();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);
  const [copywriting, setCopywriting] = React.useState<ILandingPageCopywriting>(defaultLandingPageCopywriting);

  React.useEffect(() => {
    useCopywritingFromFile<ILandingPageCopywriting>(locale, 'LandingPage').then(setCopywriting);
  }, [locale]);

  return (
    <>
      <Header setLocale={setLocale} />
      <div className='page-container hc vc'>
        <div className='row hc fh fdc'>
          <SquareSpacing spacing={SpacingSize.ExtraLarge} />
          <SquareSpacing spacing={SpacingSize.Medium} />
          <h1 className='hc'>{'TRANSLATE'}</h1>
          <h3 className='hc'>{'one'}</h3>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <span className='hc'>{useChangingConversationLabel()}</span>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <h3 className='hc'>{'at a time.'}</h3>
          <SquareSpacing spacing={SpacingSize.Large} />
          <div className='row hc fdc banner' onClick={navigate.goLogin}>
            <Button id="btnTryNow" sx={StyleButtonPrimary}>
              <div className='fdc'>
                <SquareSpacing spacing={SpacingSize.Small} />
                <span className='uc'>{copywriting.buttonLabel}</span>
                <SquareSpacing spacing={SpacingSize.Small} />
              </div>
            </Button>
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
        </div>
      </div>
    </>
  );
}
