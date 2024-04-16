package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int categoryId;
    private String categoryName;
    private String description;

    public Category() {
    }

    public Category(int id, String category, String descript) {
        this.setId(id);
        this.setCategory(category);
        this.setDescription(descript);
    }

    public void setId(int id) {
        this.categoryId = id;
    }

    public void setCategory(String category) {
        this.categoryName = category;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return categoryId;
    }

    public String getCategory() {
        return categoryName;
    }

    public String getDescription() {
        return description;
    }

    // @Override
    // public String toString() {
    // return "Repo{" +
    // "id=" + id +
    // ", title='" + categoryName + ''' +
    // ", description='" + description + ''' +
    // '}';
    // }

}
