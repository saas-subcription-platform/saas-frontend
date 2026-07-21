import { useState } from "react";

import Sidebar from "../components/Sidebar";
import ConversationPanel from "../components/ConversationPanel";
import ConversationHeader from "../components/ConversationHeader";
import MessageArea from "../components/MessageArea";
import MessageInput from "../components/MessageInput";
import DetailsPanel from "../components/DetailsPanel";

import teams from "../constants/teams";
import users from "../constants/users";
import messages from "../constants/messages";

const TeamCollaborationPage = () => {
  const [message, setMessage] = useState("");

  const [selectedConversation, setSelectedConversation] = useState({
    id: "general",
    name: "General",
    description: "Everyone in the company",
    members: users,
    messages: messages.general,
    type: "company",
  });
  
  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    }),
      mine: true,
  };

  setSelectedConversation((prev) => ({
    ...prev,
    messages: [...prev.messages, newMessage],
  }));

  setMessage("");
};

  return (

    <div className="h-screen flex bg-gray-100">

      <Sidebar />

      <ConversationPanel

        teams={teams}

        users={users}

        selectedConversation={selectedConversation}

        setSelectedConversation={setSelectedConversation}

      />

      <div className="flex flex-col flex-1">

        <ConversationHeader

          conversation={selectedConversation}

        />

        <MessageArea

          conversation={selectedConversation}

        />

        <MessageInput  message={message} setMessage={setMessage} sendMessage={sendMessage} />

      </div>

      <DetailsPanel

        conversation={selectedConversation}

      />

    </div>

  );

};

export default TeamCollaborationPage;