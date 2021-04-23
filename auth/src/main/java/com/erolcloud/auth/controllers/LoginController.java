package com.erolcloud.auth.controllers;

import java.util.Map;

import com.erolcloud.auth.outpost.MongoGate;
import com.erolcloud.auth.models.AuthResult;
import com.erolcloud.auth.helpers.ValidationHelper;

import org.apache.commons.codec.digest.DigestUtils;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.bson.Document;

@RestController
public class LoginController {
	
	@PostMapping("/login")
	public ResponseEntity<AuthResult> login(@RequestBody Map<String,String> body) {

        MongoDatabase db = MongoGate.getMongoDB();
    
		String username = body.get("username");
        String password = body.get("password");
        String hashedPassword = DigestUtils.sha256Hex(password);

        MongoCollection<Document> collection = db.getCollection("users");
        Document result = collection.find(Filters.eq("username", username)).first();

		if (result == null) 
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    
    
        String originalHash = String.valueOf(result.get("hashed_password"));

        if (originalHash.equals(hashedPassword)) {
            String accountType = String.valueOf(result.get("account_type"));

            /* Analytics for login ? */

            String authItem = "";
            if (accountType.equals("b2c")) {
                authItem = ValidationHelper.getToken(username);
            } 
            else if (accountType.equals("b2b")) {
                authItem = ValidationHelper.getApiKey(username);
            } 
            else if (accountType.equals("admin")) {
                authItem = ValidationHelper.getAdminKey();
            }
            //Will return meaningless AuthResult if accountType is arbitrary.
            return new ResponseEntity<>(new AuthResult(accountType, authItem), HttpStatus.OK);
        }

		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}
}
