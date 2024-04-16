package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin
public class FirstController {

    @Autowired
    private CategoryRepo repo;
    private ShipperRepo shippers;
    private SalesRepo sales;

    @GetMapping("/category")
    public List<Category> index() {
        return repo.findAll();
    }

    @GetMapping("/shippers")
    public List<Shipper> allShippers() {
        return shippers.findAll();
    }

    @GetMapping("/delete-sales")
    public String deleteSales() {
        sales.deleteByOrderIdDescLimitOne();
        return "1 Sales deleted";
    }

}
