
package br.com.juridico.totvs.fullstack.Backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.juridico.totvs.fullstack.Backend.service.PontoTuristicoService;
import br.com.juridico.totvs.fullstack.Backend.service.dto.PontoTuristicoCreateUpdateDTO;
import br.com.juridico.totvs.fullstack.Backend.service.dto.PontoTuristicoDTO;

@CrossOrigin()
@RestController()
@RequestMapping("/ponto-turistico")
public class PontoTuristicoController {
    private final PontoTuristicoService pontoTuristicoService;

    public PontoTuristicoController(PontoTuristicoService pontoTuristicoService) {
        this.pontoTuristicoService = pontoTuristicoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PontoTuristicoDTO create(@RequestBody PontoTuristicoCreateUpdateDTO pontoTuristicoCreateUpdateDTO) {
        return this.pontoTuristicoService.create(pontoTuristicoCreateUpdateDTO);
    }

    @GetMapping
    public List<PontoTuristicoDTO> getAll(){
        return this.pontoTuristicoService.getAllPontoTuristico();
    }

    @GetMapping("{idPontoTuristico}")
    public PontoTuristicoDTO getPontoTuristicoById(@PathVariable Long idPontoTuristico) {
        return this.pontoTuristicoService.getPontoTuristicobyId(idPontoTuristico);
    }

    @DeleteMapping("{idPontoTuristico}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long idPontoTuristico) {
        this.pontoTuristicoService.delete(idPontoTuristico);
    }

    @PutMapping("{idPontoTuristico}")
    public PontoTuristicoDTO update(@PathVariable Long idPontoTuristico,
                                    @RequestBody PontoTuristicoCreateUpdateDTO pontoTuristicoCreateUpdateDTO) {
        return this.pontoTuristicoService.update(idPontoTuristico, pontoTuristicoCreateUpdateDTO);
    }
}
