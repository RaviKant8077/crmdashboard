package com.example.crm.repository;

import com.example.crm.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByCustomerId(Long customerId);
    List<Note> findByDealId(Long dealId);
}