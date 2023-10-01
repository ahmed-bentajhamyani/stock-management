package com.minimarket.lsi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.minimarket.lsi.entities.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

}
