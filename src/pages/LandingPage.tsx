import React from 'react';
import Header from '../components/header/Header';
import { defaultLandingPageCopywriting, ILandingPageCopywriting } from '../copywriting/interfaces/ILandingPage';
import '../css/LandingPage.css';
import { Locale, StorageKeys } from '../enums';
import { useCopywritingFromFile } from '../hooks/useCopywritingFromFile';
import useNavigation from '../hooks/useNavigation';
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
      <div className='page hc vc'>

      </div>
    </>
  );
}
