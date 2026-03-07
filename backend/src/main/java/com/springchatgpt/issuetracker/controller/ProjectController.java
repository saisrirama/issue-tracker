package com.springchatgpt.issuetracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springchatgpt.issuetracker.entity.Project;
import com.springchatgpt.issuetracker.service.ProjectService;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService){
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestBody Project project){

        return ResponseEntity
                .status(201)
                .body(projectService.create(project));
    }

    @GetMapping
    public List<Project> getProjects(){
        return projectService.getAll();
    }
}
