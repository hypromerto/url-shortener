package com.erolcloud.app.outpost;

import java.security.Key;
import java.util.HashMap;

public class KeygenGate {
    private static String KEYGEN_SERVER = System.getenv("KEYGEN_SERVER");

    public static String getKey(){
        HashMap<String, Object> resp = Envoy.get(KEYGEN_SERVER + "/generate");

        if (resp == null){
            return null;
        }
        
        return (String) resp.get("key");
    }

}