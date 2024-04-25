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

function editATicket() {
    const ticketInput = {
        id: $("#id").val(),
        movie: $("#movie").val(),
        quantity: $("#quantity").val(),
        fname: $("#fname").val(),
        lname: $("#lname").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
    }

    let validation = true; //initial validation er satt som true

    validation = validateMovie(ticketInput.movie, validation); //når den går gjennom validering vil validation bli satt til false hvis den failer.
    validation = validateNumber(ticketInput.quantity, validation); //hvis den allerede har failet vil den alltid returnere false.
    validation = validateFirstname(ticketInput.fname, validation); //men den vil fortsatt gjøre valideringer for å kunne sende feilmelding
    validation = validateLastname(ticketInput.lname, validation);
    validation = validateMail(ticketInput.email, validation);
    validation = validatePhonenumber(ticketInput.phone, validation);

    console.log(validation)

    if (!validation) {
        return; //hvis valideringen ender med false så vil den bare returnere uten å gjøre noe
    } else {
        $.post("/editATicket", ticketInput, function () {
            window.location.href = "index.html";
        });
    }
}