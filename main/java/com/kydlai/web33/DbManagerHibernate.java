package com.kydlai.web33;

import org.hibernate.Session;

import javax.swing.*;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DbManagerHibernate extends DbManager implements AttemptDAO{

    private static final long serialVersionUID = 3L;

    public void addAttempt(Attempt attempt) throws SQLException {
        Session session = null;
        try{
            session = HibernateUtil.getSessionFactory().openSession();
            session.beginTransaction();
            session.save(attempt);
            session.getTransaction().commit();
        } catch (Exception e){
            JOptionPane.showMessageDialog(null, e.getMessage(), "Ошибка вставки", JOptionPane.OK_OPTION);
        } finally {
            if(session != null && session.isOpen())
                session.close();
        }
    }

    public ArrayList<Attempt> getAllAttempts() throws SQLException {
        Session session = null;
        ArrayList attempts = new ArrayList<>();
        try{
            session = HibernateUtil.getSessionFactory().openSession();
            attempts = (ArrayList) session.createCriteria(Attempt.class).list();
        } catch (Exception e){
            JOptionPane.showMessageDialog(null, e.getMessage(), "Ошибка 'getAll'", JOptionPane.OK_OPTION);
        } finally {
            if(session != null && session.isOpen())
                session.close();
        }
        return attempts;
    }

    public void deleteAttempt(Attempt attempt) throws SQLException {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            session.beginTransaction();
            session.delete(attempt);
            session.getTransaction().commit();
        } catch (Exception e){
            JOptionPane.showMessageDialog(null, e.getMessage(), "Ошибка при удалении", JOptionPane.OK_OPTION);
        } finally {
            if(session != null && session.isOpen())
                session.close();
        }
    }
    @Override
    public void clear() throws SQLException {
        try {
            List<Attempt> attempts = getAllAttempts();
            for (int i = 0; i < attempts.size(); i++) {
                deleteAttempt(attempts.get(i));
            }
        }catch (SQLException e){
            JOptionPane.showMessageDialog(null, e.getMessage(), "Ошибка при удалении", JOptionPane.OK_OPTION);
        }
    }

    @Override
    public void save(Attempt attempt) {
        try {
            this.addAttempt(attempt);
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Ошибка при сохранении", JOptionPane.OK_OPTION);
        }
    }

    @Override
    public List<Attempt> getAttempts() {
        try {
            return this.getAllAttempts();
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Ошибка при чтении", JOptionPane.OK_OPTION);
        }
        return null;
    }


}
