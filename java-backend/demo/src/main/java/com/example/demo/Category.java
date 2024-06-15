package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryId;
    private String categoryName;
    private String description;
    private byte[] picture;

    public Category() {
    }

    public Category(String category, String descript, byte[] productImage) {
        this.setCategory(category);
        this.setDescription(descript);
        this.setPicture(productImage);
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

    public void setPicture(byte[] image) {
        this.picture = image;
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

    public byte[] getImage() {
        return picture;
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
