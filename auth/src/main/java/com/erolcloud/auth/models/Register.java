package com.erolcloud.auth.models;

import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;

@Data  
@AllArgsConstructor  
@NoArgsConstructor
public class Register {
    private final boolean success;
    private final String error;

    public Register(String error){
        this.error = error;
        this.success = false;
    }

    public Register(){
        this.error = "";
        this.success = true;
    }
}
