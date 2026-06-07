import { Routes, Route } from "react-router-dom";
import LandingPage from "../../features/landing/pages/landingPage";
import DashboardPage from "../../features/Admin/pages/DashboardPage";
import UsersPage from "../../features/Admin/pages/UsersPage";
import UserDetailsPage from "../../features/Admin/pages/UserDetailsPage";

function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/admin/dashboard" element={<DashboardPage/>}/>
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/users/:id" element={<UserDetailsPage/>} />
        </Routes>
    )
}

export default AppRoutes;

