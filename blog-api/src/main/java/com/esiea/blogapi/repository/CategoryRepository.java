package com.esiea.blogapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.esiea.blogapi.model.Category;


@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> {

}
