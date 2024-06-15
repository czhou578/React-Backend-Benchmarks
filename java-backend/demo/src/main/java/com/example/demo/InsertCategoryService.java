package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@RequestMapping
@CrossOrigin
public class InsertCategoryService {

    @Autowired
    private CategoryRepo repo;

    // INSERT: INSERT INTO category (categoryName, description, picture) VALUES
    // ('Seafood', 'tasty', null)

    public Category insertAndSaveCategory() {
        Category category = new Category();
        category.setCategory("Seafood");
        category.setDescription("tasty");
        category.setPicture(null);

        return repo.save(category);
    }
}
