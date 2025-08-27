package com.example.crm.repository;

import com.example.crm.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Date;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCustomer_Id(Long customerId);
    List<Task> findByStatus(String status);
    List<Task> findByPriority(String priority);
    List<Task> findByAssignedUser_Id(Long assignedUserId);
    List<Task> findByDueDateBetween(Date startDate, Date endDate);

    @Query("SELECT t FROM Task t WHERE LOWER(t.description) LIKE LOWER(CONCAT('%', :description, '%'))")
    List<Task> searchByTitle(@Param("description") String description);
}
