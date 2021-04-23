package com.erolcloud.analytics.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.erolcloud.analytics.outpost.AuthGate;
import com.erolcloud.analytics.outpost.MongoGate;
import com.erolcloud.analytics.models.Analytics;
import com.erolcloud.analytics.models.ValidationResult;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

public class AdminAnalyticsController {
    @PostMapping("/admin")
    public ResponseEntity<List<Analytics>> analytics(@RequestBody Map<String, String> body) {

        MongoDatabase db = MongoGate.getMongoDB();

        String username = body.get("username");
        String adminKey = body.get("admin_key");

        ValidationResult result = AuthGate.validate("admin_key", adminKey);

        if( ! (result.getUsername().equals("admin") && result.getQuota() != -1)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        MongoCollection<Document> collection = db.getCollection("analytics");

        FindIterable<Document> iterDoc = collection.find();
        Iterator<Document> it = iterDoc.iterator();

        String link;
        String dateOfCreate;
        int numberOfClicks;
        Document curr;

        List<Analytics> result = new ArrayList<Analytics>();

        while (it.hasNext()) {
            curr = it.next();
            link = curr.getString("link");
            dateOfCreate = curr.getString("dateOfCreate");
            numberOfClicks = Integer.parseInt(curr.getString("numberOfClicks"));
            result.add(new Analytics(link, dateOfCreate, numberOfClicks));
        }

        return new ResponseEntity<List<Analytics>>(result, HttpStatus.CREATED);
    }

}
