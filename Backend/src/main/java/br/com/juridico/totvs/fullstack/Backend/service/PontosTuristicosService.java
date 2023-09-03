package br.com.juridico.totvs.fullstack.Backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.juridico.totvs.fullstack.Backend.domain.PontoTuristico;
import br.com.juridico.totvs.fullstack.Backend.service.dto.PontoTuristicoCreateUpdateDTO;
import br.com.juridico.totvs.fullstack.Backend.service.dto.PontoTuristicoDTO;

@Service
public interface PontoTuristicoService {
    List<PontoTuristico> listPontoTuristico = null;
    public PontoTuristicoDTO create(PontoTuristicoCreateUpdateDTO pontoTuristicoCreateUpdateDTO);
    public PontoTuristicoDTO update(Long id, PontoTuristicoCreateUpdateDTO pontoTuristicoCreateUpdateDTO);
    public void delete(Long id);
    public PontoTuristicoDTO getPontoTuristicobyId(Long id);
    List<PontoTuristicoDTO> getAllPontoTuristico();

}

