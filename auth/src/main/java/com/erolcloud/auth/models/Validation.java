package com.erolcloud.auth.models;

import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;

@Data  
@AllArgsConstructor  
@NoArgsConstructor
public class Validation {
    private final String username;
	private final int quota;
}
