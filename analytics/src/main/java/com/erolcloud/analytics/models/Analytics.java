package com.erolcloud.analytics.models;
import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;

@Data  
@AllArgsConstructor  
@NoArgsConstructor
public class Analytics {
    String link;
    String dateOfCreate;
    int numberOfClicks;
}
