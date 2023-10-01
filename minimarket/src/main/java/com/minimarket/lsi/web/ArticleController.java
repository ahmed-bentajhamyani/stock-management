package com.minimarket.lsi.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.minimarket.lsi.dao.ArticleRepository;
import com.minimarket.lsi.entities.Article;

@RestController
@RequestMapping(value="/articles")
@CrossOrigin
public class ArticleController {
	
	@Autowired
	private ArticleRepository articleRepository;
	
	@GetMapping("")
	public List<Article> findAll() {
		return this.articleRepository.findAll();
	}

	@GetMapping("/{codeArt}")
	public Article findById(@PathVariable Long codeArt) throws Exception {
		return this.articleRepository.findById(codeArt).orElseThrow(() -> new Exception("article n'existe pas "));
	}
	
	@PostMapping("")
	public Article saveArticle( @RequestBody Article article) throws Exception {
		return this.articleRepository.save(article);
	}
	
	@DeleteMapping("/{codeArt}")
	public void deleteArticle(@PathVariable Long codeArt) throws Exception {
		  this.articleRepository.deleteById(codeArt);
	}
	
	@PutMapping("/{codeArt}")
	public Article updateArticle(@RequestBody Article article , @PathVariable Long codeArt){
		return this.articleRepository.findById(codeArt).map(x->{
			x.setNomArt(article.getNomArt());
			x.setPu(article.getPu());
			x.setQteStock(article.getQteStock());
			return articleRepository.save(x);
		}).orElseGet(()->{
			article.setCodeArt(codeArt);
			return articleRepository.save(article);
		});
		
				
	}
	
}


