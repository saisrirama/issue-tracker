package com.springchatgpt.issuetracker.dto;

import jakarta.validation.constraints.NotBlank;

public class ProjectRequestDTO {
    @NotBlank(message = "Project name cannot be empty")
    private String name;

    public ProjectRequestDTO() {}

    public ProjectRequestDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
