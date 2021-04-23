package com.erolcloud.app.outpost;

import java.util.HashMap;

import com.google.gson.Gson;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Envoy{

    public static HashMap<String, Object> post(String url, HashMap<String, Object> json){
        try{            
            Gson gson = new Gson();

            String jsonString = gson.toJson(json);
            
            OkHttpClient cli = new OkHttpClient();

            RequestBody body = RequestBody.create(jsonString, MediaType.get("application/json; charset=utf-8"));

            Request req = new Request.Builder().url(url).post(body).build();

            try (Response resp = cli.newCall(req).execute()){
                String respString = resp.body().string();
                
                if(respString.isEmpty())
                    return null;

                    return gson.fromJson(respString, HashMap.class);
            } 
            
        } catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }

    public static HashMap<String, Object> get(String url){
        try{            
            Gson gson = new Gson();
            
            OkHttpClient cli = new OkHttpClient();

            Request req = new Request.Builder().url(url).build();

            try (Response resp = cli.newCall(req).execute()){
                String respString = resp.body().string();
                
                if(respString.isEmpty())
                    return null;

                return gson.fromJson(respString, HashMap.class);
            } 
            
        } catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }
}