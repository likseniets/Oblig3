package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.List;


@RestController
public class TicketController {
    @Autowired
    TicketRepository rep;

    @PostMapping("/save")
    public void saveTickets(Tickets ticket) {
        rep.saveTickets(ticket);
    }

    @GetMapping("/getAll")
    public List<Tickets> getAllTickets() {
        return rep.getAllTickets();
    }

    @GetMapping("/getOneTicket")
    public Tickets getOneTicket(int id) {
        return rep.getOneTicket(id);
    }

    @GetMapping("/deleteAllTickets")
    public void deleteAllTickets() {
        rep.deleteAllTickets();
    }

    @GetMapping("/deleteTicket")
    public void deleteTicket(int id) {
        rep.deleteTicket(id);
    }

    @PostMapping("/editATicket")
    public void editATicket(Tickets Ticket) {
        rep.editATicket(Ticket);
    }
}
