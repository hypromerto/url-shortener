package com.erolcloud.analytics.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.HashMap;


import com.erolcloud.analytics.outpost.AuthGate;
import com.erolcloud.analytics.outpost.MongoGate;
import com.erolcloud.analytics.models.Analytics;
import com.erolcloud.analytics.models.ValidationResult;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import org.bson.Document;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
public class UserAnalyticsController {
    @PostMapping("/analytics")
    public ResponseEntity<List<Analytics>> analytics(@RequestBody Map<String, String> body) {

        MongoDatabase db = MongoGate.getMongoDB();

        String token = body.get("token");

        HashMap<String, Object> json = new HashMap<>();

        json.put("token", token);
        json.put("analytic", "true");

        ValidationResult validation = AuthGate.validate(json);

        if (validation == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = validation.getUsername();

        MongoCollection<Document> collection = db.getCollection("analytics");

        FindIterable<Document> iterDoc = collection.find(Filters.eq("username", username));

        Iterator<Document> it = iterDoc.iterator();

        List<Analytics> result = new ArrayList<Analytics>();

        String link;
        String dateOfCreate;
        int numberOfClicks;
        Document curr;

        while (it.hasNext()) {
            curr = it.next();
            link = curr.getString("link");
            dateOfCreate = curr.getString("dateOfCreate");
            numberOfClicks = Integer.parseInt(curr.getString("numberOfClicks"));
            result.add(new Analytics(link, dateOfCreate, numberOfClicks));
        }

        return new ResponseEntity<List<Analytics>>(result, HttpStatus.OK);
    }
}
