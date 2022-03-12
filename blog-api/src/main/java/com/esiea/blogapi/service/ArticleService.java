package com.esiea.blogapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.esiea.blogapi.model.Article;
import com.esiea.blogapi.repository.ArticleRepository;
import com.esiea.blogapi.transformer.article.ArticleFull;
import com.esiea.blogapi.transformer.article.ArticleTransformer;

@Service
public class ArticleService {

	@Autowired
	private ArticleRepository articleRepository;

	@Autowired
	private ArticleTransformer articleTransformer;

	public ArticleFull create(Article article) throws NotAllowedException {
		if (article.getId() == null) {
			return upsert(article);
		} else {
			throw new NotAllowedException();
		}
	}	
	
	public ArticleFull update(Article article) throws NotFoundException {
		getArticle(article.getId());
		return upsert(article);
	}
	
	public ArticleFull update(ArticleFull articleF) throws NotFoundException {
		getArticle(articleF.getId());
		return upsert(articleF);
	}
	
	private ArticleFull upsert(Article article) {
		return articleTransformer.transform(articleRepository.save(article));
	}

	private ArticleFull upsert(ArticleFull article) {
		return upsert(articleTransformer.untransform(article));
	}

	public ArticleFull getArticle(Integer id) throws NotFoundException {
		Optional<Article> res = articleRepository.findById(id);
		if (res.isPresent()) {
			return articleTransformer.transform(res.get());
		} else {
			throw new NotFoundException();
		}
	}

	public Optional<Article> getEntityArticle(Integer id) {
		return articleRepository.findById(id);
	}

	public List<ArticleFull> getArticles() {
		return articleTransformer.transform(articleRepository.findAll());
	}

	public void deleteArticle(Integer id) throws NotFoundException {
		try {
			articleRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException();
		}
	}

	public Iterable<ArticleFull> getArticlesByCategory(String category) throws NotFoundException {
		Iterable<ArticleFull> list = articleTransformer.transform(articleRepository.findByCategory(category));
		if (list.iterator().hasNext()) {
			return list;
		} else {
			throw new NotFoundException();
		}
	}

}
