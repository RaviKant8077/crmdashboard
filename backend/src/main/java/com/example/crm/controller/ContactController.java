package com.example.crm.controller;

import com.example.crm.dto.ContactDTO;
import com.example.crm.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @PostMapping("/createContact")
    public ResponseEntity<ContactDTO> createContact(@RequestBody ContactDTO contactDTO) {
        ContactDTO createdContact = contactService.createContact(contactDTO);
        return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/allContact")
    public ResponseEntity<List<ContactDTO>> getAllContacts() {
        List<ContactDTO> contacts = contactService.getAllContacts();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
@GetMapping("/{id}")
    public ResponseEntity<ContactDTO> getContactById(@PathVariable Long id) {
        ContactDTO contact = contactService.getContactById(id);
        return new ResponseEntity<>(contact, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @PutMapping("/{id}")
    public ResponseEntity<ContactDTO> updateContact(@PathVariable Long id, @RequestBody ContactDTO contactDTO) {
        ContactDTO updatedContact = contactService.updateContact(id, contactDTO);
        return new ResponseEntity<>(updatedContact, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/byCustomer/{customerId}")
    public ResponseEntity<List<ContactDTO>> getContactsByCustomerId(@PathVariable Long customerId) {
        List<ContactDTO> contacts = contactService.getContactsByCustomerId(customerId);
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/search")
    public ResponseEntity<List<ContactDTO>> searchByName(@RequestParam String name) {
        List<ContactDTO> contacts = contactService.searchByName(name);
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/search/global")
    public ResponseEntity<List<ContactDTO>> globalSearch(@RequestParam String query) {
        List<ContactDTO> contacts = contactService.searchByName(query);
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }
}
