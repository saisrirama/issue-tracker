import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import LoginPage from "./pages/LoginPage"
import ProjectsPage from "./pages/ProjectsPage"
import ProjectDetailsPage from "./pages/ProjectDetailsPage"
import IssueDetailsPage from "./pages/IssueDetailsPage"

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/projects" element={<ProjectsPage />} />

        <Route
          path="/projects/:projectId"
          element={<ProjectDetailsPage />}
        />

        <Route
          path="/issues/:issueId"
          element={<IssueDetailsPage />}
        />
      </Routes>
    </div>
  )
}

export default App