package com.erolcloud.auth.controllers;

import com.erolcloud.auth.models.TestObject;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<TestObject> test(@RequestBody Map<String, Object> body){

        String username = (String) body.get("username");
        String password = (String) body.get("password");

        System.out.println("At Login Controller: " + username + " " + password);

        return new ResponseEntity<>(new TestObject("Logged in", username), HttpStatus.OK);
    }
}
