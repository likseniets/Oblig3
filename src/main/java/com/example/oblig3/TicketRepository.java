package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {

    @Autowired
    private JdbcTemplate db;

    public void saveTickets(Tickets innTicket){
        String sql = "INSERT INTO Tickets (movie, quantity, fname, lname, email, phone) VALUES (?,?,?,?,?,?)";
        db.update(sql, innTicket.getMovie(), innTicket.getQuantity(), innTicket.getFname(), innTicket.getLname(), innTicket.getEmail(), innTicket.getPhone());
    }

    public List<Tickets> getAllTickets() {
        String sql = "SELECT * FROM Tickets ORDER BY lname";
        List<Tickets> allTickets = db.query(sql, new BeanPropertyRowMapper<>(Tickets.class));
        return allTickets;
    }

    public Tickets getOneTicket(int id) {
       String sql = "SELECT * FROM Tickets WHERE id=?";
       List<Tickets> aTicket = db.query(sql, new BeanPropertyRowMapper(Tickets.class), id);
       return aTicket.get(0);
    }

    public void deleteAllTickets() {
        String sql = "DELETE FROM Tickets";
        db.update(sql);
    }

    public void deleteTicket(int id) {
        String sql = "DELETE FROM Tickets WHERE id=?";
        db.update(sql,id);
    }

    public void editATicket(Tickets innTicket) {
        String sql = "UPDATE Tickets SET movie=?, quantity=?, fname=?, lname=?, email=?, phone=? where id=?";
        db.update(sql, innTicket.getMovie(), innTicket.getQuantity(), innTicket.getFname(), innTicket.getLname(), innTicket.getEmail(), innTicket.getPhone(), innTicket.getId());
    }
}
