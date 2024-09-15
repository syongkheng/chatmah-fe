import '../../css/components/SideDrawerComponent.css';
import { Drawer } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ISideDrawerComponent {
  isOpen: boolean;
  toggleDrawer: (state: boolean) => void;
}

export default function SideDrawerComponent({
  isOpen,
  toggleDrawer,
}: ISideDrawerComponent) {
  return (
    <>
      <Drawer open={isOpen} onClose={() => toggleDrawer(false)}>
        <div className="side-drawer-container fdc fh">
          <div className='fw fdr jc-sb vc'>
            <h3>{'Recent'}</h3>
            <div className='fh vc' onClick={() => toggleDrawer(false)}>
              <CloseIcon />
            </div>
          </div>
          <div className='fit-parent fh vc hc'>
            {'Coming Soon :)'}
          </div>
        </div>
      </Drawer>
    </>
  )
}