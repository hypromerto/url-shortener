package com.erolcloud.analytics.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.erolcloud.analytics.outpost.MongoGate;
import com.erolcloud.analytics.models.Analytics;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import org.bson.Document;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

public class UserAnalyticsController {
    @PostMapping("/analytics")
    public ResponseEntity<List<Analytics>> analytics(@RequestBody Map<String, String> body) {

        MongoDatabase db = MongoGate.getMongoDB();

        String userID = body.get("userID");

        // ValidationResult validationResult = validateUser(token, apiKey); //will also
        // use apiKey

        // if (validationResult == null)
        // return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        // if (validationResult.getQuota() <= 0)
        // return new ResponseEntity<>(HttpStatus.TOO_MANY_REQUESTS);

        MongoCollection<Document> collection = db.getCollection("analytics");

        FindIterable<Document> iterDoc = collection.find(Filters.eq("userID", userID));

        if (iterDoc == null) 
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

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
