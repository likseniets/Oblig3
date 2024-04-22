package com.example.oblig3;
public class Tickets {
    private String movie;
    private int quantity;
    private String fname;
    private String lname;
    private String email;
    private String phone;

    public Tickets(){

    }

    public Tickets(String movie, int numberOfTickets, String fname, String lname, String email, String phone) {
        this.movie = movie;
        this.quantity = numberOfTickets;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phone = phone;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int numberOfTickets) {
        this.quantity = numberOfTickets;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}