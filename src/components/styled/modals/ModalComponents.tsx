import styled from "styled-components";
import Modal from "@mui/material/Modal";

export const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  padding: 5svh 3svw 5svh 3svw;
  border-radius: 1rem;
  justify-content: center;
  background-color: #faf9f690;
  width: 500px;
  height: fit-content;
  @media (max-width: 586px) {
    width: 80vw;
  }
`;

const StyledMuiModal = styled(Modal)`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const StyledBackdrop = styled.div`
  background-color: #efefef;
  border-radius: 9px;
  padding: 4vh 2vw;
  min-width: fit-content;
  max-width: 90vw;
  min-width: 300px;
`;

type StyledMuiModalType = typeof StyledMuiModal & {
  Backdrop: typeof StyledBackdrop;
}

const EnhancedStyledMuiModal = StyledMuiModal as StyledMuiModalType;
EnhancedStyledMuiModal.Backdrop = StyledBackdrop;

export { EnhancedStyledMuiModal as StyledMuiModal };