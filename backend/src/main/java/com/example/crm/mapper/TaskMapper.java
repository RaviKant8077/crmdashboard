package com.example.crm.mapper;

import com.example.crm.dto.*;
import com.example.crm.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    default Long mapCustomerToId(Customer customer) {
        return customer != null ? customer.getId() : null;
    }

    default String mapCustomerToName(Customer customer) {
        return customer != null ? customer.getName() : null;
    }

    @Mapping(target = "customerId", expression = "java(mapCustomerToId(task.getCustomer()))")
    @Mapping(target = "customerName", expression = "java(mapCustomerToName(task.getCustomer()))")
    TaskDTO toDto(Task task);

    @Mapping(target = "customer", expression = "java(createCustomerFromIds(taskDTO.getCustomerId(), taskDTO.getCustomerName()))")
    Task toEntity(TaskDTO taskDTO);

    default Customer createCustomerFromIds(Long customerId, String customerName) {
        if (customerId == null) return null;
        Customer customer = new Customer();
        customer.setId(customerId);
        customer.setName(customerName);
        return customer;
    }
}

