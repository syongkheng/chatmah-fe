import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import { InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import SideDrawerComponent from "../components/drawer/SideDrawerComponent";
import Header from "../components/header/Header";
import LoadingComponent from "../components/loader/LoadingComponent";
import MessageCard from '../components/message/MessageCard';
import PromptCardComponent from "../components/prompt/PromptCardComponent";
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import CodeTableConstants from '../constants/CodeTableConstants';
import CopywritingConstants from '../constants/PageConstants';
import { defaultHomePageCopywriting, IHomePageCopywriting } from '../copywriting/interfaces/IHomePage';
import "../css/HomePage.css";
import { Locale, StorageKeys } from "../enums";
import { useCopywritingFromFile } from '../hooks/useCopywritingFromFile';
import { ICodeTable } from '../models/ICodeTable';
import { IConversationMessage } from "../models/IConversationMessage";
import { defaultMessagePayload, IMessagePayload } from "../models/IMessagePayload";
import { retrieveCodeTable } from '../requests/retrieveCodeTable';
import { retrieveMessages } from '../requests/retrieveMessages';
import { submitPrompt } from '../requests/submitPrompt';
import { AppStorageUtil } from "../utils/AppStorageUtil";

interface IHomePageCodeTableResult {
  ddl_translation: ICodeTable[],
}

const HomePage = () => {
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);
  const [messages, setMessages] = React.useState<IConversationMessage[]>([]);
  const [payload, setPayload] = React.useState<IMessagePayload>(defaultMessagePayload);
  const [copywriting, setCopywriting] = React.useState<IHomePageCopywriting>(defaultHomePageCopywriting);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [displayPrompt, setDisplayPrompt] = React.useState<boolean>(true);
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [codeTableResult, setCodeTableResult] = React.useState<IHomePageCodeTableResult>({
    ddl_translation: [],
  })

  React.useEffect(() => {
    useCopywritingFromFile<IHomePageCopywriting>(locale, CopywritingConstants.PAGES.HOME).then(setCopywriting);
  }, [locale]);

  React.useEffect(() => {
    const codeTables = async () => {
      return retrieveCodeTable(CodeTableConstants.MESSAGE_CARD_TRANSLATION).then((res) => {
        setCodeTableResult({
          ...codeTableResult,
          ddl_translation: res as ICodeTable[],
        });
      });
    }
    codeTables();
  }, [])

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPayload((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }))
  }

  const handleSendRequest = async (_payload: IMessagePayload = payload) => {
    if (_payload?.message?.length === 0 || _payload?.message === null || _payload?.message === undefined) {
      return;
    }
    setDisplayPrompt(false);
    await setIsLoading(true);
    await submitPrompt(_payload);
    setPayload({ message: '' })
    const messages = await retrieveMessages();
    setMessages(messages);
    await retrieveMessages();
    setIsLoading(false);
  }

  const openSideDrawer = () => setShowDrawer(true);

  return (
    <>
      <Header setLocale={setLocale} />
      <div className='page-container hc vc'>
        <div className='content-container fdc maxw'>
          <div>
            <SquareSpacing spacing={SpacingSize.Small} />
            <div className="top fdr jc-sb">
              <div className="fdr" onClick={() => openSideDrawer()}>
                <SquareSpacing spacing={SpacingSize.Small} />
                <MenuIcon className='clickable' />
              </div>
              {copywriting?.banner?.assistant}
              <div className="fdr">
                {/* <AddIcon /> */}
                <SquareSpacing spacing={SpacingSize.Small} />
              </div>
            </div>
            <SquareSpacing spacing={SpacingSize.Small} />
          </div>
          <div className="fit-parent hc vc fdc response-container">
            {
              displayPrompt
                ?
                <div>
                  <PromptCardComponent
                    icon={<LocalShippingIcon />}
                    content={copywriting?.promptTrip?.label}
                    onClickHandler={handleSendRequest}
                  />
                  <br />
                  <PromptCardComponent
                    icon={<LocalShippingIcon />}
                    content={copywriting?.promptLearn?.label}
                    onClickHandler={handleSendRequest}
                  />
                </div>
                :
                messages.length > 0 && messages?.sort((a: IConversationMessage, b: IConversationMessage) => new Date(a.createdDt).getTime() - new Date(b.createdDt).getTime())
                  .map((msg, index) => {
                    return (
                      <React.Fragment key={index}>
                        <MessageCard
                          createdDt={msg.createdDt}
                          content={msg.content}
                          isSender={msg.isSender}
                          translationCodeTable={codeTableResult?.ddl_translation}
                        />
                      </React.Fragment>
                    )
                  })
            }
          </div>
          <div>
            <div className="fw hc fdr">
              <SquareSpacing spacing={SpacingSize.Small} />
              <TextField
                id="message"
                className="bg-white"
                size="small"
                label={copywriting?.inputLabel?.prompt}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" >
                      {
                        isLoading
                          ? <LoadingComponent show={isLoading} /> :
                          <div className='fw fh vc hc clickable' onClick={() => handleSendRequest()}>
                            <KeyboardReturnIcon className="charcoal" />
                          </div>
                      }
                    </InputAdornment>
                  )
                }}
                value={payload.message}
                multiline
                fullWidth
              />
              <SquareSpacing spacing={SpacingSize.Small} />
            </div>
          </div>
          <SquareSpacing spacing={SpacingSize.Small} />
        </div>
      </div>
      <SideDrawerComponent
        isOpen={showDrawer}
        toggleDrawer={setShowDrawer}
      />
    </>
  );
}

export default HomePage;