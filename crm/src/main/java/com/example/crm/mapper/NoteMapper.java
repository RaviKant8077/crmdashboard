package com.example.crm.mapper;

import com.example.crm.dto.*;
import com.example.crm.model.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NoteMapper {
    NoteDTO toDTO(Note save);
    Note toEntity(NoteDTO noteDTO);

    NoteDTO toDto(Note save);
}