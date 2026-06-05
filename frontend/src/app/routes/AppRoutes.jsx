import { Routes, Route } from "react-router-dom";
import LandingPage from "../../features/landing/pages/landingPage";
import DashboardPage from "../../features/Admin/pages/DashboardPage";

function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/admin/dashboard" element={<DashboardPage/>}/>
        </Routes>
    )
}

export default AppRoutes;