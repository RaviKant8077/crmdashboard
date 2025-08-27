package com.example.crm.security;

import com.example.crm.dto.UserDTO;
import com.example.crm.model.Role;
import com.example.crm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        System.out.println("Attempting to authenticate user: " + authRequest.getUsername());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword())
            );

            String token = jwtUtil.generateToken(authRequest.getUsername());
            UserDTO user = userService.findByUsername(authRequest.getUsername());
            
            if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }

            return ResponseEntity.ok(new AuthResponse(token, user));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest authRequest) {
        try {
            // Check if username already exists
            if (userService.findByUsername(authRequest.getUsername()) != null) {
                return ResponseEntity.status(400).body("Username already exists");
            }

            // Create new user with default USER role
            UserDTO newUser = new UserDTO();
            newUser.setUsername(authRequest.getUsername());
            newUser.setPassword(authRequest.getPassword());
            newUser.setEmail(authRequest.getEmail());
            newUser.setRoles(java.util.Set.of(Role.USER)); // Default role
            
            UserDTO createdUser = userService.createUser(newUser);
            
            // Generate token for the new user
            String token = jwtUtil.generateToken(authRequest.getUsername());
            
            return ResponseEntity.ok(new AuthResponse(token, createdUser));
            
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        
        String username = userDetails.getUsername();
        UserDTO user = userService.findByUsername(username);
        
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        
        return ResponseEntity.ok(user);
    }
}
