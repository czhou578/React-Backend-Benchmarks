package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;
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
    private SalesService salesService;

    @Autowired
    private EmployeeTerritoryService employeeTerritoryService;

    @GetMapping("/java/employee-region")
    @CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "false")
    public List<Long> getEmployeeCountByRegion() {
        return employeeTerritoryService.countEmployeesByRegion();
    }

    @PostMapping("/java/category")
    @CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "false")
    public Category insertCategory() {
        return categoryService.insertAndSaveCategory();
    }

    @GetMapping("/java/shippers")
    @CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "false")
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

    public ResponseEntity<?> deleteSales() {
        try {
            salesService.deleteLastSalesOrderWithRetry();
            Map<String, String> response = new HashMap<>();
            response.put("message", "Last sales order deleted!");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting last sales");
        }

    }

}
