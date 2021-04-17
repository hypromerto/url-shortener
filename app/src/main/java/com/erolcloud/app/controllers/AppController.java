package com.erolcloud.app.controllers;

import java.util.Collection;
import java.util.Map;

import javax.swing.text.Style;

import com.erolcloud.app.outpost.MongoGate;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import org.bson.Document;


@RestController
public class AppController{


    @PostMapping("/shorten")
    public ResponseEntity<String> shorten(@RequestBody Map<String, String> body) {
        
        MongoDatabase db = MongoGate.getMongoDB();

		String originalURL = body.get("originalURL");
		String key = body.get("key");
        String creator = body.get("creator");
        String expirationDate = body.get("expirationDate");

        System.out.println(originalURL + key + creator + expirationDate);

        MongoCollection<Document> collection = db.getCollection("url");

        Document newURL = new Document()
        .append("url", originalURL)
        .append("key", key)
        .append("creator", creator)
        .append("expireDate", expirationDate)
        .append("active", 1);

        collection.insertOne(newURL);

        return new ResponseEntity<>("Created entry", HttpStatus.CREATED);
        
    }


}



