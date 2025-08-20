package com.example.crm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "notes")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Note content cannot be empty")
    private String content;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = true)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "deal_id", nullable = true)
    private Deal deal;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
