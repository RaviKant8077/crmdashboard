package com.example.crm.service;

import com.example.crm.dto.CustomerDTO;
import com.example.crm.mapper.CustomerMapper;
import com.example.crm.model.Customer;
import com.example.crm.repository.CustomerRepository;
import com.example.crm.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        Customer customer = customerMapper.toEntity(customerDTO);
        customer.setCreatedDate(LocalDateTime.now());
        customer.setLastUpdated(LocalDateTime.now());
        return customerMapper.toDto(customerRepository.save(customer));
    }

    @Override
    public CustomerDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow();
        return customerMapper.toDto(customer);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(customerMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
        Customer customer = customerRepository.findById(id).orElseThrow();
        customer.setName(customerDTO.getName());
        customer.setEmail(customerDTO.getEmail());
        customer.setPhone(customerDTO.getPhone());
        customer.setCompanyName(customerDTO.getCompanyName());
        customer.setAddress(customerDTO.getAddress());
        customer.setCity(customerDTO.getCity());
        customer.setState(customerDTO.getState());
        customer.setCountry(customerDTO.getCountry());
        customer.setPostalCode(customerDTO.getPostalCode());
        customer.setLastUpdated(LocalDateTime.now());
        return customerMapper.toDto(customerRepository.save(customer));
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public List<CustomerDTO> getCustomersByUserId(Long userId) {
        return customerRepository.findByUserId(userId).stream()
                .map(customerMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerDTO> searchCustomersByName(String name) {
        return customerRepository.searchByName(name).stream()
                .map(customerMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerDTO> getCustomersByCity(String city) {
        return customerRepository.findByCity(city).stream()
                .map(customerMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerDTO> getCustomersByState(String state) {
        return customerRepository.findByState(state).stream()
                .map(customerMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerDTO> getCustomersByCountry(String country) {
        return customerRepository.findByCountry(country).stream()
                .map(customerMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerDTO> searchByName(String query) {
        return customerRepository.searchByName(query).stream().
                map(customerMapper::toDto)
                .collect(Collectors.toList());
    }
}