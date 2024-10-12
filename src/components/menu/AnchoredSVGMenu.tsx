import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ICodeTable } from '../../models/ICodeTable';
import { Dispatch } from 'react';

interface IAnchoredMenu {
  isOpen: boolean;
  svgAnchorEl: SVGSVGElement | null;
  setAnchorEl: Dispatch<SVGSVGElement | null>;
  options: ICodeTable[];
  handleClose: (content: string, selectedLanguage: string) => void;
  _content: string;
}

export default function AnchoredSVGMenu({
  isOpen,
  svgAnchorEl,
  setAnchorEl,
  options,
  handleClose,
  _content
}: IAnchoredMenu) {

  return (
    <Menu
      id="basic-menu"
      anchorEl={svgAnchorEl}
      open={isOpen}
      onClose={() => setAnchorEl(null)}
    >
      {options.map((item, index) => (
        <MenuItem
          key={index}
          onClick={async () => handleClose(_content, item.codeDesc)}
        >
          {item.codeDesc}
        </MenuItem>
      ))
      }
    </Menu >
  );
}
