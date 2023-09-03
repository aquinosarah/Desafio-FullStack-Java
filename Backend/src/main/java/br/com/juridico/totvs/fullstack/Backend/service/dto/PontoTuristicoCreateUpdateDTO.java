package br.com.juridico.totvs.fullstack.Backend.service.dto;

public class PontoTuristicoCreateUpdateDTO {
    private String pais;
    private String cidade;
    private String nome;
    private String estacao;
    private String descricao;

    public PontoTuristicoCreateUpdateDTO() {

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
}
