import { ChangeEvent } from "react";
import { StyledTextField } from "../styled/inputs/InputComponents";
import { InputAdornment } from "@mui/material";
import { Clickable } from "../styled/ClickableComponents";
import LoadingComponent from "../loader/LoadingComponent";
import { VerticalCenter } from "../styled/alignment/AlignmentComponents";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IMessagePayload } from "../../models/IMessagePayload";

interface IGptPromptTextInput {
  handleTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSendRequest: () => void;
  isLoading: boolean;
  placeholderText: string;
  payload: IMessagePayload;
}

export default function GptPromptTextInput({
  handleTextChange,
  handleSendRequest,
  isLoading,
  placeholderText,
  payload
}: IGptPromptTextInput) {
  return (
    <StyledTextField
      id="message"
      size="medium"
      onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
      autoComplete="off"
      placeholder={placeholderText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" >
            {
              isLoading
                ?
                <LoadingComponent show={isLoading} />
                :
                <Clickable onClick={() => handleSendRequest()}>
                  <VerticalCenter>
                    <KeyboardReturnIcon className="charcoal" />
                  </VerticalCenter>
                </Clickable>
            }
          </InputAdornment>
        )
      }}
      value={payload.message}
      multiline
      fullWidth
    />
  )
}