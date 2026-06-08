import { Routes, Route } from "react-router-dom";
import LandingPage from "../../features/landing/pages/landingPage";
import DashboardPage from "../../features/Admin/pages/DashboardPage";
import UsersPage from "../../features/Admin/pages/UsersPage";
import UserDetailsPage from "../../features/Admin/pages/UserDetailsPage";
import NotificationsPage from "../../features/Admin/pages/NotificationsPage";
import PlanConfigurationPage from "../../features/landing/pages/PlanConfigurationPage";
import CheckoutPage from "../../features/landing/pages/CheckoutPage";
import PaymentSuccessPage from "../../features/landing/pages/PaymentSuccessPage";
import CompanyProfilePage from "../../features/Admin/pages/CompanyProfilePage";
import EditUserPage from "../../features/Admin/pages/EditUserPage";
import AddUserPage from "../../features/Admin/pages/AddUserPage";
import EditCompanyPage from "../../features/Admin/pages/EditCompanyPage";
import SubscriptionsPage from "../../features/Admin/pages/SubscriptionsPage";
import RenewalPage from "../../features/Admin/pages/RenewalPage";
import SettingsPage from "../../features/Admin/pages/SettingsPage";
import HelpPage from "../../features/Admin/pages/HelpPage";
import LoginPage from "../../features/Admin/pages/LoginPage";
import ForgotPasswordPage from "../../features/Admin/pages/ForgotPasswordPage";
import EmailSentPage from "../../features/Admin/pages/EmailSentPage";
import ResetPasswordPage from "../../features/Admin/pages/ResetPasswordPage";
import ResetPasswordSuccessPage from "../../features/Admin/pages/ResetPasswordSuccessPage";
import RegisterPage from "../../features/Admin/pages/RegisterPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/checkout" element={<PlanConfigurationPage />} />
            <Route path="/payment" element={<CheckoutPage/>} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/admin/renewal" element={<RenewalPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/users/add" element={<AddUserPage />} />
            <Route path="/admin/users/:id" element={<UserDetailsPage />} />
            <Route path="/admin/notifications" element={<NotificationsPage />} />
            <Route path="/admin/company" element={<CompanyProfilePage />} />
            <Route path="/admin/company/edit" element={<EditCompanyPage />} />
            <Route path="/admin/users/edit/:id" element={<EditUserPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/admin/email-sent" element={<EmailSentPage />} />
            <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
            <Route
                path="/admin/password-reset-success"
                element={<ResetPasswordSuccessPage />}
            />
            <Route path="/admin/register" element={<RegisterPage />} />
            <Route path="/admin/help" element={<HelpPage/>}/>
    </Routes>
  );
}

export default AppRoutes;
