 import { Routes, Route } from "react-router-dom";
 import LandingPage from "../../features/landing/pages/landingPage";
 import DashboardPage from "../../features/Admin/pages/DashboardPage";
 import SubscriptionsPage from "../../features/Admin/pages/SubscriptionsPage";
 import RenewalPage from "../../features/Admin/pages/RenewalPage";  
 import SettingsPage from "../../features/Admin/pages/SettingsPage";
 import UsersPage from "../../features/Admin/pages/UsersPage";
import UserDetailsPage from "../../features/Admin/pages/UserDetailsPage";
import NotificationsPage from "../../features/Admin/pages/NotificationsPage";
import CompanyProfile from "../../features/Admin/pages/CompanyProfilePage";
 function AppRoutes(){
    return (
       <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/admin/dashboard" element={<DashboardPage/>}/>
                <Route path="/admin/subscriptions"element={<SubscriptionsPage/>}/>
                <Route path="/admin/renewal"element={<RenewalPage />}/>
                <Route path="/admin/settings"element={<SettingsPage/>}/>
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/users/:id" element={<UserDetailsPage/>} />
                <Route path="/admin/notifications" element={<NotificationsPage/>} />
                <Route path="/admin/company" element={<CompanyProfile/>} />
        </Routes>
    );
 }

export default AppRoutes;

