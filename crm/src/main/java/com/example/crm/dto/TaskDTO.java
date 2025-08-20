package com.example.crm.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Data
public class TaskDTO {
    private Long id;

    @NotBlank
    private String description;

    private LocalDate dueDate;

    @NotBlank
    private String status;

    private String priority;

    private Long customerId;
    private String customerName;
    
    private Long assignedUserId;
    private String assignedUserName;
}
