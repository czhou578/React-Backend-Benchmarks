package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SalesRepo extends JpaRepository<SalesOrder, Long> {
    @Query(value = "DELETE from salesorder ORDER BY orderId DESC limit 1")
    void deleteByOrderIdDescLimitOne();
}
