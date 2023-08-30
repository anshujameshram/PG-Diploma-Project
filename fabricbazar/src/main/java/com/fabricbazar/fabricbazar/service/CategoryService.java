package com.fabricbazar.fabricbazar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fabricbazar.fabricbazar.Repository.CategoryRepository;
import com.fabricbazar.fabricbazar.entity.Category;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getCategory(){
        return (List<Category>) (this.categoryRepository.findAll());
    }

}
