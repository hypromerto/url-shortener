package com.erolcloud.analytics.outpost;

import java.util.HashMap;

import com.erolcloud.analytics.models.ValidationResult;

public class AuthGate {
    private static String AUTH_SERVER = "http://35.187.92.19";

    public static ValidationResult validate(String key, String value) {

        HashMap<String, Object> json = new HashMap<>();

        json.put(key, value);

        HashMap<String, Object> resp = Envoy.post(AUTH_SERVER + "/validate", json);

        if (resp == null) {
            return null;
        }
        String username = (String) resp.get("username");
        double double_quota = (double) resp.get("quota");

        int quota = (int) double_quota;

        return new ValidationResult(username, quota);
    }
}