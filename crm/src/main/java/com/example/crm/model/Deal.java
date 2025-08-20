package com.example.crm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "deals")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Deal name is required")
    private String dealName;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be positive")
    private Double amount;

    @NotBlank(message = "Stage is required")
    private String stage; // e.g., "New", "In Progress", "Closed"

    private LocalDate dealDate;

    private String priority; // e.g., "High", "Medium", "Low"

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "deal", cascade = CascadeType.ALL)
    private List<Note> notes;
}