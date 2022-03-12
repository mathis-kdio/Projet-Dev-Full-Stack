package com.esiea.blogapi.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.esiea.blogapi.model.Article;

@Repository
public interface ArticleRepository 
	extends CrudRepository<Article, Integer> {

	// Derived Query
	public Iterable<Article> findByCategory(String category);
	
	// Native Query
	@Query(value = "SELECT * FROM articles WHERE category = :category", nativeQuery = true)
	public Iterable<Article> findByCategoryNative(@Param("category") String category);
	
}
