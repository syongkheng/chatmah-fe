import React from 'react';
import Header from '../components/header/Header';
import { defaultLandingPageCopywriting, ILandingPageCopywriting } from '../copywriting/interfaces/ILandingPage';
import '../css/LandingPage.css';
import { Locale, StorageKeys } from '../enums';
import { useCopywritingFromFile } from '../hooks/useCopywritingFromFile';
import useNavigation from '../hooks/useNavigation';
import { AppStorageUtil } from '../utils/AppStorageUtil';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import { Button } from '@mui/material';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import Typewriter from '../components/animations/TypewriterEffect';
import { H1 } from '../components/styles/HeadingComponents';
import ReactMarkdown from 'react-markdown';

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
      <div className='page hc vc fdc'>
        <div className='fw fh maxw hc vc fdc'>
          <SquareSpacing spacing={SpacingSize.Large} />
          <div className='fw fh vc hc fdc'>
            <ReactMarkdown className='tal' components={{
              p: ({ children }) => <H1 color='#ffffff90' fontSize='3rem'>{children}</H1>, // Render paragraphs as H1
              br: () => <br />
            }}>
              {copywriting.prompt}
            </ReactMarkdown>
            <div className='fdc vc'>
            <SquareSpacing spacing={SpacingSize.Medium} />

              <div className='attn vc'>
                <Typewriter text={copywriting.typewriterText} color={'#ffffff90'} fontSize={24} speed={500} locale={locale as Locale} />
              </div>
              <div className='pr'>
              </div>
              <SquareSpacing spacing={SpacingSize.Medium} />
              <Button
                id="btn_mock_send"
                sx={StyleButtonPrimary}
                onClick={() => navigate.goLogin()}
              >
                {copywriting.buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
