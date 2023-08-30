package com.fabricbazar.fabricbazar.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.fabricbazar.fabricbazar.entity.Product;

public interface ProductRepository extends CrudRepository<Product, Integer> {

    // To search
    public List<Product> findByPnameContaining(String word);

    
    public List<Product> findAllByCategoryAndSubctegory(String category, String subcategory);
	
	@Query(value = "SELECT * FROM product ORDER BY id DESC LIMIT 4", nativeQuery=true)
	List<Product> getNew4Products();


}
