function IssueCard({ issue }) {
  return (
    <div className="border p-3 rounded">
      <h3 className="font-medium">{issue.title}</h3>
      <p>Status: {issue.status}</p>
    </div>
  )
}

export default IssueCard