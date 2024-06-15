package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class SalesOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderId;
    private int custId;
    private int employeeId;
    private LocalDateTime orderDate;
    private LocalDateTime requiredDate;
    private LocalDateTime shippedDate;
    private int shipperid;
    private BigDecimal freight;
    private String shipName;
    private String shipAddress;
    private Short shipCity;
    private Short shipRegion;
    private Short shipPostalCode;
    private char shipCountry;

    public SalesOrder() {
    }

}
