package com.example.crm.mapper;

import com.example.crm.dto.*;
import com.example.crm.model.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDTO(User user);
    User toEntity(UserDTO userDTO);

    UserDTO toDto(User save);
}