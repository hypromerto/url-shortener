package com.erolcloud.analytics.controllers;

import java.time.LocalDate;
import java.util.Map;

import com.erolcloud.analytics.outpost.MongoGate;
import com.erolcloud.analytics.models.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController

public class AddAnalyticsController {
    @PostMapping("/add-analytics")
    public ResponseEntity<AddAnalyticsResult> analytics(@RequestBody Map<String, String> body) {

        String username = body.get("username");
        String link = body.get("link");
        String dateOfCreate = LocalDate.now().toString();
        String numberOfClicks = "0";
        MongoDatabase db = MongoGate.getMongoDB();

        MongoCollection<Document> collection = db.getCollection("analytics");

        Document newAnalytics = new Document().append("username", username).append("link", link)
                .append("dateOfCreate", dateOfCreate).append("numberOfClicks", numberOfClicks);
        collection.insertOne(newAnalytics);

        return new ResponseEntity<AddAnalyticsResult>(new AddAnalyticsResult("Success"), HttpStatus.CREATED);
    }
}
