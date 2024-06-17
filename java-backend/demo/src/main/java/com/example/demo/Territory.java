package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "territory")
public class Territory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String territoryId;
    private String territorydescription;
    private int regionId;

    public Territory() {

    }

}
