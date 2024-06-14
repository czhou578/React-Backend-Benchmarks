package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepo extends JpaRepository<Product, Integer> {

    // @Modifying
    // @Query(value = "UPDATE product SET productName = 'Product 1' WHERE productId
    // = 55", nativeQuery = true)
    // String updateProduct();

}
