package com.example.crm.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import com.example.crm.util.PasswordUtil;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Customer> customers;

    @Enumerated(EnumType.STRING)  
    @NotNull(message = "Role must be specified")
    private Set<Role> roles;

    public User(Object o, String adminUser, String mail, String password, String admin, LocalDateTime now) {
    }
    
    /**
     * Encodes the password using the PasswordUtil
     * This method should be called before saving the user
     */
    public void encodePassword(PasswordUtil passwordUtil) {
        if (this.password != null && !this.password.trim().isEmpty()) {
            this.password = passwordUtil.encodePassword(this.password);
        }
    }
    
    /**
     * Verifies if the provided plain password matches the encoded password
     * @param plainPassword the plain text password to verify
     * @param passwordUtil the password utility instance
     * @return true if passwords match, false otherwise
     */
    public boolean verifyPassword(String plainPassword, PasswordUtil passwordUtil) {
        return passwordUtil.matches(plainPassword, this.password);
    }
    
    /**
     * Checks if the password needs re-encoding
     * @param passwordUtil the password utility instance
     * @return true if password encoding is outdated
     */
    public boolean needsPasswordReencoding(PasswordUtil passwordUtil) {
        return passwordUtil.needsReencoding(this.password);
    }
}
