package com.erolcloud.app.outpost;

import java.util.HashMap;

import com.erolcloud.app.models.ValidationResult;

public class AuthGate {
    private static String AUTH_SERVER = System.getenv("AUTH_SERVER");

    public static ValidationResult validate(String item, String type ){

        HashMap<String, Object> json = new HashMap<>();

        json.put("item", item);
        json.put("type", type);

        HashMap<String, Object> resp = Envoy.post(AUTH_SERVER + "/validate", json);

        if (resp == null){
            return null;
        }
        
        String username = (String) resp.get("username");
        int quota = (int) resp.get("quota");

        return new ValidationResult(username, quota);
    }

}