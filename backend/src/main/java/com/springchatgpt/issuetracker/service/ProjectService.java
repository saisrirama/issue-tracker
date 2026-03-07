package com.springchatgpt.issuetracker.service;

import com.springchatgpt.issuetracker.entity.Project;
import com.springchatgpt.issuetracker.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    // Create Project
    public Project create(Project project){
        return projectRepository.save(project);
    }

    // Get All Projects
    public List<Project> getAll(){
        return projectRepository.findAll();
    }

    // Get Project By Id
    public Project getById(Long id){
        return projectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));
    }

    // Delete Project
    public void delete(Long id){
        Project project = getById(id);
        projectRepository.delete(project);
    }
}