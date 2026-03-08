import { useEffect, useReducer, useState } from "react"
import { useParams } from "react-router-dom"

import { getIssues, createIssue, updateIssue, deleteIssue } from "../api/issueApi"

import IssueCard from "../components/IssueCard"

function reducer(state, action) {

  switch(action.type) {

    case "SET_ISSUES":
      return action.payload

    case "ADD_ISSUE":
      return [...state, action.payload]

    case "UPDATE_ISSUE":
      return state.map(issue =>
        issue.id === action.payload.id
          ? action.payload
          : issue
      )

    case "DELETE_ISSUE":
      return state.filter(issue => issue.id !== action.payload)

    default:
      return state
  }
}

function ProjectDetailsPage() {

  const { projectId } = useParams()

  const [issues, dispatch] = useReducer(reducer, [])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIssues()
  }, [])

  const fetchIssues = async () => {
    try {

      const data = await getIssues(projectId)

      dispatch({
        type: "SET_ISSUES",
        payload: data
      })

    } catch(error) {
      console.error("Failed to fetch issues")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    try {

      const newIssue = await createIssue(projectId, {
        title,
        description,
        status: "OPEN"
      })

      dispatch({
        type: "ADD_ISSUE",
        payload: newIssue
      })

      setTitle("")
      setDescription("")

    } catch(error) {
      console.error("Failed to create issue")
    }
  }

  const handleStatusChange = async (id, status) => {

    const newStatus =
      status === "OPEN"
        ? "IN_PROGRESS"
        : "DONE"

    try {

      const updated = await updateIssue(id, {
        status: newStatus
      })

      dispatch({
        type: "UPDATE_ISSUE",
        payload: updated
      })

    } catch(error) {
      console.error("Failed to update issue")
    }
  }

  const handleSaveIssue = async (id, payload) => {
    try {
      const updated = await updateIssue(id, payload)

      dispatch({
        type: "UPDATE_ISSUE",
        payload: updated
      })
    } catch (error) {
      console.error("Failed to update issue")
    }
  }

  const handleDeleteIssue = async (id) => {
    try {
      await deleteIssue(id)

      dispatch({
        type: "DELETE_ISSUE",
        payload: id
      })
    } catch (error) {
      console.error("Failed to delete issue")
    }
  }

  if (loading) {
    return <p className="p-6">Loading issues...</p>
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Issues
      </h1>

      {/* Create Issue */}

      <form
        onSubmit={handleCreate}
        className="mb-6 flex flex-col gap-2 max-w-xl"
      >

        <input
          className="border p-2"
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2"
          placeholder="Issue description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />

        <button className="bg-blue-500 text-white px-4 py-2 w-fit">
          Create Issue
        </button>

      </form>

      {/* Issue List */}

      <div className="grid gap-3">

        {issues.map(issue => (

          <IssueCard
            key={issue.id}
            issue={issue}
            onStatusChange={handleStatusChange}
            onSave={handleSaveIssue}
            onDelete={handleDeleteIssue}
          />

        ))}

      </div>

    </div>
  )
}

export default ProjectDetailsPage
