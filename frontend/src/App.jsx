import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import DashboardUser from "./pages/dashboard/dashboardUser";
import ReportForm from "./components/formModal";
import { ProtectedRoute } from "./components/protectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRole="USER">
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route path="/lapor" element={<ReportForm />} />
      </Routes>
    </Router>
  );
}

export default App;
