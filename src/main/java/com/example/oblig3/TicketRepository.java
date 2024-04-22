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
        db.update(sql, innTicket.getMovie(), innTicket.getQuantity(), innTicket.getFname(), innTicket.getEmail(), innTicket.getEmail(), innTicket.getPhone());
    }

    public List<Tickets> getAllTickets() {
        String sql = "SELECT * FROM Tickets";
        List<Tickets> allTickets = db.query(sql, new BeanPropertyRowMapper<>(Tickets.class));
        return allTickets;
    }

    public void deleteAllTickets(){
        String sql = "DELETE * FROM Ticket";
        db.update(sql);
    }
}
