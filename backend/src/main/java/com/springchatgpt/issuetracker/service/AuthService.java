package com.springchatgpt.issuetracker.service;

import com.springchatgpt.issuetracker.dto.AuthUserResponseDTO;
import com.springchatgpt.issuetracker.dto.LoginRequestDTO;
import com.springchatgpt.issuetracker.dto.RegisterRequestDTO;
import com.springchatgpt.issuetracker.entity.AuthUser;
import com.springchatgpt.issuetracker.exception.DuplicateResourceException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.springchatgpt.issuetracker.repository.AuthUserRepository;

@Service
public class AuthService {

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(AuthUserRepository authUserRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authUserRepository = authUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public AuthUserResponseDTO register(RegisterRequestDTO request) {
        String normalizedEmail = request.getEmail().trim();

        if (authUserRepository.existsByEmail(normalizedEmail)) {
            throw new DuplicateResourceException("Email already exists");
        }

        AuthUser user = new AuthUser();
        user.setName(request.getName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return toResponse(authUserRepository.save(user));
    }

    public String login(LoginRequestDTO request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(userDetails);
    }

    private AuthUserResponseDTO toResponse(AuthUser user) {
        return new AuthUserResponseDTO(user.getId(), user.getName(), user.getEmail());
    }
}
