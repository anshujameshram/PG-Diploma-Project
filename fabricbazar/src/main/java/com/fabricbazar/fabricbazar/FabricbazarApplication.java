package com.fabricbazar.fabricbazar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.fabricbazar.fabricbazar.Repository.ProductRepository;

@SpringBootApplication
public class FabricbazarApplication {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(FabricbazarApplication.class, args);

		ProductRepository productRepository = context.getBean(ProductRepository.class);

		// Product product = new Product(1, "Floral T Shirts", "M size, Full sleves, rounded neck, pure cotton");
		// product = productRepository.save(product);
		// System.out.println(product);

		// //		To get all products
		// Iterable<Product> itr = productRepository.findAll();
		// System.out.println("All Products List : ");
		// itr.forEach(pro-> {System.out.println(pro);});
		
		System.out.println("All Products List : ");
	}
}
