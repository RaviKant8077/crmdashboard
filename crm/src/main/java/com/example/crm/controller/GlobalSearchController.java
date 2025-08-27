package com.example.crm.controller;

import com.example.crm.service.GlobalSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class GlobalSearchController {

    @Autowired
    private GlobalSearchService globalSearchService;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/global")
    public ResponseEntity<List<Object>> globalSearch(@RequestParam String query) {
        List<Object> results = globalSearchService.globalSearch(query);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/customers")
    public ResponseEntity<List<?>> searchCustomers(@RequestParam String query) {
        return new ResponseEntity<>(globalSearchService.searchCustomers(query), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/deals")
    public ResponseEntity<List<?>> searchDeals(@RequestParam String query) {
        return new ResponseEntity<>(globalSearchService.searchDeals(query), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/tasks")
    public ResponseEntity<List<?>> searchTasks(@RequestParam String query) {
        return new ResponseEntity<>(globalSearchService.searchTasks(query), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/contacts")
    public ResponseEntity<List<?>> searchContacts(@RequestParam String query) {
        return new ResponseEntity<>(globalSearchService.searchContacts(query), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/users")
    public ResponseEntity<List<?>> searchUsers(@RequestParam String query) {
        return new ResponseEntity<>(globalSearchService.searchUsers(query), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/notes")
    public ResponseEntity<List<?>> searchNotes(@RequestParam String query) {
        return new ResponseEntity<>(globalSearchService.searchNotes(query), HttpStatus.OK);
    }
}
