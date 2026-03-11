package com.springchatgpt.issuetracker.controller;

import java.util.List;

import com.springchatgpt.issuetracker.dto.ProjectRequestDTO;
import com.springchatgpt.issuetracker.dto.ProjectResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springchatgpt.issuetracker.service.ProjectService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService){
        this.projectService = projectService;
    }

    // CREATE PROJECT
    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(@Valid @RequestBody ProjectRequestDTO request){

        ProjectResponseDTO created = projectService.create(request);

        return ResponseEntity
                .status(201)
                .body(created);
    }

    // GET ALL PROJECTS
    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getProjects(){

        return ResponseEntity.ok(
                projectService.getAll()
        );
    }

    // GET PROJECT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProject(@PathVariable Long id){

        return ResponseEntity.ok(
                projectService.getProjectResponseById(id)
        );
    }

    // UPDATE PROJECT
    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectRequestDTO request){

        ProjectResponseDTO updated = projectService.updateProject(id, request);

        return ResponseEntity.ok(updated);
    }

    // DELETE PROJECT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id){

        projectService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
