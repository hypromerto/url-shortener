package com.erolcloud.auth.helpers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

public class ValidationHelper {
    private static final String ADMIN_KEY = System.getenv("ADMIN_KEY");
    private static final String SECRET = System.getenv("SECRET");
    private static final String HEADER = System.getenv("HEADER");
    private static final int SIGN_LEN = 43;
    
    public static String getToken(String user){
        return JWT.create().withSubject(user).sign(Algorithm.HMAC256(SECRET));
    }
    
    public static String getApiKey(String user){
        String apiKey = JWT.create().withSubject(user).sign(Algorithm.HMAC256(SECRET));
        return apiKey.substring(HEADER.length()).replaceAll("\\.", "");
    }

    public static String getAdminKey(){
        return ADMIN_KEY;
    }

    public static String validateApiKey(String apiKey){
        try{
            String tokenBody = apiKey.substring(0, apiKey.length() - SIGN_LEN);
            String tokenSignature = apiKey.substring(apiKey.length() - SIGN_LEN);
            String token = HEADER + "." + tokenBody + "." + tokenSignature;
            DecodedJWT jwt = JWT.require(Algorithm.HMAC256(SECRET)).build().verify(token);
            return jwt.getSubject();
        } catch (JWTVerificationException exception) {
            return null;
        }
    }

    public static String validateToken(String token) {
        try {
          DecodedJWT jwt = JWT.require(Algorithm.HMAC256(SECRET)).build().verify(token);
          return jwt.getSubject();
        } catch (JWTVerificationException exception) {
          return null;
        }
      }
    

    public static boolean validateAdmin(String adminKey) {
        return ADMIN_KEY.equals(adminKey);
    }
}
