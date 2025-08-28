package com.example.crm.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "my_super_secret_key_for_jwt_token_which_should_be_long_enough";
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours
    
    // Server startup time - all tokens issued before this time will be invalid
    private final long serverStartTime = System.currentTimeMillis() - 5000; // 5 second buffer

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    public Date extractIssuedAt(String token) {
        return getClaims(token).getIssuedAt();
    }

    public boolean isTokenValid(String token, String username) {
        String extractedUsername = extractUsername(token);
        return extractedUsername.equals(username) && !isTokenExpired(token) && isTokenIssuedAfterServerStart(token);
    }

    public boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    public boolean isTokenIssuedAfterServerStart(String token) {
        try {
            Date issuedAt = extractIssuedAt(token);
            if (issuedAt == null) {
                System.err.println("ERROR: Token has no issued-at claim");
                return false;
            }
            
            long issuedAtTime = issuedAt.getTime();
            long currentTime = System.currentTimeMillis();
            boolean isValid = issuedAtTime >= serverStartTime;
            
            // Enhanced debug logging
            System.err.println("=== JWT VALIDATION DEBUG ===");
            System.err.println("Token issued at: " + issuedAtTime + " (" + new Date(issuedAtTime) + ")");
            System.err.println("Server started at: " + serverStartTime + " (" + new Date(serverStartTime) + ")");
            System.err.println("Current time: " + currentTime + " (" + new Date(currentTime) + ")");
            System.err.println("Time difference (server - token): " + (serverStartTime - issuedAtTime) + "ms");
            System.err.println("Token valid after restart: " + isValid);
            System.err.println("============================");
            
            return isValid;
        } catch (Exception e) {
            System.err.println("ERROR validating token issuance time: " + e.getMessage());
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
