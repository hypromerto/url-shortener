package com.erolcloud.keygen.controllers;


import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestBody Map<String, Object> body){

        String message = (String) body.get("message");
        String id = (String) body.get("id");

        return new ResponseEntity<>(message + id + " keygendeyim", HttpStatus.OK);
    }
}
