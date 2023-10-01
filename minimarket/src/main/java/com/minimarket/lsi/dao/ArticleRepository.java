package com.minimarket.lsi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.minimarket.lsi.entities.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {

}
