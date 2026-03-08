package com.springchatgpt.issuetracker.dto;

public class IssueResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
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
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
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
