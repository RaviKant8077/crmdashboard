package com.example.crm.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;


@Data
public class ContactDTO {
    private Long id;

    @NotBlank
    private String name;

    @Email
    private String email;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$")
    private String phone;

    private String position;
    private Long customerId;
}