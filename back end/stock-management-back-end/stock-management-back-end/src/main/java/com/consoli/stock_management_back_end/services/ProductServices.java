package com.consoli.stock_management_back_end.services;


import com.consoli.stock_management_back_end.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.consoli.stock_management_back_end.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServices {

    @Autowired
    ProductRepository productRepository;


    public List<Product> getAll(){
        return productRepository.findAll();
    }

    public Optional<Product> getById(Long id){
        return productRepository.findById(id);
    }

    public boolean deleteById(Long id){
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }

    public Product save (Product product){
        return productRepository.save(product);
    }

    public Product updateById(Long id, Product productDetails) {
        Optional<Product> existingProductOpt = productRepository.findById(id);
        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();
            existingProduct.setName(productDetails.getName());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setQuantity(productDetails.getQuantity());

            return productRepository.save(existingProduct);
        } else {
            return null;
        }
    }
}
