$(function(){
    hentAlle();
});

function validateMovie(movie, val) { //validering for å se om film er valgt
    if (movie === "") { //Sjekker at valgt film ikke er første som har tom string value
        const out = "<p style='color:red'>Du må velge film</p>" //lager feilmelding
        document.getElementById("movieError").innerHTML = out; //setter inn feilmelding i element med id movieError
        return false; //setter validering til å være false
    } else { //hvis den går gjennom valideringen fjerner den valideringen og returnerer tidligere val, dette er tilfelle noen tidligere valideringer har failet.
        document.getElementById("movieError").innerHTML = "";
        return val
    }
}
function validateNumber(number, val) { //funker likt som film validering
    if (isNaN(number) || number <= 0) {
        const out = "<p style='color:red'>Skriv inn antall biletter</p>"
        document.getElementById("numberError").innerHTML = out;
        return false;
    } else {
        document.getElementById("numberError").innerHTML = "";
        return val
    }
}

function validateFirstname(firstname, val) { //funker likt som film validering men bruker regex til å sjekke navn.
    if(!/^[A-Za-z\s]+$/.test(firstname)) {
        const out = "<p style='color:red'>Skriv inn gyldig navn</p>"
        document.getElementById("firstnameError").innerHTML = out;
        return false;
    } else {
        document.getElementById("firstnameError").innerHTML = "";
        return val
    }
}

function validateLastname(lastname, val) { //funker likt som film validering, men med regex
    if(!/^[A-Za-z\s]+$/.test(lastname)) {
        const out = "<p style='color:red'>Skriv inn gyldig etternavn</p>"
        document.getElementById("lastnameError").innerHTML = out;
        return false;
    } else {
        document.getElementById("lastnameError").innerHTML = "";
        return val
    }
}

function validatePhonenumber(phonenumber, val) { //funker likt som film validering, men bruker regex
    if(!/^\+?[0-9]{8,15}$/.test(phonenumber)) {
        const out = "<p style='color:red'>Skriv inn gyldig telefonnummer</p>"
        document.getElementById("phoneError").innerHTML = out;
        return false;
    } else {
        document.getElementById("phoneError").innerHTML = "";
        return val
    }
}

function validateMail(mail, val) { //funker likt som film validering, men bruker regex
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(mail)) {
        const out = "<p style='color:red'>Skriv inn gyldig mail med landskode</p>"
        document.getElementById("mailError").innerHTML = out;
        return false;
    } else {
        document.getElementById("mailError").innerHTML = "";
        return val
    }
}

function clearInput() { //Setter input fields til å være tomme etter lagring
    document.getElementById("movie").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}
function OrderTicket() {
    let ticketInput = { //Objekt med all data fra inputs
        movie: document.getElementById("movie").value,
        quantity: document.getElementById("quantity").value,
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,

    }

    let validation = true; //initial validation er satt som true

    validation = validateMovie(ticketInput.movie, validation); //når den går gjennom validering vil validation bli satt til false hvis den failer.
    validation = validateNumber(ticketInput.quantity, validation); //hvis den allerede har failet vil den alltid returnere false.
    validation = validateFirstname(ticketInput.fname, validation); //men den vil fortsatt gjøre valideringer for å kunne sende feilmelding
    validation = validateLastname(ticketInput.lname, validation);
    validation = validateMail(ticketInput.email, validation);
    validation = validatePhonenumber(ticketInput.phone, validation);

    if (!validation) {
        return; //hvis valideringen ender med false så vil den bare returnere uten å gjøre noe
    } else {
        $.post("/save", ticketInput, function(){
            hentAlle();
        });
    }
}

function hentAlle() {
    $.get("/getAll", function (data) {
        displayTicketTable(data);
        clearInput();
    })
}

function displayTicketTable(tickets) { //Etter bestilling har blitt oprettet vil den legge in en tabell
    let out = "<table class='table table-striped'><tr>" +
        "<th>Movie</th>" +
        "<th>Quantity</th>" +
        "<th>Firstname</th>" +
        "<th>LastName</th>" +
        "<th>Email</th>" +
        "<th>Phone</th>" +
        "<th>Config</th>"
    for (let i in tickets) { //Etter head for tabell er laget vil den legge til alle bestillingene i rader under
        out += "<tr>";
        out += "<td>" + tickets[i].movie + "</td>" + //bruker inline style ettersom styling ikke er brukt ellers så
            "<td>" + tickets[i].quantity + "</td>" + // unngikk å legge til en css fil kun for dette.
            "<td>" + tickets[i].fname + "</td>" +
            "<td>" + tickets[i].lname + "</td>" +
            "<td>" + tickets[i].email + "</td>" +
            "<td>" + tickets[i].phone + "</td>" +
            "<td><a aria-label='Edit-btn' style='margin-right: 1rem' class='btn btn-primary' href='editTicket.html?id="+ tickets[i].id +"'>Edit</a>" +
            "<button aria-label='Delete-btn' type='button' class='btn btn-danger' onclick='deleteTicket("+ tickets[i].id +");'>Delete</button></td>";
        out += "</tr>";
    }
    document.getElementById("TicketTable").innerHTML = out; //Setter inn out, som er tabellen inn i element med id TicketTable
}

function deleteTicket(id) {
    const url = "/deleteTicket?id="+id;
    $.get(url, function() {
        window.location.href = 'index.html';
    });
}

function deleteAllTickets() {
    $.get( "/deleteAllTickets", function() {
        window.location.href = 'index.html';
    });
}