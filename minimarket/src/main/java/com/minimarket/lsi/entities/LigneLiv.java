package com.minimarket.lsi.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ligne_liv")
public class LigneLiv {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long numLigne;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "codeArt")
	private Article article;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "numLiv")
	private Livraison livraison;

	private int qteLiv;

	public Long getNumLigne() {
		return numLigne;
	}

	public void setNumLigne(Long numLigne) {
		this.numLigne = numLigne;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public Livraison getLivraison() {
		return livraison;
	}

	public void setLivraison(Livraison livraison) {
		this.livraison = livraison;
	}

	public int getQteLiv() {
		return qteLiv;
	}

	public void setQteLiv(int qteLiv) {
		this.qteLiv = qteLiv;
	}

	public LigneLiv() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LigneLiv(Article article, Livraison livraison, int qteLiv) {
		super();
		this.article = article;
		this.livraison = livraison;
		this.qteLiv = qteLiv;
	}

	public LigneLiv(Long numLigne, Article article, Livraison livraison, int qteLiv) {
		super();
		this.numLigne = numLigne;
		this.article = article;
		this.livraison = livraison;
		this.qteLiv = qteLiv;
	}

}
