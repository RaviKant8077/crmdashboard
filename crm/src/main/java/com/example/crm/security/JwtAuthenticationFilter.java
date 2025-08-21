package com.example.crm.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        System.err.println("=== JWT FILTER DEBUG ===");
        System.err.println("Request URI: " + request.getRequestURI());
        System.err.println("Authorization header: " + (authHeader != null ? "Present" : "Missing"));

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            System.err.println("JWT Token: " + jwt.substring(0, Math.min(20, jwt.length())) + "...");
            
            try {
                username = jwtUtil.extractUsername(jwt);
                System.err.println("Extracted username: " + username);
                
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    boolean isValid = jwtUtil.isTokenValid(jwt, userDetails.getUsername());
                    System.err.println("Token validation result: " + isValid);
                    
                    if (isValid) {
                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        System.err.println("Authentication set successfully");
                    } else {
                        System.err.println("Token validation failed - sending 401");
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("{\"error\":\"Invalid or expired token\"}");
                        return; // Stop the filter chain
                    }
                }
            } catch (Exception e) {
                System.err.println("ERROR in JWT processing: " + e.getMessage());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"error\":\"Invalid token format\"}");
                return; // Stop the filter chain
            }
        } else if (authHeader != null) {
            System.err.println("Invalid Authorization header format");
        }

        System.err.println("=== END JWT FILTER DEBUG ===");
        filterChain.doFilter(request, response);
    }
}