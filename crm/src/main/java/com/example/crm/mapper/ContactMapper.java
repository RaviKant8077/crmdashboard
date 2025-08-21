package com.example.crm.mapper;

import com.example.crm.dto.ContactDTO;
import com.example.crm.model.Contact;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMapper {
    
    @Mapping(source = "customer.id", target = "customerId")
    ContactDTO toDTO(Contact contact);
    
    @Mapping(source = "customerId", target = "customer.id")
    Contact toEntity(ContactDTO contactDTO);
}
