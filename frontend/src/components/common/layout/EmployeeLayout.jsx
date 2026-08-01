import { useEffect, useState } from "react";
import EmployeeTopBar from "./EmployeeTopBar";
import { getCurrentUser } from "../../../features/employee/services/userService";
import { CurrentUserProvider } from "../context/CurrentUserContext";

const EmployeeLayout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser();
        setCurrentUser(data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <CurrentUserProvider value={currentUser}>
      <div className="min-h-screen bg-background">
        <EmployeeTopBar />

        <main className="p-8">{children}</main>
      </div>
    </CurrentUserProvider>
  );
};

export default EmployeeLayout;