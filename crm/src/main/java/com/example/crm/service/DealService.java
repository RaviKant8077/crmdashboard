package com.example.crm.service;

import com.example.crm.dto.DealDTO;
import java.util.List;

public interface DealService {
    DealDTO createDeal(DealDTO dealDTO);
    DealDTO getDealById(Long id);
    List<DealDTO> getAllDeals();
    DealDTO updateDeal(Long id, DealDTO dealDTO);
    void deleteDeal(Long id);

    List<DealDTO> getDealsByCustomerId(Long customerId);
    List<DealDTO> getDealsByStage(String stage);
    List<DealDTO> sortDeals(List<DealDTO> deals, String sortBy, String sortOrder);

    List<DealDTO> searchByTitle(String query);
}
