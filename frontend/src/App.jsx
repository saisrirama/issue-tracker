import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import IssueListPage from "./pages/IssueListPage";
import IssueDetailsPage from "./pages/IssueDetailsPage";
import MyIssuesPage from "./pages/MyIssuesPage";
import DashboardPage from "./pages/DashboardPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const location = useLocation();
  const { user } = useAuth();
  const showNavbar = ["/home", "/login", "/register"].includes(location.pathname) || !user;

  return (
    <div className="flex">
      {showNavbar && <Navbar />}
      {!showNavbar && (
        <ProtectedRoute>
          <Sidebar />
        </ProtectedRoute>
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage>
                  <ProjectsPage />
                </DashboardPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <DashboardPage>
                  <ProjectsPage />
                </DashboardPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <ProtectedRoute>
                <DashboardPage>
                  <ProjectDetailsPage />
                </DashboardPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/issues"
            element={
              <ProtectedRoute>
                <DashboardPage>
                  <IssueListPage />
                </DashboardPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/issues/:issueId"
            element={
              <ProtectedRoute>
                <DashboardPage>
                  <IssueDetailsPage />
                </DashboardPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-issues"
            element={
              <ProtectedRoute>
                <DashboardPage>
                  <MyIssuesPage />
                </DashboardPage>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;