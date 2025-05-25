
package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

    
   
    private static final String DATABASE_URL = "jdbc:mysql://localhost:3306/db_casacultural_filmes?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
    private static final String DATABASE_USER = "root"; // SUBSTITUA PELO SEU USUÁRIO MYSQL
    private static final String DATABASE_PASSWORD = "Lucas@260906"; // SUBSTITUA PELA SUA SENHA MYSQL
    private static final String MYSQL_DRIVER = "com.mysql.cj.jdbc.Driver";

    // Método estático para obter uma conexão com o banco de dados
    public static Connection getConnection() {
        Connection connection = null;
        try {
            
            Class.forName(MYSQL_DRIVER);

            // Tenta estabelecer a conexão
            System.out.println("Tentando conectar ao banco de dados..."); // Log para depuração
            connection = DriverManager.getConnection(DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD);
            System.out.println("Conexão com o banco de dados estabelecida com sucesso!"); // Log para depuração

        } catch (ClassNotFoundException e) {
            System.err.println("Driver JDBC do MySQL não encontrado!");
            e.printStackTrace();
            // Lançar uma exceção mais específica ou tratar de outra forma poderia ser uma opção em um app maior
        } catch (SQLException e) {
            System.err.println("Erro ao conectar ao banco de dados!");
            e.printStackTrace();
            // Lançar uma exceção mais específica
        }
        return connection;
    }

    // Método principal apenas para teste rápido da conexão (opcional)
    public static void main(String[] args) {
        Connection testConnection = getConnection();
        if (testConnection != null) {
            System.out.println("Teste de conexão bem-sucedido!");
            try {
                testConnection.close(); // Sempre feche a conexão após o uso
                System.out.println("Conexão de teste fechada.");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            System.err.println("Falha no teste de conexão.");
        }
    }
}