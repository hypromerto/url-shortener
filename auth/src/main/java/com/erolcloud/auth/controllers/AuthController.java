package com.erolcloud.auth.controllers;

import com.erolcloud.auth.models.TestObject;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @PostMapping("/test")
    public ResponseEntity<TestObject> test(@RequestBody Map<String, Object> body){

        String message = (String) body.get("message");
        String id = (String) body.get("id");

        System.out.println("At auth service: " + message + " " + id);

        return new ResponseEntity<>(new TestObject("burak", "amk atası idsi"), HttpStatus.OK);
    }
}
