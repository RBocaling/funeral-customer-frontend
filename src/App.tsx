import { Routes, Route } from "react-router-dom";

// public
import { Login, Register } from "./pages/public/index";

// private
import {
  Booking,
  Dashboard,
  Messages,
  OnlineBurial,
  Services,
  FamilyMembers,
} from "./pages/private/index";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import FuneralService from "./pages/private/funeral-service";
import FeneralBooking from "./pages/private/FuneralBooking";
import Test from "./pages/private/Test";
import Profile from "./pages/private/Profile";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/online-burial" element={<OnlineBurial />} />
          <Route path="/services" element={<Services />} />
          <Route path="/family-members" element={<FamilyMembers />} />
          <Route path="/family-members" element={<FamilyMembers />} />
          <Route path="/funeral-service" element={<FuneralService />} />
          <Route path="/funeral-booking" element={<FeneralBooking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
