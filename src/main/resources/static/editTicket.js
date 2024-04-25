$(function(){
    const id = window.location.search.substring(1);
    const url = "/getOneTicket?"+id;
    $.get(url, function(ticket) {
        $("#id").val(ticket.id);
        $("#movie").val(ticket.movie);
        $("#quantity").val(ticket.quantity);
        $("#fname").val(ticket.fname);
        $("#lname").val(ticket.lname);
        $("#email").val(ticket.email);
        $("#phone").val(ticket.phone);
        console.log(ticket);
    });
});

function editATicket() {
    const ticket = {
        id: $("#id").val(),
        movie: $("#movie").val(),
        quantity: $("#quantity").val(),
        fname: $("#fname").val(),
        lname: $("#lname").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
    }
    $.post("/editATicket", ticket, function () {
        window.location.href = "index.html";
    });
}