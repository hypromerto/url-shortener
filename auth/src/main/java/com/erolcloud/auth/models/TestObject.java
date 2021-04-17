package com.erolcloud.auth.models;

public class TestObject{
    private String message;

    private String id;

    public TestObject(String message, String id){
        this.message = message;
        this.id = id;
    }

    public String getMessage(){
        return message;
    }

    public String getID(){
        return id;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public void setID(String id){
        this.id = id;
    }