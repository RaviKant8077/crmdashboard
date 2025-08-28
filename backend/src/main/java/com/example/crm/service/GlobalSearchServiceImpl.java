package com.example.crm.service;

import com.example.crm.dto.*;
import com.example.crm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GlobalSearchServiceImpl implements GlobalSearchService {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private DealService dealService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private ContactService contactService;

    @Autowired
    private UserService userService;

    @Autowired
    private NoteService noteService;

    @Override
    public List<CustomerDTO> searchCustomers(String query) {
        return customerService.searchByName(query);
    }

    @Override
    public List<DealDTO> searchDeals(String query) {
        return dealService.searchByTitle(query);
    }

    @Override
    public List<TaskDTO> searchTasks(String query) {

        return taskService.searchByTitle(query);
    }

    @Override
    public List<ContactDTO> searchContacts(String query) {

        return contactService.searchByName(query);
    }

    @Override
    public List<UserDTO> searchUsers(String query)
    {
        return userService.searchByName(query);
    }

    @Override
    public List<NoteDTO> searchNotes(String query) {

        return noteService.searchBySubject(query);
    }

    @Override
    public List<Object> globalSearch(String query) {
        List<Object> results = new ArrayList<>();
        
        // Search across all entities
        results.addAll(searchCustomers(query));
        results.addAll(searchDeals(query));
        results.addAll(searchTasks(query));
        results.addAll(searchContacts(query));
        results.addAll(searchUsers(query));
        results.addAll(searchNotes(query));
        
        return results;
    }
}
