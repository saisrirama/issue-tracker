package com.springchatgpt.issuetracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springchatgpt.issuetracker.entity.User;
import com.springchatgpt.issuetracker.repository.UserRepository;

@Service
public class UserService {
    
    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found!"));
    }

    public User updateUser(Long id, User updatedUser){
        User user = getUserById(id);
        user.setEmail(updatedUser.getEmail());
        user.setName(updatedUser.getName());
        return userRepository.save(user);
    }

    public void deleteUser(Long id){
        User user = getUserById(id);
        userRepository.delete(user);
    }

}
