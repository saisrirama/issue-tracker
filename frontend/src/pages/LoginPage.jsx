import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function LoginPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login, register } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      if (isRegisterMode) {
        await register(username, password)
      } else {
        await login(username, password)
      }
      navigate("/projects")
    } catch (error) {
      setErrorMessage(error?.response?.data?.message ?? "Authentication failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
  <div className="flex items-center justify-center min-h-screen">

    <div className="p-8 max-w-md w-full bg-white shadow-md rounded">

      <h1 className="text-2xl font-bold mb-6">
        {isRegisterMode ? "Register" : "Login"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          className="border p-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMessage && (
          <p className="text-red-600 text-sm">{errorMessage}</p>
        )}

        <button
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Please wait..."
            : isRegisterMode
              ? "Register"
              : "Login"}
        </button>

      </form>

      <button
        className="mt-4 text-blue-600 underline"
        onClick={() => setIsRegisterMode((currentMode) => !currentMode)}
      >
        {isRegisterMode
          ? "Already registered? Login"
          : "New here? Register"}
      </button>

    </div>

  </div>
)
}

export default LoginPage
