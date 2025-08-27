package com.example.crm.service;

import com.example.crm.dto.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GlobalSearchServiceImplTest {

    @Mock
    private CustomerService customerService;

    @Mock
    private DealService dealService;

    @Mock
    private TaskService taskService;

    @Mock
    private ContactService contactService;

    @Mock
    private UserService userService;

    @Mock
    private NoteService noteService;

    @InjectMocks
    private GlobalSearchServiceImpl globalSearchService;

    private CustomerDTO customerDTO;
    private DealDTO dealDTO;
    private TaskDTO taskDTO;
    private ContactDTO contactDTO;
    private UserDTO userDTO;
    private NoteDTO noteDTO;

    @BeforeEach
    void setUp() {
        customerDTO = new CustomerDTO();
        customerDTO.setId(1L);
        customerDTO.setName("Test Customer");

        dealDTO = new DealDTO();
        dealDTO.setId(1L);
        dealDTO.setTitle("Test Deal");

        taskDTO = new TaskDTO();
        taskDTO.setId(1L);
        taskDTO.setTitle("Test Task");

        contactDTO = new ContactDTO();
        contactDTO.setId(1L);
        contactDTO.setName("Test Contact");

        userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setName("Test User");

        noteDTO = new NoteDTO();
        noteDTO.setId(1L);
        noteDTO.setSubject("Test Note");
    }

    @Test
    void searchCustomers_ShouldReturnCustomerList() {
        when(customerService.searchByName("test")).thenReturn(Arrays.asList(customerDTO));

        List<CustomerDTO> result = globalSearchService.searchCustomers("test");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Customer", result.get(0).getName());
        verify(customerService).searchByName("test");
    }

    @Test
    void searchDeals_ShouldReturnDealList() {
        when(dealService.searchByTitle("test")).thenReturn(Arrays.asList(dealDTO));

        List<DealDTO> result = globalSearchService.searchDeals("test");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Deal", result.get(0).getTitle());
        verify(dealService).searchByTitle("test");
    }

    @Test
    void searchTasks_ShouldReturnTaskList() {
        when(taskService.searchByTitle("test")).thenReturn(Arrays.asList(taskDTO));

        List<TaskDTO> result = globalSearchService.searchTasks("test");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
        verify(taskService).searchByTitle("test");
    }

    @Test
    void searchContacts_ShouldReturnContactList() {
        when(contactService.searchByName("test")).thenReturn(Arrays.asList(contactDTO));

        List<ContactDTO> result = globalSearchService.searchContacts("test");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Contact", result.get(0).getName());
        verify(contactService).searchByName("test");
    }

    @Test
    void searchUsers_ShouldReturnUserList() {
        when(userService.searchByName("test")).thenReturn(Arrays.asList(userDTO));

        List<UserDTO> result = globalSearchService.searchUsers("test");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test User", result.get(0).getName());
        verify(userService).searchByName("test");
    }

    @Test
    void searchNotes_ShouldReturnNoteList() {
        when(noteService.searchBySubject("test")).thenReturn(Arrays.asList(noteDTO));

        List<NoteDTO> result = globalSearchService.searchNotes("test");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Note", result.get(0).getSubject());
        verify(noteService).searchBySubject("test");
    }

    @Test
    void globalSearch_ShouldReturnCombinedResults() {
        when(customerService.searchByName("test")).thenReturn(Arrays.asList(customerDTO));
        when(dealService.searchByTitle("test")).thenReturn(Arrays.asList(dealDTO));
        when(taskService.searchByTitle("test")).thenReturn(Arrays.asList(taskDTO));
        when(contactService.searchByName("test")).thenReturn(Arrays.asList(contactDTO));
        when(userService.searchByName("test")).thenReturn(Arrays.asList(userDTO));
        when(noteService.searchBySubject("test")).thenReturn(Arrays.asList(noteDTO));

        List<Object> result = globalSearchService.globalSearch("test");

        assertNotNull(result);
        assertEquals(6, result.size());
        verify(customerService).searchByName("test");
        verify(dealService).searchByTitle("test");
        verify(taskService).searchByTitle("test");
        verify(contactService).searchByName("test");
        verify(userService).searchByName("test");
        verify(noteService).searchBySubject("test");
    }
}
