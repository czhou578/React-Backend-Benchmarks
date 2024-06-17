package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "employeeterritory")
@IdClass(EmployeeTerritoryId.class)
public class EmployeeTerritory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int employeeId;
    @Id
    private String territoryId;

    public EmployeeTerritory() {

    }
}
