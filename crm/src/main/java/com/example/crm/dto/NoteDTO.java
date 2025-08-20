package com.example.crm.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NoteDTO {
    private Long id;

    @NotBlank
    private String content;

    private LocalDateTime createdAt;
    private Long customerId;
    private Long dealId;
}