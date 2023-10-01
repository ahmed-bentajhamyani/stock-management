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

@Entity
@Table(name = "commande")
public class Commande implements Serializable {

	@Id
	private Long numCmd;
	private Date dateCmd;

	@ManyToOne
	@JoinColumn(name = "codeCli", nullable = false)
	private Client client;

	@OneToMany(mappedBy = "commande", fetch = FetchType.LAZY, cascade = { CascadeType.REMOVE })
	private Collection<LigneCmd> ligneCmd;

	public Long getNumCmd() {
		return numCmd;
	}

	public void setNumCmd(Long numCmd) {
		this.numCmd = numCmd;
	}

	public Date getDateCmd() {
		return dateCmd;
	}

	public void setDateCmd(Date dateCmd) {
		this.dateCmd = dateCmd;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Commande() {
		super();
	}

	public Commande(Long numCmd, Date dateCmd, Client client) {
		super();
		this.numCmd = numCmd;
		this.dateCmd = dateCmd;
		this.client = client;
	}

	public Commande(Date dateCmd, Client client) {
		super();
		this.dateCmd = dateCmd;
		this.client = client;
	}
}
