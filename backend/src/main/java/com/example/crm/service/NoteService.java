package com.example.crm.service;

import com.example.crm.dto.NoteDTO;
import java.util.List;

public interface NoteService {
    NoteDTO createNote(NoteDTO noteDTO);
    NoteDTO getNoteById(Long id);
    List<NoteDTO> getAllNotes();
    NoteDTO updateNote(Long id, NoteDTO noteDTO);
    void deleteNote(Long id);

    List<NoteDTO> getNotesByCustomerId(Long customerId);
    List<NoteDTO> getNotesByDealId(Long dealId);

    List<NoteDTO> searchBySubject(String query);
}