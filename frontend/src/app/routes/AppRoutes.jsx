    import { Routes, Route } from "react-router-dom";
    import LandingPage from "../../features/landing/pages/landingPage";
    import DashboardPage from "../../features/Admin/pages/DashboardPage";
    import UsersPage from "../../features/Admin/pages/UsersPage";
    import UserDetailsPage from "../../features/Admin/pages/UserDetailsPage";
    import NotificationsPage from "../../features/Admin/pages/NotificationsPage";
    import CompanyProfilePage from "../../features/Admin/pages/CompanyProfilePage";
    import EditUserPage from "../../features/Admin/pages/EditUserPage";
    import AddUserPage from "../../features/Admin/pages/AddUserPage";
    import EditCompanyPage from "../../features/Admin/pages/EditCompanyPage";


    function AppRoutes(){
        return (
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/admin/dashboard" element={<DashboardPage/>}/>
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/users/add" element={<AddUserPage/>} />
                <Route path="/admin/users/:id" element={<UserDetailsPage/>} />
                <Route path="/admin/notifications" element={<NotificationsPage/>} />
                <Route path="/admin/company" element={<CompanyProfilePage/>} />
                <Route path="/admin/company/edit" element={<EditCompanyPage/>} />
                <Route path="/admin/users/edit/:id" element={<EditUserPage/>} />


            </Routes>
        )
    }

    export default AppRoutes;

