package com.springchatgpt.issuetracker.service;

import com.springchatgpt.issuetracker.dto.ProjectRequestDTO;
import com.springchatgpt.issuetracker.dto.ProjectResponseDTO;
import com.springchatgpt.issuetracker.entity.Project;
import com.springchatgpt.issuetracker.exception.ResourceNotFoundException;
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
    public ProjectResponseDTO create(ProjectRequestDTO request){
        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        return toResponse(projectRepository.save(project));
    }

    // Get All Projects
    public List<ProjectResponseDTO> getAll(){
        return projectRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    // Get Project By Id
    public Project getById(Long id){
        return projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found"));
    }

    public ProjectResponseDTO getProjectResponseById(Long id) {
        return toResponse(getById(id));
    }

    // Delete Project
    public void delete(Long id){
        Project project = getById(id);
        projectRepository.delete(project);
    }

    private ProjectResponseDTO toResponse(Project project) {
        return new ProjectResponseDTO(
                project.getId(),
                project.getName(),
                project.getDescription()
        );
    }
}
