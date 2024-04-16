package com.example.demo;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
    // List<Category> findByCategory(String category);
}
