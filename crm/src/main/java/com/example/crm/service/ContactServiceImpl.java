package com.example.crm.service;

import com.example.crm.dto.ContactDTO;
import com.example.crm.mapper.ContactMapper;
import com.example.crm.model.Contact;
import com.example.crm.repository.ContactRepository;
import com.example.crm.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ContactMapper contactMapper;

    @Override
    public ContactDTO createContact(ContactDTO contactDTO) {
        Contact contact = contactMapper.toEntity(contactDTO);
        return contactMapper.toDto(contactRepository.save(contact));
    }

    @Override
    public ContactDTO getContactById(Long id) {
        Contact contact = contactRepository.findById(id).orElseThrow();
        return contactMapper.toDto(contact);
    }

    @Override
    public List<ContactDTO> getAllContacts() {
        return contactRepository.findAll().stream()
                .map(contactMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {
        Contact contact = contactRepository.findById(id).orElseThrow();
        contact.setName(contactDTO.getName());
        contact.setEmail(contactDTO.getEmail());
        contact.setPhone(contactDTO.getPhone());
        contact.setPosition(contactDTO.getPosition());
        return contactMapper.toDto(contactRepository.save(contact));
    }

    @Override
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }

    @Override
    public List<ContactDTO> getContactsByCustomerId(Long customerId) {
        return contactRepository.findByCustomerId(customerId).stream()
                .map(contactMapper::toDto)
                .collect(Collectors.toList());
    }
}