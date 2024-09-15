import '../../css/components/MessageCard.css';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { IConversationMessage } from '../../models/IConversationMessage';
import { StringUtil } from '../../utils/StringUtil';
import AnchoredSVGMenu from '../menu/AnchoredSVGMenu';
import LanguageIcon from '@mui/icons-material/Language';
import React from 'react';
import { ITranslateMessagePayload } from '../../models/ITranslateMessagePayload';
import { translateContent } from '../../requests/translateContent';
import { DateUtil } from '../../utils/DateUtil';
import { ICodeTable } from '../../models/ICodeTable';
import ReactMarkdown from 'react-markdown';

export default function GptMessageCard({
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

  return (
    <div className="message-anchor">
      <AdminPanelSettingsIcon className="icon" />
      <div>
        <div className='message-container fdc'>
          <span className='message'>
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </span>
          {
            !StringUtil.isStringEmpty(translatedContent) &&
            <>
              <hr />
              <ReactMarkdown>
                {translatedContent}
              </ReactMarkdown>
              <hr />

            </>
          }
        </div>
        <div className='menu'>
          <LanguageIcon
            id="basic-button"
            onClick={handleClick}
            className='clickable'
          />
          &nbsp;
          <span>{'-'}</span>
          &nbsp;
          <span>{DateUtil.formatDateToDDMMHHMM(new Date(createdDt))}</span>
          <AnchoredSVGMenu
            isOpen={open}
            svgAnchorEl={anchorEl}
            options={translationCodeTable as ICodeTable[]}
            handleClose={handleClose}
            setAnchorEl={setAnchorEl}
            _content={content}
          />
        </div>
      </div>
    </div>
  )
}