package com.springchatgpt.issuetracker.controller;

import com.springchatgpt.issuetracker.dto.IssueRequestDTO;
import com.springchatgpt.issuetracker.dto.IssueResponseDTO;
import com.springchatgpt.issuetracker.service.IssueService;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IssueController {

    private final IssueService service;

    public IssueController(IssueService service){
        this.service = service;
    }

    // CREATE ISSUE
    @PostMapping("/projects/{projectId}/issues")
    public ResponseEntity<IssueResponseDTO> createIssue(
            @PathVariable Long projectId,
            @RequestParam(required = false) Long userId,
            @RequestBody IssueRequestDTO issue){

        Long resolvedUserId = userId != null ? userId : issue.getUserId();

        IssueResponseDTO created =
                service.createIssue(issue, projectId, resolvedUserId);

        return ResponseEntity
                .status(201)
                .body(created);
    }

    // GET ISSUES BY PROJECT
    @GetMapping("/projects/{projectId}/issues")
    public ResponseEntity<List<IssueResponseDTO>> getByProject(
            @PathVariable Long projectId){

        return ResponseEntity.ok(
                service.getIssuesByProject(projectId)
        );
    }

    // GET ALL ISSUES
    @GetMapping("/issues")
    public ResponseEntity<List<IssueResponseDTO>> getAll(){

        return ResponseEntity.ok(
                service.getAllIssues()
        );
    }

    // UPDATE ISSUE
    @PutMapping("/issues/{id}")
    public ResponseEntity<IssueResponseDTO> updateIssue(
            @PathVariable Long id,
            @RequestBody IssueRequestDTO issue){

        return ResponseEntity.ok(
                service.updateIssue(id, issue)
        );
    }

    // DELETE ISSUE
    @DeleteMapping("/issues/{id}")
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id) {
        service.deleteIssue(id);
        return ResponseEntity.noContent().build();
    }

    // DELETE ISSUE (PROJECT-SCOPED ROUTE)
    @DeleteMapping("/projects/{projectId}/issues/{id}")
    public ResponseEntity<Void> deleteIssueByProject(
            @PathVariable Long projectId,
            @PathVariable Long id) {
        service.deleteIssue(id);
        return ResponseEntity.noContent().build();
    }

    // PAGED
    @GetMapping("/issues/paged")
    public ResponseEntity<Page<IssueResponseDTO>> getPagedIssues(
            @RequestParam int page,
            @RequestParam int size){

        return ResponseEntity.ok(
                service.getPagedIssues(page, size)
        );
    }

    // SEARCH
    @GetMapping("/issues/search")
    public ResponseEntity<List<IssueResponseDTO>> search(
            @RequestParam String keyword){

        return ResponseEntity.ok(
                service.searchIssues(keyword)
        );
    }
}
