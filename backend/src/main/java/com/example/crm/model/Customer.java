package com.example.crm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "customers")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 4, message = "Name must be at least 4 characters long")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Phone must be valid and contain 10-15 digits")
    private String phone;

    @Size(max = 100, message = "Company name cannot exceed 100 characters")
    private String companyName;

    private String address;
    private String city;
    private String state;
    private String country;

    @Size(max = 10, message = "Postal code must be 10 characters or less")
    private String postalCode;

    private LocalDateTime createdDate;
    private LocalDateTime lastUpdated;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Deal> deals;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Task> tasks;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Contact> contacts;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Note> notes;

    @PrePersist
    public void onCreate() {
        createdDate = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }
}