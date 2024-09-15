import { Button, Modal } from "@mui/material";
import React from "react";
import '../../css/components/ModalComponent.css'
import { StyleButtonPrimary } from "../../styling/ButtonPrimary";
import { StyleButtonSecondary } from "../../styling/ButtonSecondary";
import SquareSpacing from "../spacing/SquareSpacing";
import { SpacingSize } from "../spacing/SquareSpacing.enum";

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
    <Modal open={show}>
      <div className="modal-container">
        <div className="title">
          {title}
        </div>
        <SquareSpacing spacing={SpacingSize.Large} />
        {
          bodyContent.length > 0 && bodyContent.map((content, index) => {

            return (
              <div key={index}>
                {content}
                <SquareSpacing spacing={SpacingSize.Small} />
              </div>
            )
          })
        }
        <SquareSpacing spacing={SpacingSize.Large} />
        {
          cancelButtonOnly
            ? (
              <div>
                <Button
                  onClick={handleCloseButton}
                  sx={StyleButtonSecondary}
                >
                  {cancelButtonLabel}
                </Button>
              </div>
            )
            : (<div className="button-container">
              <div>
                <Button
                  onClick={handleCloseButton}
                  sx={StyleButtonSecondary}
                >
                  {cancelButtonLabel}
                </Button>
              </div>
              <SquareSpacing spacing={SpacingSize.Large} />
              <div>

                <Button
                  onClick={onSuccessHandler}
                  sx={StyleButtonPrimary}
                >
                  {successButtonLabel}
                </Button>
              </div>
            </div>)
        }

      </div>
    </Modal >
  )
}