package com.example.crm.dto;

import com.example.crm.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;
import java.util.List;

@Data
public class UserDTO {
    private Long id;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 20)
    private String username;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @NotNull(message = "Role must be specified")
    private Set<Role> roles;

    @NotBlank(message = "password must be alphanumeric")
    private String password;

    // Customer information for display purposes
    private List<CustomerInfo> customers;
    
    @Data
    public static class CustomerInfo {
        private Long id;
        private String name;
        private String email;
    }
}
