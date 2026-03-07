import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Navbar() {

  const navigate = useNavigate()

  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">

      <button onClick={() => navigate("/projects")}>
        Projects
      </button>

      {!user && (
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      )}

      {user && (
        <button
          onClick={() => {
            logout()
            navigate("/login")
          }}
        >
          Logout
        </button>
      )}

    </nav>
  )
}

export default Navbar