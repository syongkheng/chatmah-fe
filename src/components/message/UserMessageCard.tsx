import LanguageIcon from '@mui/icons-material/Language';
import React from 'react';
import { ICodeTable } from '../../models/ICodeTable';
import { IConversationMessage } from "../../models/IConversationMessage";
import { ITranslateMessagePayload } from '../../models/ITranslateMessagePayload';
import { translateContent } from '../../requests/translateContent';
import { DateUtil } from '../../utils/DateUtil';
import { StringUtil } from '../../utils/StringUtil';
import AnchoredSVGMenu from '../menu/AnchoredSVGMenu';
import { FlexDirectionColumn, FlexDirectionRow } from '../styled/alignment/AlignmentComponents';
import { StyledMessageCard } from '../styled/messages/MessageComponents';

export default function UserMessageCard({
  content,
  createdDt,
  translationCodeTable,
}: IConversationMessage) {

  const [translatedContent, setTranslatedContent] = React.useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (_content: string, _selectedLanguage: string) => {
    const translatePayload: ITranslateMessagePayload = { language: _selectedLanguage, message: _content };
    const translatedContentResult = await translateContent(translatePayload);
    setTranslatedContent(translatedContentResult);
    setAnchorEl(null);
  };

  React.useEffect(() => {
    // Reset translated content when message content changes
    setTranslatedContent('');
  }, [content]);

  return (
    <>
      <FlexDirectionRow $reverse>
        <StyledMessageCard $isUser>
          <FlexDirectionColumn>
            <StyledMessageCard.ContentBackdrop $isUser>
              {content}
              {
                !StringUtil.isStringEmpty(translatedContent) &&
                <>
                  <hr />
                  <span>
                    {translatedContent}
                  </span>
                </>
              }
            </StyledMessageCard.ContentBackdrop>
            <FlexDirectionRow $reverse>
              <LanguageIcon
                id="basic-button"
                onClick={handleClick}
                className='clickable'
              />
              &nbsp;
              <span>{'-'}</span>
              &nbsp;
              <span>{DateUtil.formatDateToDDMMHHMM(new Date(createdDt))}</span>
            </FlexDirectionRow>

          </FlexDirectionColumn>
        </StyledMessageCard>
      </FlexDirectionRow>
      <AnchoredSVGMenu
        isOpen={open}
        svgAnchorEl={anchorEl}
        options={translationCodeTable as ICodeTable[]}
        handleClose={handleClose}
        setAnchorEl={setAnchorEl}
        _content={content}
      />
    </>
  )
}
