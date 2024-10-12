import '../../css/components/LoadingComponent.css';
import Modal from '@mui/material/Modal';

interface ILoadingComponent {
  show: boolean;
}

export default function LoadingComponent({ show }: ILoadingComponent) {

  return (
    <Modal open={show}>
      <div className="lds-dual-ring"></div>
    </Modal>
  )
}