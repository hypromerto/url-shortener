package com.erolcloud.auth.helpers;

import com.erolcloud.auth.outpost.MongoGate;

import com.erolcloud.auth.models.Quota;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

import org.bson.Document;
import org.bson.conversions.Bson;


public class QuotaHelper {

    private static final int B2C_MAX = Integer.parseInt(System.getenv("B2C_MAX"));
    private static final int B2B_MAX = Integer.parseInt(System.getenv("B2B_MAX"));
    

    public static int getCurrentQuota(String user){
        MongoDatabase db = MongoGate.getMongoDB();

        MongoCollection<Document> collection = db.getCollection("users");

        Document result = collection.find(Filters.eq("username", user)).first();

        String   accountType = (String) result.get("account_type");
        Document quotaStatus = (Document) result.get("quota_status");
        Date     last        = (Date) quotaStatus.get("last");
        Integer  used        = (Integer) quotaStatus.get("used");

        //If the last use time was not today.
        if (!sameDay(last, new Date())){

            newDayQuotaReset(collection, user);

            used = 0;
        }
        if (accountType.equals("b2c"))
            return (int) (B2C_MAX - used);
        else if (accountType.equals("b2b"))
            return  (int) (B2B_MAX - used);
        
        return -1;
    }

    public static void incrementQuota(String user){
        MongoDatabase db = MongoGate.getMongoDB();

        MongoCollection<Document> collection = db.getCollection("users");

        Document result = collection.find(Filters.eq("username", user)).first();

        Integer used = ((Integer) ((Document) result.get("quota_status")).get("used"));

        Bson updateScheme = Updates.set("quota_status",
                                  new Quota(used + 1, new Date()).getDocument());

        collection.updateOne(Filters.eq("username", user), updateScheme);
    }

    private static void newDayQuotaReset(MongoCollection<Document> collection, String user){
        Bson updateScheme = Updates.set("quota_status", new Quota(0, null).getDocument());
        collection.updateOne(Filters.eq("username", user), updateScheme);
    }

    private static Boolean sameDay(Date date1, Date date2){
        if (date1 == null)
            return false;
        LocalDate localDate1 = date1.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate();
        LocalDate localDate2 = date2.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate();
        return localDate1.isEqual(localDate2);
    }
}
