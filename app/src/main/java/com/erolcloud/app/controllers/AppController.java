package com.erolcloud.app.controllers;

import java.util.Collection;
import java.util.Map;
import java.net.URISyntaxException;
import java.net.URI;


import com.erolcloud.app.outpost.MongoGate;
import com.erolcloud.app.outpost.AnalyticGate;
import com.erolcloud.app.outpost.AuthGate;
import com.erolcloud.app.models.URLResult;
import com.erolcloud.app.models.ValidationResult;

import org.apache.commons.lang3.RandomStringUtils;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import org.bson.Document;

import java.util.concurrent.CompletableFuture;

@RestController
public class AppController{


    @PostMapping("/shorten")
    public ResponseEntity<URLResult> shorten(@RequestBody Map<String, String> body) {
        final int keyLength = 8;

        MongoDatabase db = MongoGate.getMongoDB();

        String token = body.get("token");
        String apiKey = body.get("apiKey");
		String originalURL = body.get("originalURL");
		String customURL = body.get("customURL");

        ValidationResult validationResult = validateUser(token, apiKey); //will also use apiKey

        if (validationResult == null)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        
        if (validationResult.getQuota() <= 0)
            return new ResponseEntity<>(HttpStatus.TOO_MANY_REQUESTS);

        MongoCollection<Document> collection = db.getCollection("url");

        String keyToUse;

        if (customURL != null){
            //If the user wants to use a custom key

            if (collection.find(Filters.eq("key", customURL)).first() != null)
                //If the custom key already exists, reject
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

            //Key is available

            keyToUse = customURL;
        }
        else{
            keyToUse = RandomStringUtils.randomAlphanumeric(keyLength);

            while (collection.find(Filters.eq("key", keyToUse)).first() != null)
                keyToUse = RandomStringUtils.randomAlphanumeric(keyLength);
        }
        
        String creator = validationResult.getUsername();

        Document newURL = new Document()
            .append("url", originalURL)
            .append("key", keyToUse)
            .append("creator", creator);
        collection.insertOne(newURL);

        
        //Add a record to analytics (also maybe account type for analytics)

        final String finalCreator = creator;
        final String finalURL = originalURL;
        final String finalKey = keyToUse;

        CompletableFuture.runAsync(() -> {
            AnalyticGate.addAnalytic(finalCreator, finalURL, finalKey);
        });
        
        /*
        Add to cache?
        */

        return new ResponseEntity<>(new URLResult(keyToUse, originalURL), HttpStatus.CREATED);
    }

    @GetMapping("/{key}")
	public ResponseEntity<Object> redirect(@PathVariable String key) throws URISyntaxException {

        MongoDatabase db = MongoGate.getMongoDB();

        MongoCollection<Document> collection = db.getCollection("url");

        Document result = collection.find(Filters.eq("key", key)).first();

        if (result == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
        String originalURL = String.valueOf(result.get("url"));

        final String finalKey = key;
        CompletableFuture.runAsync(() -> {
            AnalyticGate.updateClickCount(finalKey);
        });

        String http = "";

        if ( !(originalURL.contains("http://") || originalURL.contains("https://")) )
            http = "http://";
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
        .location(URI.create(http + originalURL))
        .build();
    }

    public ValidationResult validateUser(String token, String apiKey){ //will also use api_key

        ValidationResult result = null;

        if (token != null)
            result = AuthGate.validate("token", token);
        else if (apiKey != null)
            result = AuthGate.validate("api_key", apiKey);

        return result;
    }

}
