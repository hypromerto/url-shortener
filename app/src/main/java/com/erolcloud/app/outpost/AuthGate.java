package com.erolcloud.app.outpost;

import java.util.HashMap;

import com.erolcloud.app.models.TestObject;

public class AuthGate {
    private static String AUTH_SERVER = System.getenv("AUTH_SERVER");

    public static TestObject test(String message, String id){

        HashMap<String, Object> json = new HashMap<>();

        System.out.println("AUTH_SERVER: " + AUTH_SERVER);
        json.put("message", message);
        json.put("id", id);

        HashMap<String, Object> resp = Envoy.post(AUTH_SERVER + "/test", json);

        String msg = (String) resp.get("message");
        String str_id = (String) resp.get("id");

        System.out.println("Received response as " + msg + " " + str_id);

        return new TestObject(msg, str_id);
    }

}