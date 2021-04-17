package com.erolcloud.app.outpost;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoCollection;

import com.mongodb.client.model.Indexes;
import org.bson.Document;


public class MongoGate{

    private static MongoDatabase db;
    private static String connectionString = System.getenv("CONNECTION_STRING");

    public static MongoDatabase getMongoDB(){
        if (db == null)
            createInstance();
        
        return db;
    }

    private static void createInstance(){

        System.out.println("MONGODB KEY: " + connectionString);
        ConnectionString connString = new ConnectionString("mongodb+srv://" + connectionString);

        MongoClientSettings settings = MongoClientSettings.builder()
            .applyConnectionString(connString)
            .retryWrites(true)
            .build();

        MongoClient client = MongoClients.create(settings);

        db = client.getDatabase("erol-cloud");

        MongoCollection<Document> collection = db.getCollection("url");
        collection.createIndex(Indexes.hashed("key"));
        collection.createIndex(Indexes.ascending("creator"));
    }
    
}
