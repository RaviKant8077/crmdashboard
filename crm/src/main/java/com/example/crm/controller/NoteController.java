package com.example.crm.controller;

import com.example.crm.dto.NoteDTO;
import com.example.crm.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @PostMapping("/createNote")
    public ResponseEntity<NoteDTO> createNote(@RequestBody NoteDTO noteDTO) {
        NoteDTO createdNote = noteService.createNote(noteDTO);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/getAllNotes")
    public ResponseEntity<List<NoteDTO>> getAllNotes() {
        List<NoteDTO> notes = noteService.getAllNotes();
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long id) {
        NoteDTO note = noteService.getNoteById(id);
        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> updateNote(@PathVariable Long id, @RequestBody NoteDTO noteDTO) {
        NoteDTO updatedNote = noteService.updateNote(id, noteDTO);
        return new ResponseEntity<>(updatedNote, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/byCustomer/{customerId}")
    public ResponseEntity<List<NoteDTO>> getNotesByCustomerId(@PathVariable Long customerId) {
        List<NoteDTO> notes = noteService.getNotesByCustomerId(customerId);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/byDeal/{dealId}")
    public ResponseEntity<List<NoteDTO>> getNotesByDealId(@PathVariable Long dealId) {
        List<NoteDTO> notes = noteService.getNotesByDealId(dealId);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/search")
    public ResponseEntity<List<NoteDTO>> searchBySubject(@RequestParam String subject) {
        List<NoteDTO> notes = noteService.searchBySubject(subject);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/search/global")
    public ResponseEntity<List<NoteDTO>> globalSearch(@RequestParam String query) {
        List<NoteDTO> notes = noteService.searchBySubject(query);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }
}
