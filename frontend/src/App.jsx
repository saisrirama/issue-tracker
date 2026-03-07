import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import LoginPage from "./pages/LoginPage"
import ProjectsPage from "./pages/ProjectsPage"
import ProjectDetailsPage from "./pages/ProjectDetailsPage"
import IssueDetailsPage from "./pages/IssueDetailsPage"

import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
  return (
    <div>

      <Navbar />

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues/:issueId"
          element={
            <ProtectedRoute>
              <IssueDetailsPage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  )
}

export default App