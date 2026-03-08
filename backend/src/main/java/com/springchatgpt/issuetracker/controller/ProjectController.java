package com.springchatgpt.issuetracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springchatgpt.issuetracker.entity.Project;
import com.springchatgpt.issuetracker.service.ProjectService;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService){
        this.projectService = projectService;
    }

    // CREATE PROJECT
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project){

        Project created = projectService.create(project);

        return ResponseEntity
                .status(201)
                .body(created);
    }

    // GET ALL PROJECTS
    @GetMapping
    public ResponseEntity<List<Project>> getProjects(){

        return ResponseEntity.ok(
                projectService.getAll()
        );
    }

    // GET PROJECT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id){

        return ResponseEntity.ok(
                projectService.getById(id)
        );
    }

    // DELETE PROJECT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id){

        projectService.delete(id);

        return ResponseEntity.noContent().build();
    }
}