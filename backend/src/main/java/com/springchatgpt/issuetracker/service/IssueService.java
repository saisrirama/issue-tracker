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
    User user = userService.getUserById(userId);

    // DTO → Entity
    Issue issue = new Issue();
    issue.setTitle(request.getTitle());
    issue.setProject(project);
    issue.setAssignee(user);

    Issue saved = issueRepository.save(issue);
    log.debug("Saved issue with id={}", saved.getId());

    // Entity → DTO
    IssueResponseDTO response = new IssueResponseDTO();
    response.setId(saved.getId());
    response.setProjectId(project.getId());
    response.setProjectName(project.getName());
    response.setAssigneeId(user.getId());
    response.setAssigneeName(user.getName());
    log.info("Returning IssueResponseDTO for issue id={}", saved.getId());
    return response;
}

    public List<Issue> getAllIssues(){
        return issueRepository.findAll();
    }

    public List<Issue> getIssuesByProject(Long id){
        return issueRepository.findByProjectId(id);
    }

    public List<Issue> getIssuesByUser(Long id){
        return issueRepository.findByAssigneeId(id);
    }

    public Page<Issue> getPagedIssues(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("title"));
        return issueRepository.findAll(pageable);
    }

    public List<Issue> searchIssues(String keyword) {
        return issueRepository.searchByTitle(keyword);
    }
}
