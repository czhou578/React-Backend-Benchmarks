package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "shipper")
public class Shipper {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int shipperId;
    private String companyName;
    private String phone;

    public Shipper() {
    }

    public Shipper(int id, String company, String phone) {
        this.shipperId = id;
        this.companyName = company;
        this.phone = phone;
    }

    public void setId(int id) {
        this.shipperId = id;
    }

    public void setCompanyName(String company) {
        this.companyName = company;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getId() {
        return shipperId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getDescription() {
        return phone;
    }

}
