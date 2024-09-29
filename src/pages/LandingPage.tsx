import React from 'react';
import ReactMarkdown from 'react-markdown';
import Typewriter from '../components/animations/TypewriterEffect';
import Header from '../components/header/Header';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import { FixedHeightBox, FixedWidthBox, FlexDirectionColumn, FullWidthBox, HorizontalCenter, VerticalCenter } from '../components/styled/alignment/AlignmentComponents';
import StyledButton from '../components/styled/buttons/ButtonComponents';
import { H1 } from '../components/styled/HeadingComponents';
import { StyledPage } from '../components/styled/pages/StyledPage';
import { defaultLandingPageCopywriting, ILandingPageCopywriting } from '../copywriting/interfaces/ILandingPage';
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
      <StyledPage $verticalCenter $horizontalCenter>
        <FlexDirectionColumn>
          <HorizontalCenter>
            <ReactMarkdown className='tal' components={{
              p: ({ children }) => <H1 color='#ffffff90' fontSize='3rem'>{children}</H1>, // Render paragraphs as H1
              br: () => <br />
            }}>
              {copywriting.prompt}
            </ReactMarkdown>
          </HorizontalCenter>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <FullWidthBox>
            <HorizontalCenter>
              <FixedHeightBox height={'50px'}>
                <VerticalCenter>
                  <Typewriter
                    text={copywriting.typewriterText}
                    color={'#ffffff90'}
                    fontSize={24}
                    speed={400}
                    locale={locale as Locale}
                  />
                </VerticalCenter>
              </FixedHeightBox>
            </HorizontalCenter>
          </FullWidthBox>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <HorizontalCenter>
            <FixedWidthBox width='30svh'>
              <StyledButton
                secondary
                id="btn_mock_send"
                onClick={() => navigate.goLogin()}
                fullWidth
              >
                {copywriting.buttonLabel}
              </StyledButton>
            </FixedWidthBox>
          </HorizontalCenter>
        </FlexDirectionColumn>
      </StyledPage >
    </>
  );
}
