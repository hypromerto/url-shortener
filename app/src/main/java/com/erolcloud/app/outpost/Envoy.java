package com.erolcloud.app.outpost;

import java.util.HashMap;

import com.fasterxml.jackson.databind.ObjectMapper;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Envoy{

    public static HashMap<String, Object> post(String url, HashMap<String, Object> json){
        try{            
            ObjectMapper objectMapper = new ObjectMapper();

            String jsonString = objectMapper.writeValueAsString(json);
            
            OkHttpClient cli = new OkHttpClient();

            RequestBody body = RequestBody.create(jsonString, MediaType.get("application/json; charset=utf-8"));

            Request req = new Request.Builder().url(url).post(body).build();

            try (Response resp = client.newCall(request).execute()){
                String respString = resp.body().string();
                
                if(respString.isEmpty())
                    return null;

                return objectMapper.readValue(respString, HashMap.class);
            } 
            
        } catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }
}