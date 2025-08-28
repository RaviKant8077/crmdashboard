package com.example.crm.mapper;

import com.example.crm.dto.NoteDTO;
import com.example.crm.model.Note;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NoteMapper {
    
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "deal.id", target = "dealId")
    NoteDTO toDto(Note note);

    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "deal", ignore = true)
    Note toEntity(NoteDTO noteDTO);
}
