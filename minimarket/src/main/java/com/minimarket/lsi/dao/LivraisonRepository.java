package com.minimarket.lsi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.minimarket.lsi.entities.Livraison;

public interface LivraisonRepository extends JpaRepository<Livraison, Long> {

}