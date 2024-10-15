import '../../css/components/LoadingComponent.css';
import Modal from '@mui/material/Modal';
import { StyledPage } from '../styled/pages/StyledPage';

interface ILoadingComponent {
  show: boolean;
}

export default function LoadingComponent({ show }: ILoadingComponent) {

  return (
    <Modal open={show}>
      <StyledPage $horizontalCenter $verticalCenter>
        <div className="loader"></div>
      </StyledPage>
    </Modal>
  )
}