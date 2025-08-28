package com.example.crm.repository;

import com.example.crm.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    @Query("SELECT c FROM Contact c LEFT JOIN FETCH c.customer")
    List<Contact> findAllWithCustomer();
    
    @Query("SELECT c FROM Contact c LEFT JOIN FETCH c.customer WHERE c.customer.id = :customerId")
    List<Contact> findByCustomerIdWithCustomer(Long customerId);
    
    List<Contact> findByCustomerId(Long customerId);

    @Query("SELECT c FROM Contact c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Contact> searchByName(@Param("name") String name);
}
