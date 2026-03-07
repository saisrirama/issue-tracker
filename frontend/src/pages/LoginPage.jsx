import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email)

    navigate("/projects")
  }

  return (
    <div className="p-8 max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          className="border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>

      </form>
    </div>
  )
}

export default LoginPage