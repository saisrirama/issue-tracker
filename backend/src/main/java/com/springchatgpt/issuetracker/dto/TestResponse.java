package com.springchatgpt.issuetracker.dto;

public class TestResponse {
    
    private String message;
    private String status;

    public TestResponse(String message, String status){
        this.message =message;
        this.status=status;
    }
    public String getMessage(){
        return message;
    }
    public String getStatus(){
        return status;
    }
}
