package com.example.crm.repository;

import com.example.crm.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    
    @Query("SELECT n FROM Note n WHERE n.customer.id = :customerId")
    List<Note> findByCustomerId(@Param("customerId") Long customerId);
    
    @Query("SELECT n FROM Note n WHERE n.deal.id = :dealId")
    List<Note> findByDealId(@Param("dealId") Long dealId);

    @Query("SELECT n FROM Note n WHERE LOWER(n.content) LIKE LOWER(CONCAT('%', :content, '%'))")
    List<Note> searchBySubject(@Param("content") String content);
}
