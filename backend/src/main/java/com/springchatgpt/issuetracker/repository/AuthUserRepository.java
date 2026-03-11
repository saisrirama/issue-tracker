package com.springchatgpt.issuetracker.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springchatgpt.issuetracker.entity.AuthUser;

@Repository
public interface AuthUserRepository extends JpaRepository<AuthUser, Long> {
    boolean existsByEmail(String email);
    Optional<AuthUser> findByEmail(String email);
}
