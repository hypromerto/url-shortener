package com.erolcloud.app.models;

import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;

@Data  
@AllArgsConstructor  
@NoArgsConstructor
public class ValidationResult {
    private String username;
    private int quota;
}