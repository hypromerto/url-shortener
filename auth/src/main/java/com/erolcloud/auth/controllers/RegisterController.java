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
        String passwordHash = DigestUtils.sha256Hex(password);
        MongoCollection<Document> collection = db.getCollection("users");
        Document prevUsername = collection.find(Filters.eq("username", username)).first();
        Document prevEmail = collection.find(Filters.eq("email", email)).first();

        if (prevUsername != null) {
            return new ResponseEntity<>(new Register("Username already in use."), HttpStatus.CONFLICT);
        }
        if (prevEmail != null) {
            return new ResponseEntity<>(new Register("Email already in use."), HttpStatus.CONFLICT);
        }
        if (username.length() < 3 || 64 < username.length()) {
            return new ResponseEntity<>(new Register("Username length should be in range [3 - 64]."),
                    HttpStatus.BAD_REQUEST);
        }
        if (password.length() < 3 || 64 < password.length()) {
            return new ResponseEntity<>(new Register("Password length should be in range [3 - 64]."),
                    HttpStatus.BAD_REQUEST);
        }
        if (email.length() < 8 || 512 < email.length()) {
            return new ResponseEntity<>(new Register("Email length should be in range [8 - 512]."),
                    HttpStatus.BAD_REQUEST);
        }
        if (!"standard".equals(accountType) && !"business".equals(accountType)) {
            return new ResponseEntity<>(new Register("Invalid account type."), HttpStatus.BAD_REQUEST);
        }
        Document newUser = new Document().append("email", email).append("username", username)
                .append("password_hash", passwordHash).append("account_type", accountType)
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
