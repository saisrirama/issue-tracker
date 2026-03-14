package com.springchatgpt.issuetracker.service;

import java.util.List;

import com.springchatgpt.issuetracker.entity.AuthUser;
import org.springframework.stereotype.Service;

import com.springchatgpt.issuetracker.dto.UserRequestDTO;
import com.springchatgpt.issuetracker.dto.UserResponseDTO;
import com.springchatgpt.issuetracker.entity.User;
import com.springchatgpt.issuetracker.exception.ResourceNotFoundException;
import com.springchatgpt.issuetracker.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final AuthenticatedUserService authenticatedUserService;

    public UserService(UserRepository userRepository, AuthenticatedUserService authenticatedUserService){
        this.userRepository = userRepository;
        this.authenticatedUserService = authenticatedUserService;
    }

    public UserResponseDTO createUser(UserRequestDTO request){
        AuthUser currentUser = authenticatedUserService.getCurrentUser();
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setOwner(currentUser);
        return toResponse(userRepository.save(user));
    }

    public List<UserResponseDTO> getUsers(){
        return userRepository.findByOwnerEmail(authenticatedUserService.getCurrentUserEmail()).stream()
                .map(this::toResponse)
                .toList();
    }

    public User getUserById(Long id){
        return userRepository.findByIdAndOwnerEmail(id, authenticatedUserService.getCurrentUserEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public UserResponseDTO getUserResponseById(Long id) {
        return toResponse(getUserById(id));
    }

    public UserResponseDTO updateUser(Long id, UserRequestDTO updatedUser){
        User user = getUserById(id);
        user.setEmail(updatedUser.getEmail());
        user.setName(updatedUser.getName());
        return toResponse(userRepository.save(user));
    }

    public void deleteUser(Long id){
        User user = getUserById(id);
        userRepository.delete(user);
    }

    private UserResponseDTO toResponse(User user) {
        return new UserResponseDTO(user.getId(), user.getName(), user.getEmail());
    }

}
