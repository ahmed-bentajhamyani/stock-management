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
import com.minimarket.lsi.dao.SocieteRepository;
import com.minimarket.lsi.entities.Societe;

@RestController
@RequestMapping("/societes")
@CrossOrigin
public class SocieteController {

	@Autowired
	private SocieteRepository societeRepository;

	@GetMapping("")
	public List<Societe> findAll() {
		return this.societeRepository.findAll();
	}

	@GetMapping("/{codeSte}")
	public Societe findById(@PathVariable Long codeSte) throws Exception {
		return this.societeRepository.findById(codeSte).orElseThrow(() -> new Exception("societe n'existe pas"));
	}

	@PostMapping("")
	public Societe saveSociete(@RequestBody Societe societe) throws Exception {
		System.out.print(societe);
		return this.societeRepository.save(societe);
	}
	
	@DeleteMapping("/{codeSte}")
	public void deleteSociete(@PathVariable Long codeSte) throws Exception {
		this.societeRepository.deleteById(codeSte);
	}

	@PutMapping("/{codeSte}")
	public Societe updateSociete(@RequestBody Societe societe, @PathVariable Long codeSte) throws Exception {
		return this.societeRepository.findById(codeSte).map(x -> {
			x.setNomSte(societe.getNomSte());
			x.setTelSte(societe.getTelSte());
			x.setFaxSte(societe.getFaxSte());
			x.setVilleSte(societe.getVilleSte());
			return this.societeRepository.save(x);
		}).orElseThrow(() -> new Exception("societe n'existe pas"));
	}
}
