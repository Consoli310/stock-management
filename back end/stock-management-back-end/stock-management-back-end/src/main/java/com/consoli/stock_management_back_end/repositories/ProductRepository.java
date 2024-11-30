package com.consoli.stock_management_back_end.repositories;

import com.consoli.stock_management_back_end.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


}
