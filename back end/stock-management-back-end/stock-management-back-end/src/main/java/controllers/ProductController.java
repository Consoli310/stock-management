package controllers;

import entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.ProductServices;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductServices productServices;


    @GetMapping(path = "/products/get")
    public ResponseEntity<List<Product>> getAll() {
        List<Product> products = productServices.getAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping(path = "/products/get/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return ResponseEntity.of(productServices.getById(id));
    }


    @DeleteMapping(path = "/products/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        if (productServices.deleteById(id)){
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping (path = "/products/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        Product savedProduct = productServices.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/test")
    public String test() {
        return "API funcionando!";
    }
}
