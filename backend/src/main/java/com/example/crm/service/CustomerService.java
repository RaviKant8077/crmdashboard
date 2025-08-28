package com.example.crm.service;

import com.example.crm.dto.CustomerDTO;
import java.util.List;

public interface CustomerService {
    CustomerDTO createCustomer(CustomerDTO customerDTO);
    CustomerDTO getCustomerById(Long id);
    List<CustomerDTO> getAllCustomers();
    CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO);
    void deleteCustomer(Long id);

    List<CustomerDTO> getCustomersByUserId(Long userId);
    List<CustomerDTO> searchCustomersByName(String name);
    List<CustomerDTO> getCustomersByCity(String city);
    List<CustomerDTO> getCustomersByState(String state);
    List<CustomerDTO> getCustomersByCountry(String country);

    List<CustomerDTO> searchByName(String query);
}