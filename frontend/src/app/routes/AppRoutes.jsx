import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

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
  InvoiceDetailsPage,
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

// Employee
import EmployeeHomePage from "../../features/Employee/EmpDashboard";
import LeavePlannerPage from "../../features/Employee/LeavePlannerModule/leavePlannerPage";
import TeamCollaborationPage from "../../features/Employee/team-collab/pages/TeamCollaborationPage";
import GoalsDashboardPage from "../../features/Employee/goals-okr/pages/GoalsDashboardPage";
import MyTimesheetPage from "../../features/Employee/EmployeeTimesheet/pages/MyTimesheetPage";
import CreateTimesheetPage from "../../features/Employee/EmployeeTimesheet/pages/CreateTimesheetPage";
import ViewTimesheetPage from "../../features/Employee/EmployeeTimesheet/pages/ViewTimesheetPage";

//payment 
import RazorpayTestPage from "../../paymentManagement/pages/RazorpayTestPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/checkout" element={<PlanConfigurationPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/email-sent" element={<EmailSentPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="/password-reset-success"
        element={<ResetPasswordSuccessPage />}
      />

      {/* Temp public route for testing */}
      <Route
        path="/razorpay-test"
        element={<RazorpayTestPage />}
      />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/payment" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/admin/renewal" element={<RenewalPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/users/add" element={<AddUserPage />} />
        <Route path="/admin/users/:id" element={<UserDetailsPage />} />
        <Route path="/admin/users/edit/:id" element={<EditUserPage />} />
        <Route path="/admin/company" element={<CompanyProfilePage />} />
        <Route path="/admin/company/edit" element={<EditCompanyPage />} />
        <Route path="/admin/notifications" element={<NotificationsPage />} />
        <Route path="/admin/payments" element={<PaymentsPage />} />
        <Route path="/admin/invoices" element={<InvoicesPage />} />
        <Route path="/admin/invoices/:id" element={<InvoiceDetailsPage />} />
        <Route path="/admin/help" element={<HelpPage />} />
      </Route>

      {/* Protected Employee Routes */}
      {/* Protected Employee Routes */}
      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="/employee/home" element={<EmployeeHomePage />} />
        <Route path="/employee/leave-planner" element={<LeavePlannerPage />} />
        <Route
          path="/employee/team-collab"
          element={<TeamCollaborationPage />}
        />
        <Route path="/employee/goals" element={<GoalsDashboardPage />} />
        <Route
          path="/employee/timesheet/history"
          element={<MyTimesheetPage />}
        />
        <Route
          path="/employee/timesheet/create"
          element={<CreateTimesheetPage />}
        />
        <Route
          path="/employee/timesheet/view/:id"
          element={<ViewTimesheetPage />}
        />
        <Route
          path="/employee/timesheet/edit/:id"
          element={<CreateTimesheetPage />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
