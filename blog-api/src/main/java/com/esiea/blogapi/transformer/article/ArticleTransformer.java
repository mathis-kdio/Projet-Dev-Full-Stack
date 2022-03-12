package com.esiea.blogapi.transformer.article;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.esiea.blogapi.model.Article;
import com.esiea.blogapi.model.Category;
import com.esiea.blogapi.transformer.category.CategoryLight;
import com.esiea.blogapi.transformer.category.CategoryTransformer;

@Component
public class ArticleTransformer {
	
	@Autowired
	private CategoryTransformer categoryTransformer;

	public ArticleFull transform(Article article) {
		ArticleFull articleFull = new ArticleFull();
		articleFull.setId(article.getId());
		articleFull.setCategory(article.getCategory());
		articleFull.setAuthor(article.getAuthor());
		articleFull.setContent(article.getContent());
		articleFull.setDate(article.getDate());

		for (Category category : article.getCategories()) {
			CategoryLight categoryLight = new CategoryLight();
			categoryLight.setCategoryId(category.getCategoryId());
			categoryLight.setName(category.getName());
			articleFull.getCategories().add(categoryLight);
		}

		return articleFull;
	}

	public List<ArticleFull> transform(Iterable<Article> articles) {
		List<ArticleFull> articlesFull = new ArrayList<>();
		for (Article article : articles) {
			articlesFull.add(transform(article));
		}
		return articlesFull;
	}
	
	public Article untransform(ArticleFull article) {
		Article p = new Article();
		p.setId(article.getId());
		p.setCategory(article.getCategory());
		p.setAuthor(article.getAuthor());
		p.setDate(article.getDate());
		p.setContent(article.getContent());
		p.setCategories(categoryTransformer.untransform(article.getCategories()));
		return p;
	}

}
