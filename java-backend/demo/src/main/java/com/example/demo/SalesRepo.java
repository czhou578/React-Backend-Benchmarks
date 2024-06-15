package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import jakarta.transaction.Transactional;

public interface SalesRepo extends JpaRepository<SalesOrder, Integer> {
    @Modifying
    @Transactional
    @Query(value = "DELETE from salesorder ORDER BY orderId DESC limit 1", nativeQuery = true)
    void deleteByOrderIdDescLimitOne();
}
