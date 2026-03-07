package com.springchatgpt.issuetracker.dto;

public class IssueResponseDTO {
    private Long id;
    private Long projectId;
    private String projectName;
    private Long assigneeId;
    private String assigneeName;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getProjectId() {
        return projectId;
    }
    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
    public String getProjectName() {
        return projectName;
    }
    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
    public Long getAssigneeId() {
        return assigneeId;
    }
    public void setAssigneeId(Long assigneeId) {
        this.assigneeId = assigneeId;
    }
    public String getAssigneeName() {
        return assigneeName;
    }
    public void setAssigneeName(String assigneeName) {
        this.assigneeName = assigneeName;
    }
}
