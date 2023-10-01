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
import com.minimarket.lsi.dao.LivraisonRepository;
import com.minimarket.lsi.entities.Livraison;

@RestController
@RequestMapping("/livraisons")
@CrossOrigin
public class LivraisonController {

	@Autowired
	private LivraisonRepository livraisonRepository;

	@GetMapping("")
	public List<Livraison> findAll() {
		return this.livraisonRepository.findAll();
	}

	@GetMapping("/{numLiv}")
	public Livraison findById(@PathVariable Long numLiv) throws Exception {
		return this.livraisonRepository.findById(numLiv).orElseThrow(() -> new Exception("livraison n'existe pas "));
	}

	@PostMapping("")
	public Livraison saveLivraison(@RequestBody Livraison livraison) throws Exception {
		return this.livraisonRepository.save(livraison);
	}

	@DeleteMapping("/{numLiv}")
	public void deleteLivraison(@PathVariable Long numLiv) throws Exception {
		this.livraisonRepository.deleteById(numLiv);
	}

	@PutMapping("/{numLiv}")
	public Livraison updateLivraison(@RequestBody Livraison livraison, @PathVariable Long numLiv) {
		return this.livraisonRepository.findById(numLiv).map(x -> {
			x.setDateLiv(livraison.getDateLiv());
			return livraisonRepository.save(x);
		}).orElseGet(() -> {
			livraison.setNumLiv(numLiv);
			return livraisonRepository.save(livraison);
		});
	}
}
