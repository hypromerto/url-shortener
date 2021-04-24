package com.erolcloud.app.models;

import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;

@Data  
@AllArgsConstructor  
@NoArgsConstructor
public class URLResult {
    private String key;
    private String url;
}