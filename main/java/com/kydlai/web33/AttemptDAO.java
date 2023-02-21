package com.kydlai.web33;


import java.sql.SQLException;
import java.util.Collection;

public interface AttemptDAO {
    public void addAttempt(Attempt attempt) throws SQLException;
    public Collection getAllAttempts() throws SQLException;
    public void deleteAttempt(Attempt attempt) throws SQLException;
    public void clear() throws SQLException;
}
