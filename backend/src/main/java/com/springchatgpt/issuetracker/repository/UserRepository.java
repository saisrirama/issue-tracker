package com.springchatgpt.issuetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springchatgpt.issuetracker.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
}
