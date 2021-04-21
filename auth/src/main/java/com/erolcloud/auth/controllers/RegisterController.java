package com.erolcloud.auth.controllers;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.bson.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.erolcloud.auth.models.QuotaStatus;
import com.erolcloud.auth.models.Register;
import com.erolcloud.auth.outpost.MongoGate;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

@RestController
public class RegisterController {
    private static final MongoDatabase db = MongoGate.getMongoDB();

    @PutMapping("/user")
    public ResponseEntity<Register> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String username = body.get("username");
        String password = body.get("password");
        String accountType = body.get("account_type");
        String hashedPassword = DigestUtils.sha256Hex(password);

        MongoCollection<Document> collection = db.getCollection("users");

        if (collection.find(Filters.eq("username", username)).first() != null) {
            return new ResponseEntity<>(new Register("Username already in use."), HttpStatus.CONFLICT);
        }
        if (collection.find(Filters.eq("email", email)).first() != null) {
            return new ResponseEntity<>(new Register("Email already in use."), HttpStatus.CONFLICT);
        }

        if (!"standard".equals(accountType) && !"business".equals(accountType)) {
            return new ResponseEntity<>(new Register("Invalid account type."), HttpStatus.BAD_REQUEST);
        }

        Document newUser = new Document().append("email", email).append("username", username)
                .append("password_hash", hashedPassword).append("account_type", accountType)
                .append("quota_status", new QuotaStatus(0, null).getDocument());
        collection.insertOne(newUser);
        /** 
        CompletableFuture.runAsync(() -> {
            AnalyticsGate.recordRegister(accountType);
        });
        */

        return new ResponseEntity<>(new Register(), HttpStatus.CREATED);
    }
}
