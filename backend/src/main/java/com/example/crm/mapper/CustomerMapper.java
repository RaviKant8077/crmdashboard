package com.example.crm.mapper;

import com.example.crm.dto.*;
import com.example.crm.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    @Mapping(source = "user.id", target = "userId")
    CustomerDTO toDto(Customer customer);

    @Mapping(target = "user", expression = "java(mapUser(customerDTO.getUserId()))")
    Customer toEntity(CustomerDTO customerDTO);

    // Helper method to create a User object from userId
    default User mapUser(Long userId) {
        if (userId == null) return null;
        User user = new User();
        user.setId(userId);
        return user;
    }
}