package com.erolcloud.auth.controllers;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.bson.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.apache.commons.codec.digest.DigestUtils;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.erolcloud.auth.models.Quota;
import com.erolcloud.auth.models.RegisterResult;
import com.erolcloud.auth.outpost.MongoGate;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

@RestController
public class RegisterController {

    @PostMapping("/register")
    public ResponseEntity<RegisterResult> register(@RequestBody Map<String, String> body) {
        MongoDatabase db = MongoGate.getMongoDB();

        String username = body.get("username");
        String password = body.get("password");
        String accountType = body.get("account_type");
        String hashedPassword = DigestUtils.sha256Hex(password);

        MongoCollection<Document> collection = db.getCollection("users");

        if (collection.find(Filters.eq("username", username)).first() != null) {
            return new ResponseEntity<>(new RegisterResult("Username already in use."), HttpStatus.CONFLICT);
        }

        if (!"b2c".equals(accountType) && !"b2b".equals(accountType)) {
            return new ResponseEntity<>(new RegisterResult("Invalid account type."), HttpStatus.BAD_REQUEST);
        }

        Document newUser = new Document().append("username", username)
                .append("hashed_password", hashedPassword).append("account_type", accountType)
                .append("quota_status", new Quota(0, null).getDocument());
        collection.insertOne(newUser);
        /** 
        CompletableFuture.runAsync(() -> {
            AnalyticsGate.recordRegister(accountType);
        });
        */

        return new ResponseEntity<>(new RegisterResult(), HttpStatus.CREATED);
    }
}
