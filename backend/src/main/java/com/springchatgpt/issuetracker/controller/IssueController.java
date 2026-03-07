package com.springchatgpt.issuetracker.controller;


import com.springchatgpt.issuetracker.dto.IssueRequestDTO;
import com.springchatgpt.issuetracker.dto.IssueResponseDTO;
import com.springchatgpt.issuetracker.entity.Issue;
import com.springchatgpt.issuetracker.service.IssueService;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issues")
public class IssueController {

    private final IssueService service;

    public IssueController(IssueService service){
        this.service = service;
    }

    @PostMapping
    public IssueResponseDTO createIssue(
            @RequestParam Long projectId,
            @RequestParam Long userId,
            @RequestBody IssueRequestDTO issue){

        return service.createIssue(
                issue,
                projectId,
                userId);
    }

    @GetMapping
    public List<Issue> getAll(){

        return service.getAllIssues();
    }

    @GetMapping("/project/{id}")
    public List<Issue> getByProject(
            @PathVariable Long id){

        return service.getIssuesByProject(id);
    }

    @GetMapping("/user/{id}")
    public List<Issue> getByUser(
            @PathVariable Long id){

        return service.getIssuesByUser(id);
    }

    @GetMapping("/paged")
    public Page<Issue> getPagedIssues(@RequestParam int page, @RequestParam int size){
        return service.getPagedIssues(page, size);
    }

    @GetMapping("/search")
    public List<Issue> search(@RequestParam String keyword){
        return service.searchIssues(keyword);
    }
}
