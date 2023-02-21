package com.kydlai.web33;

import lombok.extern.slf4j.Slf4j;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import java.io.Serializable;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@ManagedBean
@ApplicationScoped
public class DbManager implements Serializable {
   private static final long serialVersionUID = 2L;

   public void checkHit(Attempt attempt) {
      attempt.setStartTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
      if (!checkValue(attempt)) return;
      if (checkRectangle(attempt) || checkTriangle(attempt) || checkCircle(attempt)) {
         attempt.setHit(true);
      } else {
         attempt.setHit(false);
      }
      save(attempt);
      FacesContext context = FacesContext.getCurrentInstance();
      context.getExternalContext().getSessionMap().put("attempt", attempt);
      log.info(attempt.toString());
   }

   private boolean checkRectangle(Attempt attempt) {
      return attempt.getX() <= 0 && attempt.getY() <= 0 && attempt.getX() >= -attempt.getR() && attempt.getY() >= -attempt.getR()/2;
   }

   private boolean checkTriangle(Attempt attempt) {
      return attempt.getX() >= 0 && attempt.getY() >= 0 && attempt.getY() * 2 + attempt.getX() <= attempt.getR();
   }

   private boolean checkCircle(Attempt attempt) {
      return attempt.getX() >= 0 && attempt.getY() <= 0 && attempt.getX()*attempt.getX()+attempt.getY()*attempt.getY() <= attempt.getR()*attempt.getR() / 4;
   }

   private boolean checkValue(Attempt attempt) {
       return attempt.getX() >= -2 && attempt.getX() <= 2 && attempt.getY() > -5 && attempt.getY() < 5 && attempt.getR() >= 1 && attempt.getR() <= 3;
   }

   public void save(Attempt attempt) {
        try (Connection connection = getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO attempt (x, y, r, hit, start_time) VALUES (?, ?, ?, ?, ?)");
            preparedStatement.setDouble(1, attempt.getX());
            preparedStatement.setDouble(2, attempt.getY());
            preparedStatement.setDouble(3, attempt.getR());
            preparedStatement.setBoolean(4, attempt.isHit());
            preparedStatement.setObject(5, attempt.getStartTime());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            log.error("Error while saving attempt", e);
        }
    }

    public List<Attempt> getAttempts() {
        PreparedStatement pst = null;
        ResultSet rs = null;
        Connection con = getConnection();
        String stm = "Select * from attempt";
        List<Attempt> records = new ArrayList<Attempt>();

        try {   
           pst = con.prepareStatement(stm);
           pst.execute();
           rs = pst.getResultSet();
  
           while(rs.next()) {
              Attempt attempt = new Attempt();
              attempt.setHit(rs.getBoolean(1));
              attempt.setStartTime(rs.getString(2));
              attempt.setX(rs.getDouble(3));
              attempt.setY(rs.getDouble(4));
              attempt.setR(rs.getDouble(5));
              records.add(attempt);
           }
        } catch (SQLException e) {
           log.error("Error while selecting attempts", e);
        } catch (NullPointerException e) {
            log.error("NullPointerException");
        }
        return records;
     }

     private LocalDateTime convertToLocalDateTimeViaInstant(Object dateToConvert) {
         return ((java.sql.Timestamp) dateToConvert).toLocalDateTime();
     }

     public void clear() throws SQLException {
         try (Connection connection = getConnection()) {
               PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM attempt");
               preparedStatement.executeUpdate();
               preparedStatement.close();
               PreparedStatement preparedStatement2 = connection.prepareStatement("ALTER SEQUENCE attempt_attempt_seq RESTART WITH 1");
               preparedStatement2.executeUpdate();
               preparedStatement2.close();
         } catch (SQLException e) {
               log.error("Error while clearing attempts", e);
         }
     }
  
     public Connection getConnection() {
        Connection con = null;
        String url = "jdbc:postgresql://localhost:5432/postgres";
        String user = "postgres";
        String password = "postgres";
        try {
            Class.forName("org.postgresql.Driver");
            con = DriverManager.getConnection(url, user, password);
            System.out.println("Connection completed.");
        } catch (SQLException ex) {
           System.out.println(ex.getMessage());
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
         return con;
     }
}
