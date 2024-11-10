import React from "react";
import axios from "axios";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { ChatState } from "../Context/chatProvider";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
const ChatPage = () => {
  
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h={"91.5vh"}
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
};

export default ChatPage;
