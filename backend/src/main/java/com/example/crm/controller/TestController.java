package com.example.crm.controller;

import com.example.crm.model.Contact;
import com.example.crm.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private ContactRepository contactRepository;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/contact-count")
    public String getContactCount() {
        long count = contactRepository.count();
        return "Total contacts in database: " + count;
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/contacts-raw")
    public List<Contact> getRawContacts() {
        return contactRepository.findAll();
    }
}
