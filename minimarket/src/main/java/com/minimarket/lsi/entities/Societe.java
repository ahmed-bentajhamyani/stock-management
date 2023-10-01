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
@Table(name = "SOCIETE")
public class Societe implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codeSte;
	private String nomSte;
	private String telSte;
	private String faxSte;
	private String villeSte;

	@ManyToOne
	@JoinColumn(name = "codeFour", nullable = false)
	private Fournisseur fournisseur;

	public Societe(Long codeSte, String nomSte, String telSte, String faxSte, String villeSte,
			Fournisseur fournisseur) {
		super();
		this.codeSte = codeSte;
		this.nomSte = nomSte;
		this.telSte = telSte;
		this.faxSte = faxSte;
		this.villeSte = villeSte;
		this.fournisseur = fournisseur;
	}

	public Long getCodeSte() {
		return codeSte;
	}

	public void setCodeSte(Long codeSte) {
		this.codeSte = codeSte;
	}

	public String getNomSte() {
		return nomSte;
	}

	public void setNomSte(String nomSte) {
		this.nomSte = nomSte;
	}

	public String getTelSte() {
		return telSte;
	}

	public void setTelSte(String telSte) {
		this.telSte = telSte;
	}

	public String getFaxSte() {
		return faxSte;
	}

	public void setFaxSte(String faxSte) {
		this.faxSte = faxSte;
	}

	public String getVilleSte() {
		return villeSte;
	}

	public void setVilleSte(String villeSte) {
		this.villeSte = villeSte;
	}

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

	public Societe(String nomSte, String telSte, String faxSte, String villeSte, Fournisseur fournisseur) {
		super();
		this.nomSte = nomSte;
		this.telSte = telSte;
		this.faxSte = faxSte;
		this.villeSte = villeSte;
		this.fournisseur = fournisseur;
	}

	public Societe() {
		super();
	}

}
