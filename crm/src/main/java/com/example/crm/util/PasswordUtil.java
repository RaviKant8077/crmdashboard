package com.example.crm.util;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PasswordUtil {
    
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public PasswordUtil(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    
    /**
     * Encodes a plain text password using BCrypt
     * @param plainPassword the plain text password to encode
     * @return the encoded password
     */
    public String encodePassword(String plainPassword) {
        if (plainPassword == null || plainPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        return passwordEncoder.encode(plainPassword);
    }
    
    /**
     * Verifies if a plain text password matches an encoded password
     * @param plainPassword the plain text password to verify
     * @param encodedPassword the encoded password to compare against
     * @return true if passwords match, false otherwise
     */
    public boolean matches(String plainPassword, String encodedPassword) {
        if (plainPassword == null || encodedPassword == null) {
            return false;
        }
        return passwordEncoder.matches(plainPassword, encodedPassword);
    }
    
    /**
     * Checks if a password needs re-encoding (for password upgrade scenarios)
     * @param encodedPassword the encoded password to check
     * @return true if the password encoding is outdated and needs re-encoding
     */
    public boolean needsReencoding(String encodedPassword) {
        if (encodedPassword == null) {
            return false;
        }
        return passwordEncoder.upgradeEncoding(encodedPassword);
    }
}
