package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @DeleteMapping("/deleteAll")
    public void deleteAllTickets() {
        rep.deleteAllTickets();
    }
}
