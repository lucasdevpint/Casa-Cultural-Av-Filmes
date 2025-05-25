// src/main/java/br/com/casacultural/dao/FilmeDAO.java
package dao;

import model.Filme;
import util.ConnectionFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class FilmeDAO {

    // Método para adicionar um novo filme ao banco de dados
    public Filme adicionarFilme(Filme filme) {
        String sql = "INSERT INTO filmes (titulo, genero, diretor, ano_lancamento, duracao, descricao_curta, sinopse_completa, url_imagem_banner, url_imagem_poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, filme.getTitulo());
            pstmt.setString(2, filme.getGenero());
            pstmt.setString(3, filme.getDiretor());
            // Trata anoLancamento para permitir nulos se for 0 no objeto Filme
            if (filme.getAnoLancamento() == 0) {
                pstmt.setNull(4, java.sql.Types.INTEGER);
            } else {
                pstmt.setInt(4, filme.getAnoLancamento());
            }
            pstmt.setString(5, filme.getDuracao());
            pstmt.setString(6, filme.getDescricaoCurta());
            pstmt.setString(7, filme.getSinopseCompleta());
            pstmt.setString(8, filme.getUrlImagemBanner());
            pstmt.setString(9, filme.getUrlImagemPoster());

            int affectedRows = pstmt.executeUpdate();

            if (affectedRows > 0) {
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        filme.setIdFilme(generatedKeys.getInt(1)); // Define o ID gerado no objeto filme
                    }
                }
                System.out.println("Filme adicionado com ID: " + filme.getIdFilme());
                return filme; // Retorna o filme com o ID populado
            }
        } catch (SQLException e) {
            System.err.println("Erro ao adicionar filme: " + e.getMessage());
            e.printStackTrace();
        }
        return null; // Retorna null em caso de falha
    }

    // Método para listar todos os filmes
    public List<Filme> listarTodosFilmes() {
        List<Filme> filmes = new ArrayList<>();
        String sql = "SELECT * FROM filmes ORDER BY titulo ASC";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                Filme filme = new Filme();
                filme.setIdFilme(rs.getInt("id_filme"));
                filme.setTitulo(rs.getString("titulo"));
                filme.setGenero(rs.getString("genero"));
                filme.setDiretor(rs.getString("diretor"));
                filme.setAnoLancamento(rs.getInt("ano_lancamento"));
                filme.setDuracao(rs.getString("duracao"));
                filme.setDescricaoCurta(rs.getString("descricao_curta"));
                filme.setSinopseCompleta(rs.getString("sinopse_completa"));
                filme.setUrlImagemBanner(rs.getString("url_imagem_banner"));
                filme.setUrlImagemPoster(rs.getString("url_imagem_poster"));
                filme.setDataCadastro(rs.getTimestamp("data_cadastro"));
                filmes.add(filme);
            }
            System.out.println(filmes.size() + " filmes listados.");
        } catch (SQLException e) {
            System.err.println("Erro ao listar filmes: " + e.getMessage());
            e.printStackTrace();
        }
        return filmes;
    }

    // Método para buscar um filme pelo ID
    public Filme buscarFilmePorId(int id) {
        String sql = "SELECT * FROM filmes WHERE id_filme = ?";
        Filme filme = null;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    filme = new Filme();
                    filme.setIdFilme(rs.getInt("id_filme"));
                    filme.setTitulo(rs.getString("titulo"));
                    filme.setGenero(rs.getString("genero"));
                    filme.setDiretor(rs.getString("diretor"));
                    filme.setAnoLancamento(rs.getInt("ano_lancamento"));
                    filme.setDuracao(rs.getString("duracao"));
                    filme.setDescricaoCurta(rs.getString("descricao_curta"));
                    filme.setSinopseCompleta(rs.getString("sinopse_completa"));
                    filme.setUrlImagemBanner(rs.getString("url_imagem_banner"));
                    filme.setUrlImagemPoster(rs.getString("url_imagem_poster"));
                    filme.setDataCadastro(rs.getTimestamp("data_cadastro"));
                    System.out.println("Filme encontrado: " + filme.getTitulo());
                } else {
                    System.out.println("Filme com ID " + id + " não encontrado.");
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar filme por ID: " + e.getMessage());
            e.printStackTrace();
        }
        return filme;
    }

    // Método para atualizar um filme existente
    public boolean atualizarFilme(Filme filme) {
        String sql = "UPDATE filmes SET titulo = ?, genero = ?, diretor = ?, ano_lancamento = ?, duracao = ?, " +
                     "descricao_curta = ?, sinopse_completa = ?, url_imagem_banner = ?, url_imagem_poster = ? " +
                     "WHERE id_filme = ?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, filme.getTitulo());
            pstmt.setString(2, filme.getGenero());
            pstmt.setString(3, filme.getDiretor());
            if (filme.getAnoLancamento() == 0) { // Assumindo que 0 significa não informado
                pstmt.setNull(4, java.sql.Types.INTEGER);
            } else {
                pstmt.setInt(4, filme.getAnoLancamento());
            }
            pstmt.setString(5, filme.getDuracao());
            pstmt.setString(6, filme.getDescricaoCurta());
            pstmt.setString(7, filme.getSinopseCompleta());
            pstmt.setString(8, filme.getUrlImagemBanner());
            pstmt.setString(9, filme.getUrlImagemPoster());
            pstmt.setInt(10, filme.getIdFilme());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                System.out.println("Filme atualizado com sucesso: " + filme.getTitulo());
                return true;
            } else {
                 System.out.println("Nenhum filme atualizado. ID " + filme.getIdFilme() + " pode não existir.");
                return false;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar filme: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    // Método para deletar um filme pelo ID
    public boolean deletarFilme(int id) {
        String sql = "DELETE FROM filmes WHERE id_filme = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            int affectedRows = pstmt.executeUpdate();

            if (affectedRows > 0) {
                System.out.println("Filme com ID " + id + " deletado com sucesso.");
                return true;
            } else {
                System.out.println("Nenhum filme deletado. ID " + id + " pode não existir.");
                return false;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao deletar filme: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}