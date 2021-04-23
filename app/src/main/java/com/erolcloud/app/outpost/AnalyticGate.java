package com.erolcloud.app.outpost;

import java.util.HashMap;

public class AnalyticGate {
    // private static String ANALYTIC_SERVER = "http://35.240.125.16";
    private static String ANALYTIC_SERVER = System.getenv("ANALYTIC_SERVER");

    public static String addAnalytic(String creator, String link){

        HashMap<String, Object> json = new HashMap<>();

        json.put("username", creator);
        json.put("link", link);

        HashMap<String, Object> resp = Envoy.post(ANALYTIC_SERVER + "/add-analytic", json);

        if (resp == null){
            return null;
        }

        String result = (String) resp.get("result");

        return result;
    }
}