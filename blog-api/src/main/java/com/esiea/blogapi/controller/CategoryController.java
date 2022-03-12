package com.esiea.blogapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esiea.blogapi.model.Article;
import com.esiea.blogapi.model.Category;
import com.esiea.blogapi.service.ArticleService;
import com.esiea.blogapi.service.CategoryService;
import com.esiea.blogapi.transformer.category.CategoryFull;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/private/category")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private ArticleService articleService;
	
	@GetMapping("")
	public List<CategoryFull> getCategories() {
		return categoryService.getCategories();
	}
	
	@PostMapping("/{idCategory}/{idArticle}")
	public void addArticleToCategory(
			@PathVariable(name = "idCategory") Integer idCategory,
			@PathVariable(name = "idArticle") Integer idArticle) {
		
		Category category = categoryService.getEntityCategory(idCategory).get();
		Article article = articleService.getEntityArticle(idArticle).get();

		category.addArticle(article);
		
		categoryService.saveCategory(category);
	
	}
	
}
