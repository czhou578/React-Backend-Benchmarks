package com.example.demo;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
    // @Query(value = "INSERT INTO category (categoryName, description, picture)
    // VALUES ('Seafood', 'tasty', null)")
    // void insertCategory();
}
