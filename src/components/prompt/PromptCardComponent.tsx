import { ReactNode } from 'react';
import '../../css/components/PromptCardComponent.css';
import { IMessagePayload } from '../../models/IMessagePayload';
import TouchAppIcon from '@mui/icons-material/TouchApp';

interface IPromptCardComponent {
  icon: ReactNode,
  content: string,
  onClickHandler: (content: IMessagePayload) => void,
}


export default function PromptCardComponent({
  icon,
  content,
  onClickHandler
}: IPromptCardComponent) {
  const payload: IMessagePayload = {
    message: content
  }
  return (
    <>
      <div className='card-container fdr fw clickable' onClick={() => onClickHandler(payload)}>
        <div className='icon-container vc hc'>
          {icon}
        </div>
        <div className='prompt-text-container vc'>
          {content}

        </div>
        <div className='cta vc'>
          <TouchAppIcon />
        </div>
      </div>
    </>
  )
}