package com.esiea.blogapi.transformer.category;

import java.util.ArrayList;
import java.util.List;

import com.esiea.blogapi.transformer.article.ArticleLight;

public class CategoryFull extends CategoryLight {
	
	private List<ArticleLight> products = new ArrayList<>();
	
	public List<ArticleLight> getProducts() {
		return products;
	}
	public void setProducts(List<ArticleLight> products) {
		this.products = products;
	}
}
