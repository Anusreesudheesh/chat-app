// import React, { useState } from "react";
// import axios from "axios";
// import { useToast } from "@chakra-ui/toast";
// import ChatLoading from "./ChatLoading";
// import UserListItem from "./userAvatar/UserListItem";
// import { Input } from "@chakra-ui/input";
// import { Spinner } from "@chakra-ui/spinner";
// import { useDisclosure } from "@chakra-ui/hooks";
// import { Avatar } from "@chakra-ui/avatar";
// import {
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   MenuList,
// } from "@chakra-ui/menu";
// import {
//   Drawer,
//   DrawerBody,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
// } from "@chakra-ui/modal";
// import { Button, Tooltip, Box, Text } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
// import { ChatState } from "../Context/chatProvider";

// const SideDrawer = () => {
//   const toast = useToast();
//   const navigate = useNavigate();
//   const { user,setSelectedChat,chats,setChats } = ChatState();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const [search, setSearch] = useState("");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [searchedUsers, setSearchedUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState(false);

//   // Logout handler
//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo");
//     navigate("/");
//   };

//   // Handle search functionality
//   const handleSearch = async () => {
//     if (!search) {
//       toast({
//         title: "Please enter something in search",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top-left",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get(`/api/user?search=${search}`, config);

//       // Update states with backend response
//     console.log(data.searchedUsers);
//     console.log(onlineUsers);
//       setOnlineUsers(data.onlineUsers);
//       setSearchedUsers(data.searchedUsers);
//       setLoading(false);
//     } catch (error) {
//       toast({
//         title: "Error occurred!",
//         description: "Failed to load search results",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const accessChat = async (userId) => {
//     console.log(userId);

//     try {
//       setLoadingChat(true);
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.post('/api/chat', { userId }, config);

//       if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
//       setSelectedChat(data);
//       setLoadingChat(false);
//       onClose();
//     } catch (error) {
//       toast({
//         title: "Error fetching the chat",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   // Reset search
//   // const resetSearch = () => {
//   //   setSearch("");
//   //   setSearchedUsers([]);
//   // };

//   return (
//     <>
//       <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px" borderWidth="5px">
//         <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
//           <Button variant="ghost" onClick={onOpen}>
//             <i className="fas fa-search"></i>
//             <Text display={{ base: "none", md: "flex" }} px={4}>
//               Search User
//             </Text>
//           </Button>
//         </Tooltip>
//         <Text fontSize="2xl" fontFamily="Work sans">Talk-A-Tive</Text>
//         <div>
//           <Menu>
//             <MenuButton p={1}>
//               <BellIcon fontSize="2xl" m={1} />
//             </MenuButton>
//           </Menu>
//           <Menu>
//             <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
//               <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
//             </MenuButton>
//             <MenuList>
//               <MenuItem>My Profile</MenuItem>
//               <MenuDivider />
//               <MenuItem onClick={logoutHandler}>Logout</MenuItem>
//             </MenuList>
//           </Menu>
//         </div>
//       </Box>

//       <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
//           <DrawerBody>
//             <Box display="flex" pb={2}>
//               <Input
//                 placeholder="Search by name or email"
//                 mr={2}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <Button onClick={handleSearch}>Go</Button>
//               {/* {search && <Button onClick={resetSearch} ml={2}>Clear</Button>} */}
//             </Box>
//             {loading ? (
//               <ChatLoading />
//             ) : search ? (
//               searchedUsers?.length > 0 ? (
//                 searchedUsers.map((user) => (
//                   <UserListItem key={user._id} user={user}  handleFunction={() => accessChat(user._id)}/>
//                 ))
//               ) : (
//                 <Text>No users found for this search.</Text>
//               )
//             ) : (
//               onlineUsers?.length > 0 ? (
//                 onlineUsers.map((user) => (
//                   <UserListItem key={user._id} user={user}  handleFunction={() => accessChat(user._id)} />
//                 ))
//               ) : (
//                 <Text>No online users</Text>
//               )
//             )}
//             {/* {loadingChat&& <Spinner ml='auto' display='flex'/>} */}
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// };

// export default SideDrawer;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../config/ChatLogics";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "./ChatLoading";
import UserListItem from "./userAvatar/UserListItem";
import { Input } from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/spinner";
import { useDisclosure } from "@chakra-ui/hooks";
import { Avatar } from "@chakra-ui/avatar";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Button, Tooltip, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/chatProvider";

const SideDrawer = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user, setSelectedChat, chats, setChats ,notification,setNotification} = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  // Fetch online users on component mount
  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        // Fetch users (online users will be included in the response)
        const { data } = await axios.get(`/api/user`, config);

        setOnlineUsers(data.onlineUsers); // Set online users
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error occurred!",
          description: "Failed to load online users",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    fetchOnlineUsers();
  }, [user.token, toast]);

  // Handle search functionality
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setOnlineUsers(data.onlineUsers); // Update online users if needed
      setSearchedUsers(data.searchedUsers);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Real-Time-Chat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
              />

            
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {`New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : searchedUsers.length > 0 ? (
              searchedUsers.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : onlineUsers.length > 0 ? (
              onlineUsers.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : (
              <Text>No online users</Text>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
