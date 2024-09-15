import SquareSpacing from "../spacing/SquareSpacing";
import { SpacingSize } from "../spacing/SquareSpacing.enum";
import "../../css/components/Footer.css";

export default function Footer() {

  const VERSION = 'Beta';
  const DISCORD_INVITE_LINK = 'https://discord.gg/SWYvkQNtmp';

  return (
    <div className='footer'>
      <div className='content maxw'>
        <div className='primary'>
          <span className='content'>
            Support:
          </span>
          <span className='content'>
            <a href={DISCORD_INVITE_LINK}> Discord </a>
          </span>
        </div>
        <SquareSpacing spacing={SpacingSize.ExtraSmall} />
        <div className='secondary'>
          <span className='content'>
            Version:
          </span>
          <span className='content'>
            {VERSION}
          </span>
        </div>
      </div>
    </div>
  )
}