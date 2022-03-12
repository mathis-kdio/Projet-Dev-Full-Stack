package com.esiea.blogapi.transformer.article;

import java.util.ArrayList;
import java.util.List;

import com.esiea.blogapi.transformer.category.CategoryLight;

public class ArticleFull extends ArticleLight {
	
	private List<CategoryLight> categories = new ArrayList<>();
	
	public List<CategoryLight> getCategories() {
		return categories;
	}
	public void setCategories(List<CategoryLight> categories) {
		this.categories = categories;
	}
	
	
}
