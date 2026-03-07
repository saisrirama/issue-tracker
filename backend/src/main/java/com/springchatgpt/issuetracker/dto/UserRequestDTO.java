package com.springchatgpt.issuetracker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserRequestDTO {
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Email(message = "Give the correct email ID")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    public UserRequestDTO() {}

    public UserRequestDTO(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
