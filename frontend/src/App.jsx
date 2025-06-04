import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import DashboardUser from "./pages/dashboard/dashboardUser";
import ReportForm from "./components/formModal";
import { ProtectedRoute } from "./components/protectedRoute";
import DashboardAdmin from "./pages/dashboard/dashboardAdmin";
import ListPhl from "./pages/dashboard/dashboardAdmin/listPhl";
import Report from "./pages/dashboard/dashboardAdmin/report";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="USER">
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route path="/lapor" element={<ReportForm />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/listphl"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <ListPhl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/report"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Report />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
