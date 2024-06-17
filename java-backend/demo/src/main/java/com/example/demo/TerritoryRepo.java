package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface TerritoryRepo extends JpaRepository<EmployeeTerritory, Long> {
    @Query(value = "SELECT COUNT(et.employeeId) " +
            "FROM employeeterritory et " +
            "NATURAL JOIN region r " +
            "NATURAL JOIN territory t " +
            "GROUP BY r.regionId", nativeQuery = true)
    List<Long> countEmployeesByRegion();
}
