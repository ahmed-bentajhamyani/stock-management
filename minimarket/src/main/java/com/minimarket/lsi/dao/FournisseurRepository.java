package com.minimarket.lsi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.minimarket.lsi.entities.Fournisseur;

public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {

}