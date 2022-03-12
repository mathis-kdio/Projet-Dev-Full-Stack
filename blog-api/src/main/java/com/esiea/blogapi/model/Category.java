package com.esiea.blogapi.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "categories")
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "category_id")
	private Integer categoryId;
	private String name;

//	@JsonIgnore // fix la récupération cyclique des éléments 
	@ManyToMany(
			fetch = FetchType.LAZY, // performance
			cascade = { 
					CascadeType.PERSIST, // création
					CascadeType.MERGE }) // modification
	@JoinTable(
			// nom de la table de jointure
			name = "category_article",  
			// clé étrangère dans la table de jointure correspondant à la clé primaire 
			// de la classe courante (category)
			joinColumns = @JoinColumn(name = "category_id"), 
			// clé étrangère dans la table de jointure correspondant à la clé primaire
			// de la classe en relation (article)
			inverseJoinColumns = @JoinColumn(name = "article_id"))
	private List<Article> articles = new ArrayList<>();

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Article> getArticles() {
		return articles;
	}

	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}
	
	// Helper methods
	public void addArticle(Article article) {
		this.articles.add(article);
		article.getCategories().add(this);
	}
	
	public void removeArticle(Article article) {
		this.articles.remove(article);
		article.getCategories().remove(this);
	}	

}