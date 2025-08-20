package com.example.crm.mapper;

import com.example.crm.dto.DealDTO;
import com.example.crm.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface DealMapper {

    @Mapping(source = "customer.id", target = "customerId")
    DealDTO toDto(Deal deal);
    
    @Mapping(source = "customerId", target = "customer.id")
    Deal toEntity(DealDTO dealDTO);

}
