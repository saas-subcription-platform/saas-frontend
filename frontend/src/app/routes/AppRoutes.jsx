 import { Routes, Route } from "react-router-dom";
 import LandingPage from "../../features/landing/pages/landingPage";
 import DashboardPage from "../../features/Admin/pages/DashboardPage";
 import SubscriptionsPage from "../../features/Admin/pages/SubscriptionsPage";
 import RenewalPage from "../../features/Admin/pages/RenewalPage";  
 import SettingsPage from "../../features/Admin/pages/SettingsPage";
 function AppRoutes(){
    return (
       <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path="/admin/dashboard" element={<DashboardPage/>}/>
                 <Route path="/admin/subscriptions"element={<SubscriptionsPage/>}/>
                 <Route path="/admin/renewal"element={<RenewalPage />}/>
                  <Route path="/admin/settings"element={<SettingsPage/>}/>
          
        </Routes>
    );
 }

export default AppRoutes;





