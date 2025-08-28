package com.example.crm.service;

import com.example.crm.dto.DealDTO;
import com.example.crm.mapper.DealMapper;
import com.example.crm.model.Deal;
import com.example.crm.repository.DealRepository;
import com.example.crm.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DealServiceImpl implements DealService {

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private DealMapper dealMapper;

    @Override
    public DealDTO createDeal(DealDTO dealDTO) {
        Deal deal = dealMapper.toEntity(dealDTO);
        return dealMapper.toDto(dealRepository.save(deal));
    }

    @Override
    public DealDTO getDealById(Long id) {
        Deal deal = dealRepository.findById(id).orElseThrow();
        return dealMapper.toDto(deal);
    }

    @Override
    public List<DealDTO> getAllDeals() {
        return dealRepository.findAll().stream()
                .map(dealMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public DealDTO updateDeal(Long id, DealDTO dealDTO) {
        Deal deal = dealRepository.findById(id).orElseThrow();
        deal.setDealName(dealDTO.getDealName());
        deal.setAmount(dealDTO.getAmount());
        deal.setStage(dealDTO.getStage());
        deal.setDealDate(dealDTO.getDealDate());
        return dealMapper.toDto(dealRepository.save(deal));
    }

    @Override
    public void deleteDeal(Long id) {
        dealRepository.deleteById(id);
    }

    @Override
    public List<DealDTO> getDealsByCustomerId(Long customerId) {
        return dealRepository.findByCustomerId(customerId).stream()
                .map(dealMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DealDTO> getDealsByStage(String stage) {
        return dealRepository.findByStage(stage).stream()
                .map(dealMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DealDTO> sortDeals(List<DealDTO> deals, String sortBy, String sortOrder) {
        if (sortBy == null || sortOrder == null) {
            return deals;
        }

        boolean ascending = "asc".equalsIgnoreCase(sortOrder);

        switch (sortBy.toLowerCase()) {
            case "amount":
                return deals.stream()
                        .sorted((d1, d2) -> ascending 
                                ? Double.compare(d1.getAmount(), d2.getAmount())
                                : Double.compare(d2.getAmount(), d1.getAmount()))
                        .collect(Collectors.toList());
            case "dealname":
                return deals.stream()
                        .sorted((d1, d2) -> ascending 
                                ? d1.getDealName().compareToIgnoreCase(d2.getDealName())
                                : d2.getDealName().compareToIgnoreCase(d1.getDealName()))
                        .collect(Collectors.toList());
            case "dealdate":
                return deals.stream()
                        .sorted((d1, d2) -> ascending 
                                ? d1.getDealDate().compareTo(d2.getDealDate())
                                : d2.getDealDate().compareTo(d1.getDealDate()))
                        .collect(Collectors.toList());
            case "stage":
                return deals.stream()
                        .sorted((d1, d2) -> ascending 
                                ? d1.getStage().compareToIgnoreCase(d2.getStage())
                                : d2.getStage().compareToIgnoreCase(d1.getStage()))
                        .collect(Collectors.toList());
            default:
                return deals;
        }
    }

    @Override
    public List<DealDTO> searchByTitle(String query) {
        return dealRepository.searchByTitle(query).stream()
                .map(dealMapper::toDto)
                .collect(Collectors.toList());
    }
}
