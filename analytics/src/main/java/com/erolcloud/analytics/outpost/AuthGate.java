package com.erolcloud.analytics.outpost;

import java.util.HashMap;

import com.erolcloud.analytics.models.ValidationResult;

public class AuthGate {
    private static String AUTH_SERVER = System.getenv("AUTH_SERVER");

    public static ValidationResult validate(HashMap<String, Object> json) {

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