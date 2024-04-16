package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepo extends JpaRepository<Product, Long> {

    @Query(value = "UPDATE product SET productName = 'Product 1' WHERE productId = 55")
    void updateProduct();
}
