package com.erolcloud.app.outpost;

import java.util.HashMap;

public class AnalyticGate {

    private static String ANALYTIC_SERVER = System.getenv("ANALYTIC_SERVER");

    public static String addAnalytic(String creator, String link, String key){

        HashMap<String, Object> json = new HashMap<>();

        json.put("username", creator);
        json.put("link", link);
        json.put("key", key);

        HashMap<String, Object> resp = Envoy.post(ANALYTIC_SERVER + "/add-analytics", json);

        if (resp == null){
            return null;
        }

        String result = (String) resp.get("result");

        return result;
    }

    public static String updateClickCount(String key){

        HashMap<String, Object> json = new HashMap<>();

        json.put("key", key);

        HashMap<String, Object> resp = Envoy.post(ANALYTIC_SERVER + "/update-analytics", json);

        if (resp == null){
            return null;
        }

        String result = (String) resp.get("result");

        return result;
    }
}