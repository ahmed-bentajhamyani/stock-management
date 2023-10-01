package com.minimarket.lsi.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "article")
public class Article implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codeArt;
	private String nomArt;
	private float pu;
	private float qteStock;
	
	@JsonIgnore
	@OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
	private Collection<LigneLiv> ligneLivs;
	
	@JsonIgnore
	@OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
	private Collection<LigneCmd> ligneCmds;


	public Long getCodeArt() {
		return codeArt;
	}

	public void setCodeArt(Long codeArt) {
		this.codeArt = codeArt;
	}

	public String getNomArt() {
		return nomArt;
	}

	public void setNomArt(String nomArt) {
		this.nomArt = nomArt;
	}

	public float getPu() {
		return pu;
	}

	public void setPu(float pu) {
		this.pu = pu;
	}

	public float getQteStock() {
		return qteStock;
	}

	public void setQteStock(float qteStock) {
		this.qteStock = qteStock;
	}

	public Collection<LigneLiv> getLigneLivs() {
		return ligneLivs;
	}

	public void setLigneLivs(Collection<LigneLiv> ligneLivs) {
		this.ligneLivs = ligneLivs;
	}

	public Collection<LigneCmd> getLigneCmds() {
		return ligneCmds;
	}

	public void setLigneCmds(Collection<LigneCmd> ligneCmds) {
		this.ligneCmds = ligneCmds;
	}

	public Article(Long codeArt, String nomArt, float pu, float qteStock, Collection<LigneLiv> ligneLivs,
			Collection<LigneCmd> ligneCmds) {
		super();
		this.codeArt = codeArt;
		this.nomArt = nomArt;
		this.pu = pu;
		this.qteStock = qteStock;
		this.ligneLivs = ligneLivs;
		this.ligneCmds = ligneCmds;
	}

	public Article(String nomArt, float pu, float qteStock, Collection<LigneLiv> ligneLivs,
			Collection<LigneCmd> ligneCmds) {
		super();
		this.nomArt = nomArt;
		this.pu = pu;
		this.qteStock = qteStock;
		this.ligneLivs = ligneLivs;
		this.ligneCmds = ligneCmds;
	}

	public Article() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
