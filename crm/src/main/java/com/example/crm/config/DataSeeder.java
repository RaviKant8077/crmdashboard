package com.example.crm.config;

import com.example.crm.model.*;
import com.example.crm.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Set;
import com.example.crm.model.Role;


@Configuration
public class DataSeeder {
/*
    @Bean
    public CommandLineRunner seedDatabase(UserRepository userRepo, CustomerRepository customerRepo, 
                                          DealRepository dealRepo, TaskRepository taskRepo, 
                                          ContactRepository contactRepo, NoteRepository noteRepo,
                                          PasswordEncoder passwordEncoder) {
        return args -> {
           User admin = new User();
           admin.setUsername("manager1");
           admin.setEmail("manager1@example.com");
           admin.setPassword(passwordEncoder.encode("password"));
           admin.setRoles(Set.of(Role.ADMIN));
           userRepo.save(admin);

            Customer customer = new Customer();
            customer.setName("John Doe");
            customer.setEmail("john@example.com");
            customer.setPhone("1234567890");
            customer.setCompanyName("Doe Inc.");
            customer.setCity("New York");
            customer.setState("NY");
            customer.setCountry("USA");
            customer.setPostalCode("10001");
            customer.setCreatedDate(LocalDateTime.now());
            customer.setLastUpdated(LocalDateTime.now());
            customer.setUser(admin);
            customerRepo.save(customer);

            Deal deal = new Deal();
            deal.setDealName("Website Development");
            deal.setAmount(5000.0);
            deal.setStage("Negotiation");
            deal.setDealDate(LocalDate.now());
            deal.setPriority("High");
            deal.setCustomer(customer);
            dealRepo.save(deal);

            Task task = new Task();
            task.setDescription("Follow up with John");
            task.setDueDate(LocalDate.now().plusDays(5));
            task.setStatus("Pending");
            task.setPriority("High");
            task.setCustomer(customer);
            taskRepo.save(task);

            Contact contact = new Contact();
            contact.setName("Jane Smith");
            contact.setEmail("jane@example.com");
            contact.setPhone("0987654321");
            contact.setPosition("Manager");
            contact.setCustomer(customer);
            contactRepo.save(contact);

            Note note = new Note();
            note.setContent("Met with John to discuss requirements.");
            note.setCreatedAt(LocalDateTime.now());
            note.setCustomer(customer);
            note.setDeal(deal);
            noteRepo.save(note);
        };
    }*/
}