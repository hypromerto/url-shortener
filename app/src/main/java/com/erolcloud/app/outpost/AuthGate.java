package com.erolcloud.app.outpost;

import java.util.HashMap;

public class AuthGate {
    private static String AUTH_SERVER = System.getenv("AUTH_SERVER");

    private static void test(String message, String id){

        HashMap<String, Object> json = new HashMap<>();

        json.put("message", message);
        json.put("id", id);

        HashMap<String, Object> resp = Envoy.post(AUTH_SERVER + "/test", json);

        System.out.println(resp.get("message") + " " + resp.get("id"));
    }

}