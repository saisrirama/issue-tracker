package com.springchatgpt.issuetracker.service;

import com.springchatgpt.issuetracker.dto.IssueRequestDTO;
import com.springchatgpt.issuetracker.dto.IssueResponseDTO;
import com.springchatgpt.issuetracker.entity.Issue;
import com.springchatgpt.issuetracker.entity.Project;
import com.springchatgpt.issuetracker.entity.User;
import com.springchatgpt.issuetracker.exception.ResourceNotFoundException;
import com.springchatgpt.issuetracker.repository.IssueRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final ProjectService projectService;
    private final UserService userService;
    private final AuthenticatedUserService authenticatedUserService;

    public IssueService(
            IssueRepository issueRepository,
            ProjectService projectService,
            UserService userService,
            AuthenticatedUserService authenticatedUserService){

        this.issueRepository = issueRepository;
        this.projectService = projectService;
        this.userService = userService;
        this.authenticatedUserService = authenticatedUserService;
    }

    public IssueResponseDTO createIssue(IssueRequestDTO request) {

        log.info("Creating issue for projectId={}, userId={}, title={}", request.getProjectId(), request.getAssignedTo(), request.getTitle());
        Project project = projectService.getById(request.getProjectId());
        User user = request.getAssignedTo() != null ? userService.getUserById(request.getAssignedTo()) : null;

        Issue issue = new Issue();
        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setStatus(request.getStatus() != null ? request.getStatus() : "To Do");
        issue.setProject(project);
        issue.setAssignee(user);
        issue.setFeature(request.getFeature());
        issue.setPriority(request.getPriority());
        issue.setDueDate(request.getDueDate());
        issue.setTimeEstimate(request.getTimeEstimate());

        Issue saved = issueRepository.save(issue);
        log.debug("Saved issue with id={}", saved.getId());

        log.info("Returning IssueResponseDTO for issue id={}", saved.getId());
        return toResponse(saved);
    }

    public IssueResponseDTO getIssueById(Long id) {
        Issue issue = issueRepository.findByIdAndProjectOwnerEmail(id, authenticatedUserService.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));
        return toResponse(issue);
    }

    public List<IssueResponseDTO> getAllIssues(){
        return issueRepository.findByProjectOwnerEmail(authenticatedUserService.getCurrentUserEmail())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<IssueResponseDTO> getIssuesByProject(Long id){
        return issueRepository.findByProjectIdAndProjectOwnerEmail(id, authenticatedUserService.getCurrentUserEmail())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<IssueResponseDTO> getIssuesByUser(Long id){
        return issueRepository.findByAssigneeId(id)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public Page<IssueResponseDTO> getPagedIssues(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("title"));
        return issueRepository.findByProjectOwnerEmail(authenticatedUserService.getCurrentUserEmail(), pageable)
                .map(this::toResponse);
    }

    public List<IssueResponseDTO> searchIssues(String keyword) {
        return issueRepository.searchByTitle(authenticatedUserService.getCurrentUserEmail(), keyword)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public IssueResponseDTO updateIssue(Long id, IssueRequestDTO request) {
        Issue issue = issueRepository.findByIdAndProjectOwnerEmail(id, authenticatedUserService.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            issue.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            issue.setDescription(request.getDescription());
        }
        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            issue.setStatus(request.getStatus());
        }

        if (request.getProjectId() != null) {
            Project project = projectService.getById(request.getProjectId());
            issue.setProject(project);
        }

        if (request.getAssignedTo() != null) {
            User user = userService.getUserById(request.getAssignedTo());
            issue.setAssignee(user);
        }
        
        if (request.getFeature() != null) {
            issue.setFeature(request.getFeature());
        }

        if (request.getPriority() != null) {
            issue.setPriority(request.getPriority());
        }

        if (request.getDueDate() != null) {
            issue.setDueDate(request.getDueDate());
        }

        if (request.getTimeEstimate() != null) {
            issue.setTimeEstimate(request.getTimeEstimate());
        }


        Issue saved = issueRepository.save(issue);
        return toResponse(saved);
    }

    public void deleteIssue(Long id) {
        Issue issue = issueRepository.findByIdAndProjectOwnerEmail(id, authenticatedUserService.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));
        issueRepository.delete(issue);
    }

    private IssueResponseDTO toResponse(Issue issue) {
        IssueResponseDTO response = new IssueResponseDTO();
        response.setId(issue.getId());
        response.setTitle(issue.getTitle());
        response.setDescription(issue.getDescription());
        response.setStatus(issue.getStatus() != null ? issue.getStatus() : "OPEN");
        response.setFeature(issue.getFeature());
        response.setPriority(issue.getPriority());
        response.setDueDate(issue.getDueDate());
        response.setTimeEstimate(issue.getTimeEstimate());
        response.setCreatedAt(issue.getCreatedAt());
        response.setUpdatedAt(issue.getUpdatedAt());

        Project project = issue.getProject();
        if (project != null) {
            response.setProjectId(project.getId());
            response.setProjectName(project.getName());
        }

        User assignee = issue.getAssignee();
        if (assignee != null) {
            response.setAssigneeId(assignee.getId());
            response.setAssigneeName(assignee.getName());
        }

        return response;
    }
}
