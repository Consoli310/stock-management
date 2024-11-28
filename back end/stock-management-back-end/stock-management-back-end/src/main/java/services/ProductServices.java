package services;


import entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.ProductRepository;

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
}