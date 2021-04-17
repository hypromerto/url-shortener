package com.erolcloud.app.controllers;

import java.util.Map;

import com.erolcloud.app.models.TestObject;

import com.erolcloud.app.outpost.AuthGate;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
public class TestController{

    @PostMapping("/test")   
    public ResponseEntity<TestObject> test(@RequestBody Map<String, String> body){

        String message = body.get("message");
        String id = body.get("id");
        
        TestObject testobj = AuthGate.test(message, id);

        System.out.println("From test controller: " + testobj.getMessage() + " " + testobj.getID());

        return new ResponseEntity<>(testobj, HttpStatus.OK);
    }
}