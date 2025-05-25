package model;


import java.sql.Timestamp;

public class Analise {
    private int idAnalise;
    private int idFilmeFk; // Para referenciar o filme
    private String nomeUsuario;
    private int nota;
    private String comentario;
    private Timestamp dataAnalise;

    // Construtor padrão
    public Analise() {
    }
    
    // Construtor com campos (pode adicionar mais conforme necessidade)
    public Analise(int idFilmeFk, String nomeUsuario, int nota, String comentario) {
        this.idFilmeFk = idFilmeFk;
        this.nomeUsuario = nomeUsuario;
        this.nota = nota;
        this.comentario = comentario;
    }
    
    // Construtor completo
    public Analise(int idAnalise, int idFilmeFk, String nomeUsuario, int nota, String comentario, Timestamp dataAnalise) {
        this.idAnalise = idAnalise;
        this.idFilmeFk = idFilmeFk;
        this.nomeUsuario = nomeUsuario;
        this.nota = nota;
        this.comentario = comentario;
        this.dataAnalise = dataAnalise;
    }

    // Getters e Setters
    public int getIdAnalise() {
        return idAnalise;
    }

    public void setIdAnalise(int idAnalise) {
        this.idAnalise = idAnalise;
    }

    public int getIdFilmeFk() {
        return idFilmeFk;
    }

    public void setIdFilmeFk(int idFilmeFk) {
        this.idFilmeFk = idFilmeFk;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Timestamp getDataAnalise() {
        return dataAnalise;
    }

    public void setDataAnalise(Timestamp dataAnalise) {
        this.dataAnalise = dataAnalise;
    }

    @Override
    public String toString() {
        return "Analise [idAnalise=" + idAnalise + ", idFilmeFk=" + idFilmeFk + ", nota=" + nota + ", usuario=" + nomeUsuario +"]";
    }
}