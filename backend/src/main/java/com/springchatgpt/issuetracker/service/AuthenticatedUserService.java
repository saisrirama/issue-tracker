package com.springchatgpt.issuetracker.service;

import com.springchatgpt.issuetracker.entity.AuthUser;
import com.springchatgpt.issuetracker.exception.ResourceNotFoundException;
import com.springchatgpt.issuetracker.repository.AuthUserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticatedUserService {

    private final AuthUserRepository authUserRepository;

    public AuthenticatedUserService(AuthUserRepository authUserRepository) {
        this.authUserRepository = authUserRepository;
    }

    public AuthUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new ResourceNotFoundException("Authenticated user not found");
        }

        return authUserRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }

    public String getCurrentUserEmail() {
        return getCurrentUser().getEmail();
    }
}
