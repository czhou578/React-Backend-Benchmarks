package com.example.demo;

import java.io.Serializable;
import java.util.Objects;

public class EmployeeTerritoryId implements Serializable {
    private Long employeeId;
    private Long territoryId;

    // Default constructor
    public EmployeeTerritoryId() {
    }

    // Constructor with parameters
    public EmployeeTerritoryId(Long employeeId, Long territoryId) {
        this.employeeId = employeeId;
        this.territoryId = territoryId;
    }

    // Getters and setters
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getTerritoryId() {
        return territoryId;
    }

    public void setTerritoryId(Long territoryId) {
        this.territoryId = territoryId;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        EmployeeTerritoryId that = (EmployeeTerritoryId) o;
        return Objects.equals(employeeId, that.employeeId) &&
                Objects.equals(territoryId, that.territoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employeeId, territoryId);
    }
}
