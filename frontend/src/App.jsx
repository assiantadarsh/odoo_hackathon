import History from "./pages/History";
import Signup from "./pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterAsset from "./pages/RegisterAsset";
import NewBooking from "./pages/NewBooking";
import NewMaintenance from "./pages/NewMaintenance";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assets/new" element={<RegisterAsset />} />
        <Route path="/bookings/new" element={<NewBooking />} />
        <Route path="/maintenance/new" element={<NewMaintenance />} />
        <Route path="/history/:type" element={<History />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;