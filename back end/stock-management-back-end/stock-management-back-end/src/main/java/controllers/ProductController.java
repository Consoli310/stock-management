package controllers;


import entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.ProductServices;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductServices productServices;

    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        List<Product> products = productServices.getAll();
        return ResponseEntity.ok(products);
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return productServices.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/products/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        if (productServices.deleteById(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        Product savedProduct = productServices.save(product);
        return ResponseEntity.ok(savedProduct);
    }


}
