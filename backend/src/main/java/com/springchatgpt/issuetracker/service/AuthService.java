package com.springchatgpt.issuetracker.service;

import org.springframework.stereotype.Service;

import com.springchatgpt.issuetracker.dto.AuthUserResponseDTO;
import com.springchatgpt.issuetracker.dto.LoginRequestDTO;
import com.springchatgpt.issuetracker.dto.RegisterRequestDTO;
import com.springchatgpt.issuetracker.entity.AuthUser;
import com.springchatgpt.issuetracker.exception.DuplicateResourceException;
import com.springchatgpt.issuetracker.exception.InvalidCredentialsException;
import com.springchatgpt.issuetracker.repository.AuthUserRepository;

@Service
public class AuthService {

    private final AuthUserRepository authUserRepository;

    public AuthService(AuthUserRepository authUserRepository) {
        this.authUserRepository = authUserRepository;
    }

    public AuthUserResponseDTO register(RegisterRequestDTO request) {
        String normalizedUsername = request.getUsername().trim();

        if (authUserRepository.existsByUsername(normalizedUsername)) {
            throw new DuplicateResourceException("Username already exists");
        }

        AuthUser user = new AuthUser();
        user.setUsername(normalizedUsername);
        user.setPassword(request.getPassword());

        return toResponse(authUserRepository.save(user));
    }

    public AuthUserResponseDTO login(LoginRequestDTO request) {
        AuthUser user = authUserRepository.findByUsername(request.getUsername().trim())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid username or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new InvalidCredentialsException("Invalid username or password");
        }

        return toResponse(user);
    }

    private AuthUserResponseDTO toResponse(AuthUser user) {
        return new AuthUserResponseDTO(user.getId(), user.getUsername());
    }
}
