package com.erolcloud.auth.models;

public class Register {
    private final boolean success;
    private final String message;

    public Register(String message){
        this.message = message;
        this.success = false;
    }

    public Register(){
        this.message = "";
        this.success = true;
    }

    public String getError(){
        return this.message;
    }

    public boolean getSuccess(){
        return this.success;
    }
}
