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
import com.minimarket.lsi.dao.LigneCmdRepository;
import com.minimarket.lsi.entities.LigneCmd;

@RestController
@RequestMapping("/lignecmd")
@CrossOrigin
public class LigneCmdController {
	@Autowired
	private LigneCmdRepository ligneCmdRepository;

	@GetMapping("")
	public List<LigneCmd> findAll() {
		return this.ligneCmdRepository.findAll();
	}

	@GetMapping("/{numLigne}")
	public LigneCmd findById(@PathVariable Long numLigne) throws Exception {
		return this.ligneCmdRepository.findById(numLigne)
				.orElseThrow(() -> new Exception("Ligne de commande n'existe pas"));
	}

	@PostMapping("")
	public LigneCmd saveLigneCmd(@RequestBody LigneCmd ligneCmd) throws Exception {
		return this.ligneCmdRepository.save(ligneCmd);
	}

	@DeleteMapping("/{numLigne}")
	public void deleteLigneCmd(@PathVariable Long numLigne) throws Exception {
		this.ligneCmdRepository.deleteById(numLigne);
	}

	@PutMapping("/{numLigne}")
	public LigneCmd updateLigneCmd(@RequestBody LigneCmd ligneCmd, @PathVariable Long numLigne) throws Exception {
		return this.ligneCmdRepository.findById(numLigne).map(x -> {
			x.setCommande(ligneCmd.getCommande());
			x.setArticle(ligneCmd.getArticle());
			x.setQteCmd(ligneCmd.getQteCmd());
			return ligneCmdRepository.save(x);
		}).orElseThrow(() -> new Exception("ligne de commande n'existe pas "));

	}
}
