package com.example.crm.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class DealDTO {
    private Long id;

    @NotBlank(message = "Deal name is required")
    private String dealName;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private Double amount;

    @NotBlank
    private String stage;

    private LocalDate dealDate;
    private String priority;
    private Long customerId;
}
