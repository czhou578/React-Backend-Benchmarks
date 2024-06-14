package com.example.demo;

import com.example.demo.Product;
import com.example.demo.ProductRepo;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

            return productRepo.save(product);
        }
        return null; // or throw an exception
    }

}
