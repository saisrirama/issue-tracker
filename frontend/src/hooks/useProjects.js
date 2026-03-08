import { useEffect, useState } from "react"
import { getProjects } from "../api/projectApi"

export function useProjects() {

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {

    try {

      const data = await getProjects()

      setProjects(data)

    } catch(error) {

      console.error("Failed to load projects")

    } finally {

      setLoading(false)

    }

  }

  return {
    projects,
    loading,
    setProjects
  }
}