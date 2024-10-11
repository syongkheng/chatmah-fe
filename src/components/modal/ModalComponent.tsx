import React from "react";
import SquareSpacing from "../spacing/SquareSpacing";
import { SpacingSize } from "../spacing/SquareSpacing.enum";
import StyledButton from "../styled/buttons/ButtonComponents";
import { FlexDirectionRow, HorizontalCenter, SpaceBetween } from "../styled/alignment/AlignmentComponents";
import { StyledMuiModal } from "../styled/modals/ModalComponents";
import { H1 } from "../styled/HeadingComponents";
import { StyledText } from "../styled/typography/Typography";

export interface IModalComponent extends IModalContent {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IModalContent {
  title: string | undefined;
  bodyContent: (any)[] | undefined;
  cancelButtonOnly?: boolean;
  successButtonLabel?: string;
  cancelButtonLabel?: string;
  onSuccessHandler?: React.MouseEventHandler<HTMLButtonElement>;
}
export default function ModalComponent({
  show,
  setShow,
  title = "Title/标题标题",
  bodyContent = ["Content/内容"],
  cancelButtonOnly = false,
  cancelButtonLabel = 'Cancel/返回',
  successButtonLabel = 'Confirm/确认',
  onSuccessHandler,
}: IModalComponent) {

  const handleCloseButton = () => {
    setShow(false);
  }

  return (
    <StyledMuiModal open={show}>
      <StyledMuiModal.Backdrop>
        <H1>{title}</H1>
        <SquareSpacing spacing={SpacingSize.Large} />
        {
          bodyContent.length > 0 && bodyContent.map((content, index) => {
            return (
              <StyledText key={index}>
                {content}
                <SquareSpacing spacing={SpacingSize.Small} />
              </StyledText>
            )
          })
        }
        <SquareSpacing spacing={SpacingSize.Large} />
        {
          cancelButtonOnly
            ? (
              <HorizontalCenter>
                <StyledButton
                  $secondary
                  $fullWidth
                  onClick={handleCloseButton}
                >
                  {cancelButtonLabel}
                </StyledButton>
              </HorizontalCenter>

            )
            :
            (
              <FlexDirectionRow>
                <SpaceBetween>
                  <StyledButton
                    $secondary
                    $fullWidth
                    onClick={handleCloseButton}
                  >
                    {cancelButtonLabel}
                  </StyledButton>
                  <SquareSpacing spacing={SpacingSize.Medium} />
                  <StyledButton
                    $primary
                    $fullWidth
                    onClick={onSuccessHandler}
                  >
                    {successButtonLabel}
                  </StyledButton>
                </SpaceBetween>
              </FlexDirectionRow>
            )
        }
      </StyledMuiModal.Backdrop>
    </StyledMuiModal >
  )
}