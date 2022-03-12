package com.esiea.blogapi.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esiea.blogapi.model.Article;
import com.esiea.blogapi.service.ArticleService;
import com.esiea.blogapi.service.NotAllowedException;
import com.esiea.blogapi.service.NotFoundException;
import com.esiea.blogapi.transformer.article.ArticleFull;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/private/article")
public class ArticleController {

	@Autowired
	private ArticleService articleService;

	@GetMapping("")
	public List<ArticleFull> getArticles() {
		return articleService.getArticles();
	}

	@GetMapping("/{id}")
	public ResponseEntity<ArticleFull> getArticle(@PathVariable("id") Integer id) {
		try {
			ArticleFull p = articleService.getArticle(id);
			return new ResponseEntity<ArticleFull>(p, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<ArticleFull>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("")
	public ResponseEntity<ArticleFull> addArticle(@RequestBody Article article) {
		try {
			ArticleFull articleF = articleService.create(article);
			return new ResponseEntity<>(articleF, HttpStatus.OK);
		} catch (NotAllowedException e) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteArticle(@PathVariable("id") Integer id) {
		try {
			articleService.deleteArticle(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("")
	public ResponseEntity<ArticleFull> replaceArticle(@RequestBody Article article) {
		try {
			ArticleFull articleF =  articleService.update(article);
			return new ResponseEntity<ArticleFull>(articleF, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<ArticleFull>(HttpStatus.NOT_FOUND);
		}
	}

	@PatchMapping("")
	public ResponseEntity<ArticleFull> partialReplaceArticle(@RequestBody Article article) {
		try {
			ArticleFull existingArticle = articleService.getArticle(article.getId());
			if (article.getCategory() != null && !article.getCategory().equals(existingArticle.getCategory())) {
				existingArticle.setCategory(article.getCategory());
			}
			if (article.getAuthor() != null && !article.getAuthor().equals(existingArticle.getAuthor())) {
				existingArticle.setAuthor(article.getAuthor());
			}
			if (article.getDate() != null && !article.getDate().equals(existingArticle.getDate())) {
				existingArticle.setDate(article.getDate());
			}
			if (article.getContent() != null && !article.getContent().equals(existingArticle.getContent())) {
				existingArticle.setContent(article.getContent());
			}
			existingArticle = articleService.update(existingArticle);
			return new ResponseEntity<ArticleFull>(existingArticle, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<ArticleFull>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/category/{category}")
	public ResponseEntity<Iterable<ArticleFull>> getArticlesByCategory(@PathVariable("name") String category) {
		try {
			Iterable<ArticleFull> articles = articleService.getArticlesByCategory(category);
			return new ResponseEntity<Iterable<ArticleFull>>(articles, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<Iterable<ArticleFull>>(HttpStatus.NOT_FOUND);
		}
	}

}
