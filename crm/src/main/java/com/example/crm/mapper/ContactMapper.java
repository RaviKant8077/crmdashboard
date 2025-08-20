package com.example.crm.mapper;

import com.example.crm.dto.*;
import com.example.crm.model.*;
import org.mapstruct.Mapper;



@Mapper(componentModel = "spring")
public interface ContactMapper {
    ContactDTO toDTO(Contact contact);
    Contact toEntity(ContactDTO contactDTO);

    ContactDTO toDto(Contact save);
}