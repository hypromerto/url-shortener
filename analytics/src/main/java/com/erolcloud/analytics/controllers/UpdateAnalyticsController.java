package com.erolcloud.analytics.controllers;

import java.util.Map;

import com.erolcloud.analytics.outpost.MongoGate;
import com.erolcloud.analytics.models.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
public class UpdateAnalyticsController {
    @PutMapping("/update-analytics")
    public ResponseEntity<AddAnalyticsResult> analytics(@RequestBody Map<String, String> body) {

        String key = body.get("key");
        
        MongoDatabase db = MongoGate.getMongoDB();

        MongoCollection<Document> collection = db.getCollection("analytics");

        Document result = collection.find(Filters.eq("key", key)).first();

        if (result == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
        Integer numberOfClicks = (Integer) ( result.get("numberOfClicks"));

        Bson updateScheme = Updates.set("numberOfClicks", numberOfClicks + 1);


        collection.updateOne(Filters.eq("key", key), updateScheme);
        return new ResponseEntity<AddAnalyticsResult>(new AddAnalyticsResult("Success"), HttpStatus.CREATED);
    }
}
