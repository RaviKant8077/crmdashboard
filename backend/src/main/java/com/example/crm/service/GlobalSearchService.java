package com.example.crm.service;

import com.example.crm.dto.*;
import java.util.List;

public interface GlobalSearchService {
    List<CustomerDTO> searchCustomers(String query);
    List<DealDTO> searchDeals(String query);
    List<TaskDTO> searchTasks(String query);
    List<ContactDTO> searchContacts(String query);
    List<UserDTO> searchUsers(String query);
    List<NoteDTO> searchNotes(String query);
    
    List<Object> globalSearch(String query);
}
