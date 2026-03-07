package com.springchatgpt.issuetracker.repository;

import com.springchatgpt.issuetracker.entity.Issue;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository
        extends JpaRepository<Issue, Long> {

    List<Issue> findByProjectId(Long projectId);

    List<Issue> findByAssigneeId(Long userId);

    Page<Issue> findAll(Pageable pageable);

    @Query("SELECT i from Issue i WHERE i.title LIKE %:keyword%")
    List<Issue> searchByTitle(@Param("keyword") String keyword);


}