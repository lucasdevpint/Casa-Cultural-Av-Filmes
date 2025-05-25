// src/main/java/dao/AnaliseDAO.java
package dao;

import model.Analise; // Importa a classe de modelo Analise
import util.ConnectionFactory; // Importa nossa fábrica de conexões

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class AnaliseDAO {

    /**
     * Adiciona uma nova análise ao banco de dados.
     * @param analise O objeto Analise a ser adicionado.
     * @return O objeto Analise com o ID gerado pelo banco, ou null em caso de falha.
     */
    public Analise adicionarAnalise(Analise analise) {
        String sql = "INSERT INTO analises (id_filme_fk, nome_usuario, nota, comentario, data_analise) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setInt(1, analise.getIdFilmeFk());
            pstmt.setString(2, analise.getNomeUsuario());
            pstmt.setInt(3, analise.getNota());
            pstmt.setString(4, analise.getComentario());
            
            // Define a data da análise para o momento atual se não estiver definida
            if (analise.getDataAnalise() == null) {
                pstmt.setTimestamp(5, new Timestamp(System.currentTimeMillis()));
            } else {
                pstmt.setTimestamp(5, analise.getDataAnalise());
            }

            int affectedRows = pstmt.executeUpdate();

            if (affectedRows > 0) {
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        analise.setIdAnalise(generatedKeys.getInt(1)); // Define o ID gerado
                    }
                }
                System.out.println("Análise adicionada com ID: " + analise.getIdAnalise() + " para o filme ID: " + analise.getIdFilmeFk());
                return analise;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao adicionar análise: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Lista todas as análises para um filme específico.
     * @param idFilme O ID do filme para o qual listar as análises.
     * @return Uma lista de objetos Analise.
     */
    public List<Analise> listarAnalisesPorFilmeId(int idFilme) {
        List<Analise> analises = new ArrayList<>();
        String sql = "SELECT * FROM analises WHERE id_filme_fk = ? ORDER BY data_analise DESC"; // Mais recentes primeiro

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, idFilme);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Analise analise = new Analise();
                    analise.setIdAnalise(rs.getInt("id_analise"));
                    analise.setIdFilmeFk(rs.getInt("id_filme_fk"));
                    analise.setNomeUsuario(rs.getString("nome_usuario"));
                    analise.setNota(rs.getInt("nota"));
                    analise.setComentario(rs.getString("comentario"));
                    analise.setDataAnalise(rs.getTimestamp("data_analise"));
                    analises.add(analise);
                }
                System.out.println(analises.size() + " análise(s) listada(s) para o filme ID: " + idFilme);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao listar análises por filme ID: " + e.getMessage());
            e.printStackTrace();
        }
        return analises;
    }

    /**
     * Busca uma análise específica pelo seu ID.
     * @param idAnalise O ID da análise a ser buscada.
     * @return O objeto Analise se encontrado, caso contrário null.
     */
    public Analise buscarAnalisePorId(int idAnalise) {
        String sql = "SELECT * FROM analises WHERE id_analise = ?";
        Analise analise = null;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, idAnalise);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    analise = new Analise();
                    analise.setIdAnalise(rs.getInt("id_analise"));
                    analise.setIdFilmeFk(rs.getInt("id_filme_fk"));
                    analise.setNomeUsuario(rs.getString("nome_usuario"));
                    analise.setNota(rs.getInt("nota"));
                    analise.setComentario(rs.getString("comentario"));
                    analise.setDataAnalise(rs.getTimestamp("data_analise"));
                    System.out.println("Análise encontrada ID: " + idAnalise);
                } else {
                    System.out.println("Análise com ID " + idAnalise + " não encontrada.");
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar análise por ID: " + e.getMessage());
            e.printStackTrace();
        }
        return analise;
    }


    /**
     * Atualiza uma análise existente no banco de dados.
     * @param analise O objeto Analise com os dados atualizados.
     * @return true se a atualização foi bem-sucedida, false caso contrário.
     */
    public boolean atualizarAnalise(Analise analise) {
        String sql = "UPDATE analises SET nome_usuario = ?, nota = ?, comentario = ?, data_analise = ? WHERE id_analise = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, analise.getNomeUsuario());
            pstmt.setInt(2, analise.getNota());
            pstmt.setString(3, analise.getComentario());
            // Atualiza a data da análise para o momento atual se não estiver definida
            if (analise.getDataAnalise() == null) {
                pstmt.setTimestamp(4, new Timestamp(System.currentTimeMillis()));
            } else {
                pstmt.setTimestamp(4, analise.getDataAnalise());
            }
            pstmt.setInt(5, analise.getIdAnalise());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                System.out.println("Análise ID " + analise.getIdAnalise() + " atualizada com sucesso.");
                return true;
            } else {
                System.out.println("Nenhuma análise atualizada. ID " + analise.getIdAnalise() + " pode não existir.");
                return false;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar análise: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Deleta uma análise do banco de dados pelo seu ID.
     * @param idAnalise O ID da análise a ser deletada.
     * @return true se a deleção foi bem-sucedida, false caso contrário.
     */
    public boolean deletarAnalise(int idAnalise) {
        String sql = "DELETE FROM analises WHERE id_analise = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, idAnalise);
            int affectedRows = pstmt.executeUpdate();

            if (affectedRows > 0) {
                System.out.println("Análise com ID " + idAnalise + " deletada com sucesso.");
                return true;
            } else {
                System.out.println("Nenhuma análise deletada. ID " + idAnalise + " pode não existir.");
                return false;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao deletar análise: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}