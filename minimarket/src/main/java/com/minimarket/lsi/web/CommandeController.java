package com.minimarket.lsi.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.minimarket.lsi.dao.CommandeRepository;
import com.minimarket.lsi.entities.Commande;

@RestController
@RequestMapping("/commandes")
@CrossOrigin
public class CommandeController {
	@Autowired
	private CommandeRepository commandeRepository;

	@GetMapping("")
	public List<Commande> findAll() {
		return this.commandeRepository.findAll();
	}

	@GetMapping("/{numCmd}")
	public Commande findById(@PathVariable Long numCmd) throws Exception {
		return this.commandeRepository.findById(numCmd).orElseThrow(() -> new Exception("commande n'existe pas"));
	}

	@PostMapping("")
	public Commande saveCommande(@RequestBody Commande commande) throws Exception {
		return this.commandeRepository.save(commande);
	}

	@DeleteMapping("/{numCmd}")
	public void deleteCommande(@PathVariable Long numCmd) throws Exception {
		this.commandeRepository.deleteById(numCmd);
	}

	@PutMapping("/{numCmd}")
	public Commande updateCommande(@RequestBody Commande commande, @PathVariable Long numCmd) throws Exception {
		return this.commandeRepository.findById(numCmd).map(x -> {
			x.setDateCmd(commande.getDateCmd());
			return commandeRepository.save(x);
		}).orElseThrow(() -> new Exception("commande n'existe pas "));

	}
}
