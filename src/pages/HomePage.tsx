import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MenuIcon from '@mui/icons-material/Menu';
import { InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import SideDrawerComponent from "../components/drawer/SideDrawerComponent";
import Header from "../components/header/Header";
import LoadingComponent from "../components/loader/LoadingComponent";
import MessageCard from '../components/message/MessageCard';
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
import styled from 'styled-components';

interface IHomePageCodeTableResult {
  ddl_translation: ICodeTable[],
}

const HomePage = () => {
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);
  const [messages, setMessages] = React.useState<IConversationMessage[]>([]);
  const [payload, setPayload] = React.useState<IMessagePayload>(defaultMessagePayload);
  const [copywriting, setCopywriting] = React.useState<IHomePageCopywriting>(defaultHomePageCopywriting);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
    await setIsLoading(true);
    await submitPrompt(_payload);
    setPayload({ message: '' })
    const messages = await retrieveMessages();
    setMessages(messages);
    await retrieveMessages();
    setIsLoading(false);
  }

  const openSideDrawer = () => setShowDrawer(true);

  const ChatBackdrop = styled.div`
  height: 100%;
  overflow: auto;

  /* WebKit scrollbar styles */
  &::-webkit-scrollbar {
    width: 12px; /* for vertical scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* Track color changed to transparent */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Handle color */
    border-radius: 6px; /* Rounded corners */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker handle on hover */
  }

  /* Firefox scrollbar styles */
  scrollbar-width: thin; /* Options: auto, thin, none */
  scrollbar-color: #888 transparent; /* Handle color and track color changed to transparent */
`;


  return (
    <>
      <Header setLocale={setLocale} />
      <div className='page hc vc'>
        <div className='content-container fdc maxw'>
          {/* <div>
            <SquareSpacing spacing={SpacingSize.Small} />
            <div className="top fdr jc-sb">
              <div className="fdr" onClick={() => openSideDrawer()}>
                <SquareSpacing spacing={SpacingSize.Small} />
                <MenuIcon className='clickable' />
              </div>
              {copywriting?.banner?.assistant}
              <div className="fdr">
                <SquareSpacing spacing={SpacingSize.Small} />
              </div>
            </div>
            <SquareSpacing spacing={SpacingSize.Small} />
          </div> */}
          <ChatBackdrop>
            {
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
          </ChatBackdrop>
          <div>
            <div className="fw hc fdr">
              <SquareSpacing spacing={SpacingSize.Small} />
              <TextField
                id="message"
                className="bg-white"
                size="small"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                autoComplete="off"
                placeholder={copywriting?.inputLabel?.prompt}
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