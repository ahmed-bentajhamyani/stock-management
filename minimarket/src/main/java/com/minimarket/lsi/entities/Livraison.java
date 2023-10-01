package com.minimarket.lsi.entities;

import java.io.Serializable;

import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "livraison")

public class Livraison implements Serializable {

	@Id
	private Long numLiv;
	private Date dateLiv;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "codeFour")
	private Fournisseur fournisseur;

	@JsonIgnore
	@OneToMany(mappedBy = "livraison", fetch = FetchType.LAZY, cascade = { CascadeType.REMOVE })
	private Collection<LigneLiv> ligneLivs;

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

	public Collection<LigneLiv> getLigneLivs() {
		return ligneLivs;
	}

	public void setLigneLivs(Collection<LigneLiv> ligneLivs) {
		this.ligneLivs = ligneLivs;
	}

	public Long getNumLiv() {
		return numLiv;
	}

	public void setNumLiv(Long numLiv) {
		this.numLiv = numLiv;
	}

	public Date getDateLiv() {
		return dateLiv;
	}

	public void setDateLiv(Date dateLiv) {
		this.dateLiv = dateLiv;
	}

	public Livraison(Long numLiv, Fournisseur fournisseur, Date dateLiv, Collection<LigneLiv> ligneLivs) {
		super();
		this.numLiv = numLiv;
		this.dateLiv = dateLiv;
		this.ligneLivs = ligneLivs;
		this.fournisseur = fournisseur;
	}

	public Livraison() {

	}

}