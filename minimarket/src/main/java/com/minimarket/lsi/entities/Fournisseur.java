package com.minimarket.lsi.entities;

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
@Table(name = "fournisseur")
public class Fournisseur {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codeFour;
	private String nomFour;
	private String villeFour;
	private float telFour;
	
	@JsonIgnore
	@OneToMany(mappedBy = "fournisseur", fetch = FetchType.LAZY, cascade = { CascadeType.REMOVE })
	private Collection<Livraison> livraisons;

	@JsonIgnore
	@OneToMany(mappedBy = "fournisseur", fetch = FetchType.LAZY, cascade = { CascadeType.REMOVE })
	private Collection<Societe> Societes;

	public Fournisseur(Long codeFour, String nomFour, String villeFour, float telFour) {
		this.codeFour = codeFour;
		this.nomFour = nomFour;
		this.villeFour = villeFour;
		this.telFour = telFour;
	}

	public Fournisseur() {
		super();
	}

	public Fournisseur(String nomFour, String villeFour, float telFour, Collection<Societe> societes , Collection<Livraison> livraisons) {
		super();
		this.nomFour = nomFour;
		this.villeFour = villeFour;
		this.telFour = telFour;
		Societes = societes;
		this.livraisons = livraisons;
	}

	public Long getCodeFour() {
		return codeFour;
	}

	public void setCodeFour(Long codeFour) {
		this.codeFour = codeFour;
	}

	public String getNomFour() {
		return nomFour;
	}

	public void setNomFour(String nomFour) {
		this.nomFour = nomFour;
	}

	public String getVilleFour() {
		return villeFour;
	}

	public void setVilleFour(String villeFour) {
		this.villeFour = villeFour;
	}

	public float getTelFour() {
		return telFour;
	}

	public void setTelFour(float telFour) {
		this.telFour = telFour;
	}

}