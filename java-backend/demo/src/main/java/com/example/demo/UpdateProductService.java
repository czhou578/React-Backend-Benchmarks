package com.example.demo;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Service
@RequestMapping
@CrossOrigin
public class UpdateProductService {

    @Autowired
    private ProductRepo productRepo;

    public Product updateProduct() {
        Optional<Product> optionalProduct = productRepo.findById(55);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setProductName("Product 1");
            product.setReorderLevel((short) 1);
            return productRepo.save(product);
        }
        return null; // or throw an exception
    }

}
