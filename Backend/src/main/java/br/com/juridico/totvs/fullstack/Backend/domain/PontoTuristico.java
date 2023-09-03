package br.com.juridico.totvs.fullstack.Backend.domain;

import br.com.juridico.totvs.fullstack.Backend.service.dto.PontoTuristicoDTO;

public class PontoTuristico {

    private Long id;
    private String pais;
    private String cidade;
    private String nome;
    private String estacao;
    private String descricao;

    public PontoTuristico(Long id, String pais, String cidade, String nome, String estacao, String descricao) {
        this.id = id;
        this.pais = pais;
        this.cidade = cidade;
        this.nome = nome;
        this.estacao = estacao;
        this.descricao = descricao;
    }

    public PontoTuristico(PontoTuristicoDTO pontoTuristicoDTO) {
        this.id = pontoTuristicoDTO.getId();
        this.pais = pontoTuristicoDTO.getPais();
        this.cidade = pontoTuristicoDTO.getCidade();
        this.nome = pontoTuristicoDTO.getNome();
        this.estacao = pontoTuristicoDTO.getEstacao();
        this.descricao = pontoTuristicoDTO.getDescricao();
    }

    public String getPais() {
        return pais;
    }
    public void setPais(String pais) {
        this.pais = pais;
    }
    public String getCidade() {
        return cidade;
    }
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEstacao() {
        return estacao;
    }
    public void setEstacao(String estacao) {
        this.estacao = estacao;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
}
