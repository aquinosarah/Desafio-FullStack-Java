package br.com.juridico.totvs.fullstack.Backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.juridico.totvs.fullstack.Backend.domain.PontosTuristicos;
import br.com.juridico.totvs.fullstack.Backend.service.dto.PontosTuristicosCreateUpdateDTO;
import br.com.juridico.totvs.fullstack.Backend.service.dto.PontosTuristicosDTO;

@Service
public class PontosTuristicosServiceImpl implements PontosTuristicosService{
    List<PontosTuristicos> listPontosTuristicos = null;

    PontosTuristicosServiceImpl() {
        this.listPontosTuristicos = new ArrayList<>();
        boolean add = this.listPontosTuristicos.add(new PontosTuristicos(1L,
                "Brasil",
                "Sao Paulo",
                "Parque Ibirapuera",
                "Varao",
                "waertyuhgfgdfsdasfghg"));
    }

    @Override
    public PontosTuristicosDTO create(soCreateUpdateDTO pontosTuristicosCreateUpdateDTO) {
        PontoTuristico novoPontoTuristico = new PontoTuristico(
                this.getNewId(),
                pontosTuristicosCreateUpdateDTO.getPais(),
                pontosTuristicosCreateUpdateDTO.getCidade(),
                pontosTuristicosCreateUpdateDTO.getNome(),
                pontosTuristicosCreateUpdateDTO.getEstacao(),
                pontosTuristicosCreateUpdateDTO.getDescricao());

        this.listPontosTuristicos.add(novoPontosTuristicos);

        return new PontosTuristicosDTO(novoPontosTuristicos);
    }

    @Override
    public PontosTuristicosDTO update(Long id, PontosTuristicosCreateUpdateDTO pontosTuristicosCreateUpdateDTO) {
        PontosTuristicos pontosTuristicos = this.getPontosTuristicosById(id);
        int index = this.listPontosTuristicos.indexOf(pontosTuristicos);
        if (pontoTuristico == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        pontosTuristicos.setPais(pontosTuristicosCreateUpdateDTO.getPais());
        pontosTuristicos.setCidade(pontosTuristicosCreateUpdateDTO.getCidade());
        pontosTuristicos.setNome(pontosTuristicosCreateUpdateDTO.getNome());
        pontosTuristicos.setEstacao(pontosTuristicosCreateUpdateDTO.getEstacao());
        pontosTuristicos.setDescricao(pontosTuristicosCreateUpdateDTO.getDescricao());

        this.listPontosTuristicos.set(index, pontosTuristicos);
        return new PontosTuristicosDTO(pontosTuristicos);
    }

    @Override
    public void delete(Long id) {
        PontosTuristicos pontosTuristicos = this.getPontosTuristicosById(id);
        this.listPontosTuristicos.remove(pontosTuristicos);
    }

    @Override
    public PontosTuristicosDTO getPontosTuristicosbyId(Long id) {
        PontosTuristicos pontosTuristicos = this.getPontosTuristicosById(id);
        if (pontosTuristicos == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new PontosTuristicosDTO(pontosTuristicos);
    }

    @Override
    public List<PontosTuristicosDTO> getAllPontosTuristicos() {
        return this.listPontosTuristicos.stream()
                .map(pontosTuristicos -> new PontosTuristicosDTO(pontosTuristicos))
                .collect(Collectors.toList());
    }

    private Long getNewId(){
        if (this.listPontosTuristicos.size() > 0){
            return this.listPontosTuristicos.stream().max(Comparator
                            .comparingDouble(PontosTuristicos::getId))
                    .get()
                    .getId()+1;
        } else {
            return Long.valueOf(1);
        }
    }

    private PontosTuristicos getPontosTuristicosById(Long id){
        return this.listPontosTuristico.stream()
                .filter(x -> Objects.equals(x.getId(), id))
                .findFirst()
                .orElse(null);
    }
}
