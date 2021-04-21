package com.erolcloud.keygen.controllers;

import java.util.Map;

import com.erolcloud.keygen.models.Key;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KeyController {

    private final int keyLength = 8;

    @GetMapping("/generate")
    public ResponseEntity<Key> generate(){
        String key = RandomStringUtils.randomAlphanumeric(keyLength);

        return new ResponseEntity<>(new Key(key), HttpStatus.OK);
    }
}
