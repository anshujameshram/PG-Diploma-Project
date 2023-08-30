package com.fabricbazar.fabricbazar.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String category;
    private String subctegory;

    public Category() {
        super();
    }
    public Category(Long id, String category, String subctegory) {
        super();
        this.id = id;
        this.category = category;
        this.subctegory = subctegory;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getSubctegory() {
        return subctegory;
    }
    public void setSubctegory(String subctegory) {
        this.subctegory = subctegory;
    }
}



