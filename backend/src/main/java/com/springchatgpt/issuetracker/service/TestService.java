package com.springchatgpt.issuetracker.service;

import org.springframework.stereotype.Service;

import com.springchatgpt.issuetracker.dto.TestResponse;

@Service
public class TestService {

    public TestResponse getMessage(){
        return new TestResponse("This Application is working!", "SUCCESS");
    }
}
