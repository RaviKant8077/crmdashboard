package com.example.crm.controller;

import com.example.crm.dto.DealDTO;
import com.example.crm.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    @Autowired
    private DealService dealService;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @PostMapping("/createDeal")
    public ResponseEntity<DealDTO> createDeal(@RequestBody DealDTO dealDTO) {
        DealDTO createdDeal = dealService.createDeal(dealDTO);
        return new ResponseEntity<>(createdDeal, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/getAllDeals")
    public ResponseEntity<List<DealDTO>> getAllDeals(
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder) {
        
        List<DealDTO> deals;
        
        if (customerId != null) {
            deals = dealService.getDealsByCustomerId(customerId);
        } else {
            deals = dealService.getAllDeals();
        }
        
        // Handle sorting
        if (sortBy != null && sortOrder != null) {
            deals = dealService.sortDeals(deals, sortBy, sortOrder);
        }
        
        return new ResponseEntity<>(deals, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/getDealBYId/{id}")
    public ResponseEntity<DealDTO> getDealById(@PathVariable Long id) {
        DealDTO deal = dealService.getDealById(id);
        return new ResponseEntity<>(deal, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/updateDealById/{极id}")
    public ResponseEntity<DealDTO> updateDeal(@PathVariable Long id, @RequestBody DealDTO dealDTO) {
        DealDTO updatedDeal = dealService.updateDeal(id, dealDTO);
        return new ResponseEntity<>(updatedDeal, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable Long id) {
        dealService.deleteDeal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/byCustomer/{customerId}")
    public ResponseEntity<List<DealDTO>> getDealsByCustomerId(@PathVariable Long customerId) {
        List<DealDTO> deals = dealService.getDealsByCustomerId(customerId);
        return new ResponseEntity<>(deals, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/byStage")
    public ResponseEntity<List<DealDTO>> getDealsByStage(@RequestParam String stage) {
        List<DealDTO> deals = dealService.getDealsByStage(stage);
        return new ResponseEntity<>(deals, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/search")
    public ResponseEntity<List<DealDTO>> searchByTitle(@RequestParam String title) {
        List<DealDTO> deals = dealService.searchByTitle(title);
        return new ResponseEntity<>(deals, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'SUPPORT')")
    @GetMapping("/search/global")
    public ResponseEntity<List<DealDTO>> globalSearch(@RequestParam String query) {
        List<DealDTO> deals = dealService.searchByTitle(query);
        return new ResponseEntity<>(deals, HttpStatus.OK);
    }
}
