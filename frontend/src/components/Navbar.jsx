import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">
      <button onClick={() => navigate("/login")}>
        Login
      </button>

      <button onClick={() => navigate("/projects")}>
        Projects
      </button>
    </nav>
  )
}

export default Navbar