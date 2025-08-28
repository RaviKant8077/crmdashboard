package com.example.crm.service;

import com.example.crm.dto.ContactDTO;
import com.example.crm.mapper.ContactMapper;
import com.example.crm.model.Contact;
import com.example.crm.model.Customer;
import com.example.crm.repository.ContactRepository;
import com.example.crm.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return contactMapper.toDTO(contactRepository.save(contact));
    }

    @Override
    @Transactional(readOnly = true)
    public ContactDTO getContactById(Long id) {
        Contact contact = contactRepository.findById(id).orElseThrow();
        // Ensure customer relationship is loaded
        if (contact.getCustomer() != null) {
            contact.getCustomer().getId();
        }
        return contactMapper.toDTO(contact);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactDTO> getAllContacts() {
        System.out.println("=== DEBUG: getAllContacts called ===");
        List<Contact> contacts = contactRepository.findAllWithCustomer();
        System.out.println("=== DEBUG: Found " + contacts.size() + " contacts ===");
        
        if (contacts.isEmpty()) {
            System.out.println("=== DEBUG: No contacts found in database ===");
        } else {
            contacts.forEach(contact -> {
                System.out.println("Contact: " + contact.getName() + " - " + contact.getEmail());
            });
        }
        
        return contacts.stream()
                .map(contactMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {
        Contact contact = contactRepository.findById(id).orElseThrow();
        contact.setName(contactDTO.getName());
        contact.setEmail(contactDTO.getEmail());
        contact.setPhone(contactDTO.getPhone());
        contact.setPosition(contactDTO.getPosition());
        
        // Set customer if customerId is provided
        if (contactDTO.getCustomerId() != null) {
            Customer customer = new Customer();
            customer.setId(contactDTO.getCustomerId());
            contact.setCustomer(customer);
        }
        
        return contactMapper.toDTO(contactRepository.save(contact));
    }

    @Override
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactDTO> getContactsByCustomerId(Long customerId) {
        return contactRepository.findByCustomerIdWithCustomer(customerId).stream()
                .map(contactMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactDTO> searchByName(String query) {
        return contactRepository.searchByName(query).stream()
                .map(contactMapper::toDTO)
                .collect(Collectors.toList());
    }
}
