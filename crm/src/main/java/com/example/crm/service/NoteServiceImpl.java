package com.example.crm.service.impl;

import com.example.crm.dto.NoteDTO;
import com.example.crm.mapper.NoteMapper;
import com.example.crm.model.Note;
import com.example.crm.repository.NoteRepository;
import com.example.crm.repository.CustomerRepository;
import com.example.crm.repository.DealRepository;
import com.example.crm.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private NoteMapper noteMapper;

    @Override
    public NoteDTO createNote(NoteDTO noteDTO) {
        Note note = noteMapper.toEntity(noteDTO);
        
        // Handle customer relationship
        if (noteDTO.getCustomerId() != null) {
            customerRepository.findById(noteDTO.getCustomerId())
                .ifPresent(note::setCustomer);
        }
        
        // Handle deal relationship
        if (noteDTO.getDealId() != null) {
            dealRepository.findById(noteDTO.getDealId())
                .ifPresent(note::setDeal);
        }
        
        return noteMapper.toDto(noteRepository.save(note));
    }

    @Override
    public NoteDTO getNoteById(Long id) {
        Note note = noteRepository.findById(id).orElseThrow();
        return noteMapper.toDto(note);
    }

    @Override
    public List<NoteDTO> getAllNotes() {
        return noteRepository.findAll().stream()
                .map(noteMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public NoteDTO updateNote(Long id, NoteDTO noteDTO) {
        Note note = noteRepository.findById(id).orElseThrow();
        note.setContent(noteDTO.getContent());
        
        // Handle customer relationship update
        if (noteDTO.getCustomerId() != null) {
            customerRepository.findById(noteDTO.getCustomerId())
                .ifPresent(note::setCustomer);
        } else {
            note.setCustomer(null); // Clear customer if null
        }
        
        // Handle deal relationship update
        if (noteDTO.getDealId() != null) {
            dealRepository.findById(noteDTO.getDealId())
                .ifPresent(note::setDeal);
        } else {
            note.setDeal(null); // Clear deal if null
        }
        
        return noteMapper.toDto(noteRepository.save(note));
    }

    @Override
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    @Override
    public List<NoteDTO> getNotesByCustomerId(Long customerId) {
        return noteRepository.findByCustomerId(customerId).stream()
                .map(noteMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<NoteDTO> searchBySubject(String query) {
        return noteRepository.searchBySubject(query).stream()
                .map(noteMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<NoteDTO> getNotesByDealId(Long dealId) {
        return noteRepository.findByDealId(dealId).stream()
                .map(noteMapper::toDto)
                .collect(Collectors.toList());
    }
}
