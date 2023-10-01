package com.minimarket.lsi.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ligne_cmd")
public class LigneCmd implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long numLigne;

	@ManyToOne
	@JoinColumn(name = "numCmd")
	private Commande commande;

	@ManyToOne
	@JoinColumn(name = "codeArt")
	private Article article;

	private int qteCmd;

	public LigneCmd(Long numLigne, Commande commande, Article article, int qteCmd) {
		super();
		this.numLigne = numLigne;
		this.commande = commande;
		this.article = article;
		this.qteCmd = qteCmd;
	}

	public LigneCmd(Commande commande, Article article, int qteCmd) {
		super();
		this.commande = commande;
		this.article = article;
		this.qteCmd = qteCmd;
	}

	public LigneCmd() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getNumLigne() {
		return numLigne;
	}

	public void setNumLigne(Long numLigne) {
		this.numLigne = numLigne;
	}

	public Commande getCommande() {
		return commande;
	}

	public void setCommande(Commande commande) {
		this.commande = commande;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public int getQteCmd() {
		return qteCmd;
	}

	public void setQteCmd(int qteCmd) {
		this.qteCmd = qteCmd;
	}

}
