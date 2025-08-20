package com.example.crm.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.validation.constraints.NotNull;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 20, message = "Username must be 4-20 characters long")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    /*@NotBlank(message = "Role is required")
    @Pattern(regexp = "ADMIN|SALES|SUPPORT", message = "Role must be ADMIN, SALES, or SUPPORT")
    private Role role;*/

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Customer> customers;

    public User(Object o, String adminUser, String mail, String password, String admin, LocalDateTime now) {
    }

    @Enumerated(EnumType.STRING)  
    @NotNull(message = "Role must be specified")
    private Set<Role> roles;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "ROle must be specified")
    private Role role;


}