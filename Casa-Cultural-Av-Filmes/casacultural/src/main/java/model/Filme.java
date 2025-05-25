// src/main/java/br/com/casacultural/model/Filme.java
package model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class Filme {
    private int idFilme;
    private String titulo;
    private String genero;
    private String diretor;
    private int anoLancamento;
    private String duracao;
    private String descricaoCurta;
    private String sinopseCompleta;
    private String urlImagemBanner;
    private String urlImagemPoster;
    private Timestamp dataCadastro; // Para o campo data_cadastro da tabela
    private List<Analise> avaliacoes; // Para carregar as avaliações associadas

    // Construtor padrão
    public Filme() {
        this.avaliacoes = new ArrayList<>(); // Inicializa a lista
    }

    // Construtor com campos principais (pode adicionar mais conforme necessidade)
    public Filme(String titulo, String genero, String descricaoCurta) {
        this.titulo = titulo;
        this.genero = genero;
        this.descricaoCurta = descricaoCurta;
        this.avaliacoes = new ArrayList<>();
    }
    
    // Construtor completo (geralmente útil para DAOs)
    public Filme(int idFilme, String titulo, String genero, String diretor, int anoLancamento, String duracao,
                 String descricaoCurta, String sinopseCompleta, String urlImagemBanner, String urlImagemPoster, Timestamp dataCadastro) {
        this.idFilme = idFilme;
        this.titulo = titulo;
        this.genero = genero;
        this.diretor = diretor;
        this.anoLancamento = anoLancamento;
        this.duracao = duracao;
        this.descricaoCurta = descricaoCurta;
        this.sinopseCompleta = sinopseCompleta;
        this.urlImagemBanner = urlImagemBanner;
        this.urlImagemPoster = urlImagemPoster;
        this.dataCadastro = dataCadastro;
        this.avaliacoes = new ArrayList<>();
    }


    // Getters e Setters para todos os atributos
    public int getIdFilme() {
        return idFilme;
    }

    public void setIdFilme(int idFilme) {
        this.idFilme = idFilme;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getDiretor() {
        return diretor;
    }

    public void setDiretor(String diretor) {
        this.diretor = diretor;
    }

    public int getAnoLancamento() {
        return anoLancamento;
    }

    public void setAnoLancamento(int anoLancamento) {
        this.anoLancamento = anoLancamento;
    }

    public String getDuracao() {
        return duracao;
    }

    public void setDuracao(String duracao) {
        this.duracao = duracao;
    }

    public String getDescricaoCurta() {
        return descricaoCurta;
    }

    public void setDescricaoCurta(String descricaoCurta) {
        this.descricaoCurta = descricaoCurta;
    }

    public String getSinopseCompleta() {
        return sinopseCompleta;
    }

    public void setSinopseCompleta(String sinopseCompleta) {
        this.sinopseCompleta = sinopseCompleta;
    }

    public String getUrlImagemBanner() {
        return urlImagemBanner;
    }

    public void setUrlImagemBanner(String urlImagemBanner) {
        this.urlImagemBanner = urlImagemBanner;
    }

    public String getUrlImagemPoster() {
        return urlImagemPoster;
    }

    public void setUrlImagemPoster(String urlImagemPoster) {
        this.urlImagemPoster = urlImagemPoster;
    }

    public Timestamp getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Timestamp dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public List<Analise> getAvaliacoes() {
        return avaliacoes;
    }

    public void setAvaliacoes(List<Analise> avaliacoes) {
        this.avaliacoes = avaliacoes;
    }
    
    public void addAvaliacao(Analise analise) {
        if (this.avaliacoes == null) {
            this.avaliacoes = new ArrayList<>();
        }
        this.avaliacoes.add(analise);
    }

    @Override
    public String toString() {
        return "Filme [idFilme=" + idFilme + ", titulo=" + titulo + ", genero=" + genero + "]";
    }
}