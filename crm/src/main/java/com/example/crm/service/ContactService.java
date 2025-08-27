package com.example.crm.service;

import com.example.crm.dto.ContactDTO;
import java.util.List;

public interface ContactService {
    ContactDTO createContact(ContactDTO contactDTO);
    ContactDTO getContactById(Long id);
    List<ContactDTO> getAllContacts();
    ContactDTO updateContact(Long id, ContactDTO contactDTO);
    void deleteContact(Long id);

    List<ContactDTO> getContactsByCustomerId(Long customerId);

    List<ContactDTO> searchByName(String query);
}