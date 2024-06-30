package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.lang.String;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping
public class FirstController {

    @Autowired
    private InsertCategoryService categoryService;
    @Autowired
    private ShipperRepo shippers;
    @Autowired
    private UpdateProductService productService;
    @Autowired
    private SalesRepo sales;

    @Autowired
    private EmployeeTerritoryService employeeTerritoryService;

    @GetMapping("/java/employee-region")
    public List<Long> getEmployeeCountByRegion() {
        return employeeTerritoryService.countEmployeesByRegion();
    }

    @PostMapping("/java/category")
    @CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "false")
    public Category insertCategory() {
        return categoryService.insertAndSaveCategory();
    }

    @GetMapping("/java/shippers")
    public List<Shipper> allShippers() {
        return shippers.findAll();
    }

    @PutMapping("/java/product")
    @CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "false")
    public Product updateProductName() {

        return productService.updateProduct();
    }

    @RequestMapping(value = "/java/delete-sales", method = { RequestMethod.DELETE })
    @CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "false")

    public String deleteSales() {
        sales.deleteByOrderIdDescLimitOne();
        return "1 Sales deleted";
    }

}
