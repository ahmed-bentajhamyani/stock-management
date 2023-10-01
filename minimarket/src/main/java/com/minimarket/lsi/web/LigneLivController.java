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
import com.minimarket.lsi.dao.LigneLivRepository;
import com.minimarket.lsi.entities.LigneLiv;

@RestController
@RequestMapping("/ligneliv")
@CrossOrigin

public class LigneLivController {

	@Autowired
	private LigneLivRepository ligneLivRepository;

	@GetMapping("")
	public List<LigneLiv> findAll() {
		return this.ligneLivRepository.findAll();
	}

	@GetMapping("/{numLigne}")
	public LigneLiv findById(@PathVariable Long numLigne) throws Exception {
		return this.ligneLivRepository.findById(numLigne).orElseThrow(() -> new Exception("ligneLiv n'existe pas "));
	}

	@PostMapping("")
	public LigneLiv saveLigneLiv(@RequestBody LigneLiv ligneLiv) throws Exception {
		return this.ligneLivRepository.save(ligneLiv);
	}

	@DeleteMapping("/{numLigne}")
	public void deleteLigneLiv(@PathVariable Long numLigne) throws Exception {
		this.ligneLivRepository.deleteById(numLigne);
	}

	@PutMapping("/{numLigne}")
	public LigneLiv updateLigneLiv(@RequestBody LigneLiv ligneLiv, @PathVariable Long numLigne) {
		return this.ligneLivRepository.findById(numLigne).map(x -> {
			return ligneLiv;
		}).orElseGet(() -> {
			ligneLiv.setNumLigne(numLigne);
			return ligneLivRepository.save(ligneLiv);
		});
	}
}
