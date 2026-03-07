package com.springchatgpt.issuetracker.repository;

import com.springchatgpt.issuetracker.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository
        extends JpaRepository<Project, Long> {

}
