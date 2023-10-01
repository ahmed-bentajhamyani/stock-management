package com.minimarket.lsi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.minimarket.lsi.entities.Commande;

public interface CommandeRepository extends JpaRepository<Commande, Long> {

}
