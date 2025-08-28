package com.example.crm.model;

import com.example.crm.dto.TaskDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Task description is required")
    private String description;

    private LocalDate dueDate;

    @NotBlank(message = "Status is required")
    private String status; // e.g., "Pending", "Completed"


    private String priority; // e.g., "High", "Medium", "Low"

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "assigned_user_id")
    private User assignedUser;
}
