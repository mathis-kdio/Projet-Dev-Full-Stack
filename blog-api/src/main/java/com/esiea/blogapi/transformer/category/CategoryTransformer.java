package com.esiea.blogapi.transformer.category;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.esiea.blogapi.model.Article;
import com.esiea.blogapi.model.Category;
import com.esiea.blogapi.transformer.article.ArticleLight;

@Component
public class CategoryTransformer {

	public CategoryFull transform(Category category) {
		CategoryFull categoryFull = new CategoryFull();
		categoryFull.setCategoryId(category.getCategoryId());
		categoryFull.setName(category.getName());
		
		for(Article article : category.getArticles()) {
			ArticleLight articleLight = new ArticleLight();
			articleLight.setId(article.getId());
			articleLight.setAuthor(article.getAuthor());
			articleLight.setContent(article.getContent());
			articleLight.setDate(article.getDate());
			articleLight.setCategory(article.getCategory());

			categoryFull.getArticles().add(articleLight);
		}		
		return categoryFull;
	}
	
	public List<CategoryFull> transform(Iterable<Category> categories) {
		List<CategoryFull> categoriesFull = new ArrayList<>();
		for(Category category : categories) {
			categoriesFull.add(transform(category));
		}
		return categoriesFull;
	}

	public List<Category> untransform(List<CategoryLight> categoriesLight) {
		List<Category> categories = new ArrayList<>();
		for(CategoryLight categoryL : categoriesLight) {
			categories.add(untransform(categoryL));
		}
		return categories;
	}
	
	public Category untransform(CategoryLight categoryL) {
		Category category = new Category();
		category.setCategoryId(categoryL.getCategoryId());
		category.setName(categoryL.getName());
		return category;
	}	
	
}