import React from 'react';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import { FixedHeightBox, FixedWidthBox, FlexDirectionColumn, FullWidthBox, HorizontalCenter, VerticalCenter } from '../components/styled/alignment/AlignmentComponents';
import StyledButton from '../components/styled/buttons/ButtonComponents';
import { H1 } from '../components/styled/HeadingComponents';
import { StyledPage } from '../components/styled/pages/StyledPage';
import { defaultLandingPageCopywriting, ILandingPageCopywriting } from '../copywriting/interfaces/ILandingPage';
import { Locale } from '../enums';
import { useCopywritingFromFile } from '../hooks/useCopywritingFromFile';
import useNavigation from '../hooks/useNavigation';
import { useLocale } from '../contexts/LocaleContext';
import LoadingComponent from '../components/loader/LoadingComponent';

const LazyReactMarkDown = React.lazy(() => import('react-markdown'));
const LazyTypewriter = React.lazy(() => import('../components/animations/TypewriterEffect'));


export default function LandingPage() {
  const navigate = useNavigation();
  const { locale } = useLocale();
  const [copywriting, setCopywriting] = React.useState<ILandingPageCopywriting>(defaultLandingPageCopywriting);

  React.useEffect(() => {
    useCopywritingFromFile<ILandingPageCopywriting>(locale, 'LandingPage').then(setCopywriting);
  }, [locale]);

  return (
    <>
      <React.Suspense fallback={<LoadingComponent show />}>
        <StyledPage $verticalCenter $horizontalCenter>
          <FlexDirectionColumn>
            <HorizontalCenter>
              <LazyReactMarkDown className='tal' components={{
                p: ({ children }) => <H1 color='#ffffff90' fontSize='3rem'>{children}</H1>, // Render paragraphs as H1
                br: () => <br />
              }}>
                {copywriting.prompt}
              </LazyReactMarkDown>
            </HorizontalCenter>
            <SquareSpacing spacing={SpacingSize.Medium} />
            <FullWidthBox>
              <HorizontalCenter>
                <FixedHeightBox height={'50px'}>
                  <VerticalCenter>
                    <LazyTypewriter
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
                  $secondary
                  id="btn_mock_send"
                  onClick={() => navigate.goLogin()}
                  $fullWidth
                >
                  {copywriting.buttonLabel}
                </StyledButton>
              </FixedWidthBox>
            </HorizontalCenter>
          </FlexDirectionColumn>
        </StyledPage >
      </React.Suspense>
    </>
  );
}
