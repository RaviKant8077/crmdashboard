package com.example.crm.repository;

import com.example.crm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r = :role")
    List<User> findAllByRole(@Param("role") String role);

    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.customers")
    List<User> findAllWithCustomers();
    
    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.customers WHERE u.id = :id")
    Optional<User> findByIdWithCustomers(@Param("id") Long id);

    @Query("SELECT u FROM User u WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :username, '%'))")
    List<User> searchByName(@Param("username") String username);
}
