import { useEffect, useState } from "react";

import { getCurrentUser } from "../../services/userService";

import {
  getOrCreateConversation,
  getMessages,
  sendMessage as sendMessageApi,
} from "../services/conversationService";

import Sidebar from "../components/Sidebar";
import ConversationPanel from "../components/ConversationPanel";
import ConversationHeader from "../components/ConversationHeader";
import MessageArea from "../components/MessageArea";
import MessageInput from "../components/MessageInput";
import DetailsPanel from "../components/DetailsPanel";

import {
  createGeneralTeam,
  getTeams,
  getTeamMembers,
  createTeam,
  getCompanyUsers,
} from "../services/teamService";

const TeamCollaborationPage = () => {
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);

  const [messagesList, setMessagesList] = useState([]);
  const [teams, setTeams] = useState([]);
  const [companyUsers, setCompanyUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [selectedConversation, setSelectedConversation] = useState({
    id: null,
    name: "General",
    description: "Everyone in the company",
    members: [],
    type: "company",
  });

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    try {
      const current = await getCurrentUser();
      setCurrentUser(current);

      await createGeneralTeam();

      const [teamList, users] = await Promise.all([
        getTeams(),
        getCompanyUsers(),
      ]);

      setTeams(teamList);

      const filteredUsers = users.filter((u) => u.userId !== current.userId);

      setCompanyUsers(filteredUsers);

      console.log("Company Users:", filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTeamMembers = async (teamId) => {
    try {
      const members = await getTeamMembers(teamId);
      return members;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // NEW: Load a Team Conversation
  const loadTeamConversation = async (team) => {
    setShowDetails(false);
    try {
      const members = await getTeamMembers(team.teamId);

      setConversationId(team.conversationId);

      const msgs = await getMessages(team.conversationId);

      setMessagesList(msgs);

      setSelectedConversation({
        id: team.teamId,
        conversationId: team.conversationId,
        name: team.name,
        description: team.description,
        members,
        type: "team",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadConversation = async (user) => {
    setShowDetails(false);
    console.log("loadConversation received:", user);

    try {
      const conversation = await getOrCreateConversation(user.userId);

      console.log("Conversation:", conversation);

      setConversationId(conversation.conversationId);

      const msgs = await getMessages(conversation.conversationId);

      console.log("Messages:", msgs);

      setMessagesList(msgs);

      setSelectedConversation({
        id: user.userId,
        conversationId: conversation.conversationId,
        name: `${user.firstName} ${user.lastName}`,
        members: [user],
        type: "user",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTeam = async (teamData) => {
    try {
      const createdTeam = await createTeam(teamData);

      const updatedTeams = await getTeams();
      setTeams(updatedTeams);

      const members = await getTeamMembers(createdTeam.teamId);

      setConversationId(createdTeam.conversationId);

      const msgs = await getMessages(createdTeam.conversationId);

      setMessagesList(msgs);

      setSelectedConversation({
        id: createdTeam.teamId,
        conversationId: createdTeam.conversationId,
        name: createdTeam.name,
        description: createdTeam.description,
        members,
        type: "team",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !conversationId) return;

    try {
      await sendMessageApi({
        conversationId,
        content: message,
      });

      const msgs = await getMessages(conversationId);

      setMessagesList(msgs);

      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar currentUser={currentUser} />

      <ConversationPanel
        currentUser={currentUser}
        teams={teams}
        users={companyUsers}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        loadTeamMembers={loadTeamMembers}
        loadTeamConversation={loadTeamConversation}
        onCreateTeam={handleCreateTeam}
        loadConversation={loadConversation}
      />

      <div className="flex flex-col flex-1">
        <ConversationHeader
          conversation={selectedConversation}
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails((prev) => !prev)}
        />

        <MessageArea
          messages={messagesList}
          currentUser={currentUser}
          conversation={selectedConversation}
          companyUsers={[currentUser, ...companyUsers].filter(Boolean)}
        />

        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>

      <DetailsPanel
        conversation={selectedConversation}
        showDetails={showDetails}
      />
    </div>
  );
};

export default TeamCollaborationPage;
