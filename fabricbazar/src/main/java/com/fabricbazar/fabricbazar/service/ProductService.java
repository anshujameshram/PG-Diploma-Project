package com.fabricbazar.fabricbazar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fabricbazar.fabricbazar.Repository.ProductRepository;
import com.fabricbazar.fabricbazar.entity.Product;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    Optional<Product> aProduct = null;

    public List<Product> getProducts(){
        List<Product> allProducts = (List<Product>) this.productRepository.findAll();
        return allProducts;
    }

    public Optional<Product> getProduct(Integer id){
        aProduct = this.productRepository.findById(id);
        return aProduct;
    }

    public String createProduct(Product newProduct){
        try {
            this.productRepository.save(newProduct);
            return "Added";
        } catch (Exception e) {
            return  "Error : "+e.getMessage();
        }
    }

    public String updateProduct(Product newProduct){
        try {
            this.productRepository.save(newProduct);
            return "Updated";
        } catch (Exception e) {
            return  "Error : "+e.getMessage();
        }
    }

    public String deleteProduct(Integer id){
        try {
            this.productRepository.deleteById(id);
            return  "Deleted";
        } catch (Exception e) {
            return "Error : "+e.getMessage();
        }
    }

    public List<Product> searchProduct(String word){
        return this.productRepository.findByPnameContaining(word);
    }

    public List<Product> getNewProducts(){
        return this.productRepository.getNew4Products();
    }

    public List<Product> getByCatSubcat(String category, String subctegory){
        return this.productRepository.findAllByCategoryAndSubctegory(category, subctegory);
    }

}
