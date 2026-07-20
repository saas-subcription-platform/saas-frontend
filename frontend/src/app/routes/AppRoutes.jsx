import { Routes, Route } from "react-router-dom";

// Landing
import LandingPage from "../../features/landing/pages/LandingPage";
import PlanConfigurationPage from "../../features/landing/pages/PlanConfigurationPage";
import CheckoutPage from "../../features/landing/pages/CheckoutPage";
import PaymentSuccessPage from "../../features/landing/pages/PaymentSuccessPage";

// Admin
import {
    DashboardPage,
    AdminHomePage,
    UsersPage,
    UserDetailsPage,
    AddUserPage,
    EditUserPage,
    CompanyProfilePage,
    EditCompanyPage,
    SettingsPage,
    SubscriptionsPage,
    RenewalPage,
    PaymentsPage,
    InvoicesPage,
    NotificationsPage,
    HelpPage,
} from "../../features/Admin";

// Auth
import LoginPage from "../../features/Auth/pages/LoginPage";
import RegisterPage from "../../features/Auth/pages/RegisterPage";
import ForgotPasswordPage from "../../features/Auth/pages/ForgotPasswordPage";
import EmailSentPage from "../../features/Auth/pages/EmailSentPage";
import ResetPasswordPage from "../../features/Auth/pages/ResetPasswordPage";
import ResetPasswordSuccessPage from "../../features/Auth/pages/ResetPasswordSuccessPage";


import EmployeeHomePage from "../../features/Employee/EmpDashboard"


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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/email-sent" element={<EmailSentPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
                path="/password-reset-success"
                element={<ResetPasswordSuccessPage />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/help" element={<HelpPage/>}/>
            <Route path="/admin/payments" element={<PaymentsPage/>}/>
            <Route path="/admin/invoices" element={<InvoicesPage/>}/>
            <Route path="/admin/home" element={<AdminHomePage/>}/>

            <Route path="/employee/home" element={<EmployeeHomePage/>}/>
    </Routes>
  );
}

export default AppRoutes;
