import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import IssueListPage from "./pages/IssueListPage";
import IssueDetailsPage from "./pages/IssueDetailsPage";
import UsersPage from "./pages/UsersPage";
import DashboardPage from "./pages/DashboardPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const location = useLocation();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hide standard Navbar on landing page as it has its own
  const isLandingPage = location.pathname === "/home" || location.pathname === "/";
  const showNavbar = !isLandingPage && (["/login", "/register"].includes(location.pathname) || !user);
  const showSidebar = !showNavbar && !isLandingPage;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {showNavbar && <Navbar />}

      <div className="flex flex-grow">
        {showSidebar && (
          <ProtectedRoute>
            <Sidebar
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen((current) => !current)}
              onClose={() => setIsSidebarOpen(false)}
            />
          </ProtectedRoute>
        )}

        <main
          className={`flex-grow transition-[margin] duration-300 ${
            showSidebar && isSidebarOpen ? "lg:ml-72" : "ml-0"
          }`}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
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
              path="/users"
              element={
                <ProtectedRoute>
                  <DashboardPage>
                    <UsersPage />
                  </DashboardPage>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
