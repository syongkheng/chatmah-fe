import React, { ChangeEvent } from "react";
import Header from "../components/header/Header";
import GptPromptTextInput from '../components/inputs/GptPromptTextInput';
import MessageCard from '../components/message/MessageCard';
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import { FlexDirectionColumn, FlexDirectionRow, FullWidthBox, HorizontalCenter, VerticalCenter } from '../components/styled/alignment/AlignmentComponents';
import { ChatBackdrop, InteractionBackdrop } from '../components/styled/backdrops/BackdropComponents';
import { StyledPage } from '../components/styled/pages/StyledPage';
import { StyledPromptTypography, StyledText } from '../components/styled/typography/Typography';
import CodeTableConstants from '../constants/CodeTableConstants';
import CopywritingConstants from '../constants/PageConstants';
import { defaultHomePageCopywriting, IHomePageCopywriting } from '../copywriting/interfaces/IHomePage';
import { Locale, StorageKeys } from "../enums";
import { useCopywritingFromFile } from '../hooks/useCopywritingFromFile';
import { ICodeTable } from '../models/ICodeTable';
import { IConversationMessage } from "../models/IConversationMessage";
import { defaultMessagePayload, IMessagePayload } from "../models/IMessagePayload";
import { retrieveCodeTable } from '../requests/retrieveCodeTable';
import { retrieveMessages } from '../requests/retrieveMessages';
import { submitPrompt } from '../requests/submitPrompt';
import { AppStorageUtil } from "../utils/AppStorageUtil";
import { SortUtil } from '../utils/SortUtil';
import { AppConstants } from "../constants/AppConstants";

interface IHomePageCodeTableResult {
  ddl_translation: ICodeTable[],
}

const HomePage = () => {
  const RETRIEVE_MESSAGE_OFFSET = AppConstants.getOffset();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);
  const [messages, setMessages] = React.useState<IConversationMessage[]>([]);
  const [payload, setPayload] = React.useState<IMessagePayload>(defaultMessagePayload);
  const [copywriting, setCopywriting] = React.useState<IHomePageCopywriting>(defaultHomePageCopywriting);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [codeTableResult, setCodeTableResult] = React.useState<IHomePageCodeTableResult>({
    ddl_translation: [],
  })
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState<number>(RETRIEVE_MESSAGE_OFFSET);
  const [isLastPage, setIsLastPage] = React.useState<boolean>(false);


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
  };

  const handleSendRequest = async (_payload: IMessagePayload = payload) => {
    if (_payload?.message?.length === 0 || _payload?.message === null || _payload?.message === undefined) {
      return;
    };
    await setIsLoading(true);
    await submitPrompt(_payload);
    setPayload({ message: '' })
    const messages = await retrieveMessages();
    setMessages(messages?.contents);
    if (backdropRef.current && messages?.contents?.length === RETRIEVE_MESSAGE_OFFSET) {
      backdropRef.current.scrollTop = backdropRef.current.scrollHeight;
    }
    await retrieveMessages();
    setIsLoading(false);
  };

  const handleScroll = async () => {
    if (backdropRef.current && backdropRef.current.scrollTop === 0 && !isLoading) {
      setIsLoading(true);

      if (!isLastPage) {
        setOffset((prevOffset) => prevOffset + RETRIEVE_MESSAGE_OFFSET); // Increment the offset
        const response = await retrieveMessages(offset);
        const newMessages = response.contents;
        const sortedWholeArray = SortUtil.sortArrayByKeys([...newMessages, ...messages], ['createdDt', 'isSender'], ['asc', 'desc'])
        setMessages(sortedWholeArray); // Prepend new messages
        setIsLastPage(response.isLast);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header setLocale={setLocale} />
      <StyledPage $horizontalCenter $verticalCenter>
        <InteractionBackdrop>
          <FlexDirectionColumn $fullHeight>
            {
              messages?.length === 0 && (
                <VerticalCenter>
                  <HorizontalCenter>
                    <FlexDirectionColumn>
                      <StyledPromptTypography>{copywriting.banner.primary}</StyledPromptTypography>
                      <GptPromptTextInput
                        handleTextChange={handleTextChange}
                        handleSendRequest={handleSendRequest}
                        isLoading={isLoading}
                        placeholderText={copywriting.inputLabel.prompt}
                        payload={payload}
                      />
                    </FlexDirectionColumn>
                  </HorizontalCenter>
                </VerticalCenter>
              )
            }
            {
              messages?.length > 0 && (
                <>
                  <ChatBackdrop ref={backdropRef} onScroll={handleScroll}>
                    {
                      isLastPage && (
                        <HorizontalCenter>
                          <StyledText $fontSize="12px" color="#EFEFEF">
                            {copywriting?.banner?.noMoreMessages}
                          </StyledText>
                        </HorizontalCenter>
                      )
                    }
                    {
                      SortUtil.sortArrayByKeys(messages, ['createdDt', 'isSender'], ['asc', 'desc'])
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
                  <FullWidthBox>
                    <FlexDirectionRow>
                      <GptPromptTextInput
                        handleTextChange={handleTextChange}
                        handleSendRequest={handleSendRequest}
                        isLoading={isLoading}
                        placeholderText={copywriting.inputLabel.prompt}
                        payload={payload}
                      />
                    </FlexDirectionRow>
                  </FullWidthBox>
                </>
              )
            }

          </FlexDirectionColumn>
        </InteractionBackdrop>
        <SquareSpacing spacing={SpacingSize.Small} />
      </StyledPage>
    </>
  );
}

export default HomePage;