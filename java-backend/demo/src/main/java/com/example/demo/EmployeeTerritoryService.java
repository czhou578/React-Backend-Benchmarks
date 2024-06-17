package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeTerritoryService {

    @Autowired
    private TerritoryRepo employeeTerritoryRepository;

    public List<Long> countEmployeesByRegion() {
        return employeeTerritoryRepository.countEmployeesByRegion();
    }
}
