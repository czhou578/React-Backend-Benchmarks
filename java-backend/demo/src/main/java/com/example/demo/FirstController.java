package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.lang.String;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@CrossOrigin
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

    @GetMapping("/category")
    public Category insertCategory() {
        return categoryService.insertAndSaveCategory();
    }

    @GetMapping("/shippers")
    public List<Shipper> allShippers() {
        return shippers.findAll();
    }

    @RequestMapping(value = "/product", method = { RequestMethod.GET, RequestMethod.PUT })
    public Product updateProductName() {

        return productService.updateProduct();
    }

    @GetMapping("/delete-sales")
    public String deleteSales() {
        sales.deleteByOrderIdDescLimitOne();
        return "1 Sales deleted";
    }

}
