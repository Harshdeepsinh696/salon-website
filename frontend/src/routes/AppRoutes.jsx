import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

import LandingPage from "../pages/LandingPage";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import GalleryPage from "../pages/GalleryPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import BookAppointmentPage from "../pages/BookAppointmentPage";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import UpcomingAppointments from "../pages/customer/UpcomingAppointments";
import AppointmentHistory from "../pages/customer/AppointmentHistory";
import RescheduleAppointment from "../pages/customer/RescheduleAppointment";
import EditProfile from "../pages/customer/EditProfile";
import FavoriteServices from "../pages/customer/FavoriteServices";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import ManageAppointments from "../pages/owner/ManageAppointments";
import ManageServices from "../pages/owner/ManageServices";
import ManageCustomers from "../pages/owner/ManageCustomers";
import ManageGallery from "../pages/owner/ManageGallery";
import ManageTestimonials from "../pages/owner/ManageTestimonials";
import ManageFAQs from "../pages/owner/ManageFAQs";
import RevenueReports from "../pages/owner/RevenueReports";
import ExportAppointments from "../pages/owner/ExportAppointments";
import SiteContentSettings from "../pages/owner/SiteContentSettings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public + shared-header pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Booking is viewable by anyone, but booking itself requires login (handled inside the page) */}
        <Route path="/book" element={<BookAppointmentPage />} />

        {/* Customer dashboard — requires login */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/dashboard/upcoming" element={<UpcomingAppointments />} />
            <Route path="/dashboard/history" element={<AppointmentHistory />} />
            <Route path="/dashboard/reschedule" element={<RescheduleAppointment />} />
            <Route path="/dashboard/profile" element={<EditProfile />} />
            <Route path="/dashboard/favorites" element={<FavoriteServices />} />
          </Route>
        </Route>

        {/* Owner dashboard — requires owner role */}
        <Route element={<RoleBasedRoute role="owner" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/owner/appointments" element={<ManageAppointments />} />
            <Route path="/owner/services" element={<ManageServices />} />
            <Route path="/owner/customers" element={<ManageCustomers />} />
            <Route path="/owner/gallery" element={<ManageGallery />} />
            <Route path="/owner/testimonials" element={<ManageTestimonials />} />
            <Route path="/owner/faqs" element={<ManageFAQs />} />
            <Route path="/owner/revenue" element={<RevenueReports />} />
            <Route path="/owner/export" element={<ExportAppointments />} />
            <Route path="/owner/content" element={<SiteContentSettings />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
