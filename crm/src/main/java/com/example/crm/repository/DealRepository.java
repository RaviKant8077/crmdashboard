package com.example.crm.repository;

import com.example.crm.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {
    List<Deal> findByCustomerId(Long customerId);
    List<Deal> findByStage(String stage);

    @Query("SELECT d FROM Deal d WHERE d.amount >= :minAmount")
    List<Deal> findByMinAmount(@Param("minAmount") Double minAmount);

    @Query("SELECT d FROM Deal d WHERE d.dealDate BETWEEN :startDate AND :endDate")
    List<Deal> findByDealDateRange(@Param("startDate") LocalDate startDate,
                                   @Param("endDate") LocalDate endDate);

    @Query("SELECT d FROM Deal d WHERE LOWER(d.dealName) LIKE LOWER(CONCAT('%', :dealName, '%'))")
    List<Deal> searchByTitle(@Param("dealName") String dealName);
}