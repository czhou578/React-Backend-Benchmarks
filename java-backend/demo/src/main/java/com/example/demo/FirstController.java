package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin
public class FirstController {

    @Autowired
    CategoryRepo repo;

    @GetMapping("/category")
    public List<Category> index() {
        return repo.findAll();
    }

}
