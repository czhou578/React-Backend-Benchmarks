package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "region")

public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int regionId;
    private String regionDescription;

}
