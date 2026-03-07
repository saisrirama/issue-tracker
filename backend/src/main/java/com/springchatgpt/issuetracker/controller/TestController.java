package com.springchatgpt.issuetracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springchatgpt.issuetracker.dto.TestResponse;
import com.springchatgpt.issuetracker.service.TestService;

@RestController
@RequestMapping("/test")
public class TestController {

    private final TestService testService;

    public TestController(TestService testService){
        this.testService = testService;
    }

    @GetMapping
    public TestResponse hello(){
        return testService.getMessage();
    }
}
