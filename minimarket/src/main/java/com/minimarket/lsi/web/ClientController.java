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
import com.minimarket.lsi.dao.ClientRepository;
import com.minimarket.lsi.entities.Client;

@RestController
@RequestMapping("/clients")
@CrossOrigin
public class ClientController {
	@Autowired
	private ClientRepository clientRepository;

	@GetMapping("")
	public List<Client> findAll() {
		return this.clientRepository.findAll();
	}

	@GetMapping("/{codeCli}")
	public Client findById(@PathVariable Long codeCli) throws Exception {
		return this.clientRepository.findById(codeCli).orElseThrow(() -> new Exception("client n'existe pas "));
	}

	@PostMapping("")
	public Client saveClient(@RequestBody Client client) throws Exception {
		System.out.println(client.getNomCli());
		return this.clientRepository.save(client);
	}

	@DeleteMapping("/{codeCli}")
	public void deleteClient(@PathVariable Long codeCli) throws Exception {
		this.clientRepository.deleteById(codeCli);
	}

	@PutMapping("/{codeCli}")
	public Client updateClient(@RequestBody Client client, @PathVariable Long codeCli) throws Exception {
		return this.clientRepository.findById(codeCli).map(x -> {
			x.setNomCli(client.getNomCli());
			x.setPreCli(client.getPreCli());
			x.setAdrCli(client.getAdrCli());
			x.setTelCli(client.getTelCli());
			x.setVilleCli(client.getVilleCli());
			return clientRepository.save(x);
		}).orElseThrow(() -> new Exception("client n'existe pas "));
	}
}
