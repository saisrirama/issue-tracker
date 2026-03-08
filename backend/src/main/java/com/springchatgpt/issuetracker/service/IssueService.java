package com.springchatgpt.issuetracker.service;

import com.springchatgpt.issuetracker.dto.IssueRequestDTO;
import com.springchatgpt.issuetracker.dto.IssueResponseDTO;
import com.springchatgpt.issuetracker.entity.Issue;
import com.springchatgpt.issuetracker.entity.Project;
import com.springchatgpt.issuetracker.entity.User;
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

    public IssueService(
            IssueRepository issueRepository,
            ProjectService projectService,
            UserService userService){

        this.issueRepository = issueRepository;
        this.projectService = projectService;
        this.userService = userService;
    }

    public IssueResponseDTO createIssue(
        IssueRequestDTO request,
        Long projectId,
        Long userId) {

        log.info("Creating issue for projectId={}, userId={}, title={}", projectId, userId, request.getTitle());
        Project project = projectService.getById(projectId);
        User user = userId != null ? userService.getUserById(userId) : null;

        Issue issue = new Issue();
        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setStatus(request.getStatus() != null ? request.getStatus() : "OPEN");
        issue.setProject(project);
        issue.setAssignee(user);

        Issue saved = issueRepository.save(issue);
        log.debug("Saved issue with id={}", saved.getId());

        log.info("Returning IssueResponseDTO for issue id={}", saved.getId());
        return toResponse(saved);
    }

    public List<IssueResponseDTO> getAllIssues(){
        return issueRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<IssueResponseDTO> getIssuesByProject(Long id){
        return issueRepository.findByProjectId(id)
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
        return issueRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public List<IssueResponseDTO> searchIssues(String keyword) {
        return issueRepository.searchByTitle(keyword)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public IssueResponseDTO updateIssue(Long id, IssueRequestDTO request) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

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

        if (request.getUserId() != null) {
            User user = userService.getUserById(request.getUserId());
            issue.setAssignee(user);
        }

        Issue saved = issueRepository.save(issue);
        return toResponse(saved);
    }

    public void deleteIssue(Long id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
        issueRepository.delete(issue);
    }

    private IssueResponseDTO toResponse(Issue issue) {
        IssueResponseDTO response = new IssueResponseDTO();
        response.setId(issue.getId());
        response.setTitle(issue.getTitle());
        response.setDescription(issue.getDescription());
        response.setStatus(issue.getStatus() != null ? issue.getStatus() : "OPEN");

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
