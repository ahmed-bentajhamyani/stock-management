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

import com.minimarket.lsi.entities.Fournisseur;

@RestController
@RequestMapping("/fournisseurs")
@CrossOrigin
public class FournisseurController {

	@Autowired
	private com.minimarket.lsi.dao.FournisseurRepository fournisseurRepository;

	@GetMapping("")
	public List<Fournisseur> findAll() {
		return this.fournisseurRepository.findAll();
	}

	@GetMapping("/{codeFour}")
	public Fournisseur findById(@PathVariable Long codeFour) throws Exception {
		return this.fournisseurRepository.findById(codeFour)
				.orElseThrow(() -> new Exception("fournisseur n'existe pas "));
	}

	@PostMapping("")
	public Fournisseur saveFournisseur(@RequestBody Fournisseur fournisseur) throws Exception {
		return this.fournisseurRepository.save(fournisseur);
	}

	@DeleteMapping("/{codeFour}")
	public void deleteFournisseur(@PathVariable Long codeFour) throws Exception {
		this.fournisseurRepository.deleteById(codeFour);
	}

	@PutMapping("/{codeFour}")
	public Fournisseur updateFournisseur(@RequestBody Fournisseur fournisseur, @PathVariable Long codeFour) {
		return this.fournisseurRepository.findById(codeFour).map(x -> {
			x.setNomFour(fournisseur.getNomFour());
			x.setTelFour(fournisseur.getTelFour());
			x.setVilleFour(fournisseur.getVilleFour());
			return fournisseurRepository.save(x);
		}).orElseGet(() -> {
			fournisseur.setCodeFour(codeFour);
			return fournisseurRepository.save(fournisseur);
		});
	}
}
