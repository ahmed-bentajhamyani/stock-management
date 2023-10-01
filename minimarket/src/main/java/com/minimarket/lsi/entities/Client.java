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
@Table(name = "client")
public class Client implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codeCli;
	private String nomCli;
	private String preCli;
	private String adrCli;
	private String telCli;
	private String villeCli;

	@JsonIgnore
	@OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = { CascadeType.REMOVE })
	private Collection<Commande> commande;

	public Long getCodeCli() {
		return codeCli;
	}

	public void setCodeCli(Long codeCli) {
		this.codeCli = codeCli;
	}

	public String getNomCli() {
		return nomCli;
	}

	public void setNomCli(String nomCli) {
		this.nomCli = nomCli;
	}

	public String getPreCli() {
		return preCli;
	}

	public void setPreCli(String preCli) {
		this.preCli = preCli;
	}

	public String getAdrCli() {
		return adrCli;
	}

	public void setAdrCli(String adrCli) {
		this.adrCli = adrCli;
	}

	public String getTelCli() {
		return telCli;
	}

	public void setTelCli(String telCli) {
		this.telCli = telCli;
	}

	public String getVilleCli() {
		return villeCli;
	}

	public void setVilleCli(String villeCli) {
		this.villeCli = villeCli;
	}

	public Client(Long codeCli, String nomCli, String preCli, String adrCli, String telCli, String villeCli,
			Collection<Commande> commande) {
		super();
		this.codeCli = codeCli;
		this.nomCli = nomCli;
		this.preCli = preCli;
		this.adrCli = adrCli;
		this.telCli = telCli;
		this.villeCli = villeCli;
		this.commande = commande;
	}

	public Client(String nomCli, String preCli, String adrCli, String telCli, String villeCli,
			Collection<Commande> commande) {
		super();
		this.nomCli = nomCli;
		this.preCli = preCli;
		this.adrCli = adrCli;
		this.telCli = telCli;
		this.villeCli = villeCli;
		this.commande = commande;
	}

	public Client() {
		super();
	}

}
