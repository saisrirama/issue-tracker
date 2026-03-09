package com.springchatgpt.issuetracker.dto;

public class AuthUserResponseDTO {
    private Long id;
    private String username;

    public AuthUserResponseDTO() {}

    public AuthUserResponseDTO(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
