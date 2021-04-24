package com.erolcloud.auth.models;

import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;

@Data  
public class RegisterResult {
    private boolean success;
    private String error;

    public RegisterResult(String error){
        this.error = error;
        this.success = false;
    }

    public RegisterResult(){
        this.error = "";
        this.success = true;
    }
}
