package com.erolcloud.auth.controllers;

import java.util.Map;

import com.erolcloud.auth.helpers.ValidationHelper;
import com.erolcloud.auth.helpers.QuotaHelper;

import com.erolcloud.auth.models.ValidationResult;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
public class ValidationController {

    @PostMapping("/validate")
	public ResponseEntity<ValidationResult> validate(@RequestBody Map<String, Object> body) {

        String token = (String) body.get("token");
        String apiKey = (String) body.get("api_key");
        String adminKey = (String) body.get("admin_key");
        
        String userType = "";

        String username = null;
        
        if (token != null)
            username = ValidationHelper.validateToken(token);
        else if (apiKey != null)
            username = ValidationHelper.validateApiKey(apiKey);
        else if (adminKey != null)
            if (ValidationHelper.validateAdmin(adminKey))
                return new ResponseEntity<>(new ValidationResult("admin", -1), HttpStatus.OK);
        
        if (username != null){

            int remainingQuota = QuotaHelper.getCurrentQuota(username);

            if (remainingQuota > 0){
                QuotaHelper.incrementQuota(username);
            }

            return new ResponseEntity<>(new ValidationResult(username, remainingQuota), HttpStatus.OK);         
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);     
    }
}
