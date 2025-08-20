package com.example.crm.dto;

import com.example.crm.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class UserDTO {
    private Long id;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 20)
    private String username;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Role must be specified")
    private Set<Role> roles;

    @NotBlank(message = "password must be alphanumeric")
    private String password;
}