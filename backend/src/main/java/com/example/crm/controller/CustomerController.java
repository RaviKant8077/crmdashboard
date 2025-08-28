package com.example.crm.controller;

import com.example.crm.dto.CustomerDTO;
import com.example.crm.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @PostMapping("/create/customer")
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customerDTO) {
        CustomerDTO createdCustomer = customerService.createCustomer(customerDTO);
        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/allCustomers")
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        List<CustomerDTO> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/getByCustomerId/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        CustomerDTO customer = customerService.getCustomerById(id);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @PutMapping("/update/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO customerDTO) {
        CustomerDTO updatedCustomer = customerService.updateCustomer(id, customerDTO);
        return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/searchByName")
    public ResponseEntity<List<CustomerDTO>> searchCustomersByName(@RequestParam String name) {
        List<CustomerDTO> customers = customerService.searchCustomersByName(name);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/search/global")
    public ResponseEntity<List<CustomerDTO>> globalSearch(@RequestParam String query) {
        List<CustomerDTO> customers = customerService.searchCustomersByName(query);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/byCityName")
    public ResponseEntity<List<CustomerDTO>> getCustomersByCity(@RequestParam String city) {
        List<CustomerDTO> customers = customerService.getCustomersByCity(city);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/byStateName")
    public ResponseEntity<List<CustomerDTO>> getCustomersByState(@RequestParam String state) {
        List<CustomerDTO> customers = customerService.getCustomersByState(state);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/byCountryName")
    public ResponseEntity<List<CustomerDTO>> getCustomersByCountry(@RequestParam String country) {
        List<CustomerDTO> customers = customerService.getCustomersByCountry(country);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT', 'USER')")
    @GetMapping("/getCustomer/byUser/{userId}")
    public ResponseEntity<List<CustomerDTO>> getCustomersByUserId(@PathVariable Long userId) {
        List<CustomerDTO> customers = customerService.getCustomersByUserId(userId);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }
}
