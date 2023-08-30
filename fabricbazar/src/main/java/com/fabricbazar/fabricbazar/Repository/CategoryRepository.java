package com.fabricbazar.fabricbazar.Repository;

import org.springframework.data.repository.CrudRepository;

import com.fabricbazar.fabricbazar.entity.Category;

public interface CategoryRepository extends CrudRepository<Category, Long> {

    
}
