package com.example.crm.repository;

import com.example.crm.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    @Query("SELECT c FROM Contact c LEFT JOIN FETCH c.customer")
    List<Contact> findAllWithCustomer();
    
    @Query("SELECT c FROM Contact c LEFT JOIN FETCH c.customer WHERE c.customer.id = :customerId")
    List<Contact> findByCustomerIdWithCustomer(Long customerId);
    
    List<Contact> findByCustomerId(Long customerId);
}
