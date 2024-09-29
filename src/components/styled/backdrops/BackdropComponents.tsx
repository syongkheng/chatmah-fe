import styled from "styled-components";

export const ChatBackdrop = styled.div`
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

export const InteractionBackdrop = styled.div`
  width: 98%;
  height: 100%;
  border-radius: 5px;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
`;