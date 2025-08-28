package com.example.crm.mapper;

import com.example.crm.dto.UserDTO;
import com.example.crm.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    @Mapping(target = "customers", source = "customers", qualifiedByName = "mapCustomers")
    @Mapping(target = "password", ignore = true) // Don't expose encoded password in DTO
    UserDTO toDTO(User user);
    
    @Mapping(target = "password", source = "password")
    User toEntity(UserDTO userDTO);

    @Mapping(target = "password", ignore = true) // Don't expose encoded password in DTO
    UserDTO toDto(User save);
    
    @Named("mapCustomers")
    default List<UserDTO.CustomerInfo> mapCustomers(List<com.example.crm.model.Customer> customers) {
        if (customers == null) {
            return null;
        }
        return customers.stream()
                .map(customer -> {
                    UserDTO.CustomerInfo info = new UserDTO.CustomerInfo();
                    info.setId(customer.getId());
                    info.setName(customer.getName());
                    info.setEmail(customer.getEmail());
                    return info;
                })
                .collect(Collectors.toList());
    }
}
