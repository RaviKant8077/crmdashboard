package com.example.crm.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CustomerDTO {
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 4)
    private String name;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$")
    private String phone;

    private String companyName;
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;

    private LocalDateTime createdDate;
    private LocalDateTime lastUpdated;

    private Long userId;
}