package com.erolcloud.auth.models;

import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;

@Data  
@AllArgsConstructor  
@NoArgsConstructor
public class AuthResult {
    public String accountType;
    public String authItem;
}