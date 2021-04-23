package com.erolcloud.app.outpost;

import java.security.Key;
import java.util.HashMap;

public class KeygenGate {
    private static String KEYGEN_SERVER = "http://104.155.61.29";//System.getenv("KEYGEN_SERVER");

    public static String getKey(){
        HashMap<String, Object> resp = Envoy.get(KEYGEN_SERVER + "/generate");

        if (resp == null){
            return null;
        }
        
        return (String) resp.get("key");
    }

}