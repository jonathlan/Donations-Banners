

var endpoint = "https://api.charidy.com/api/v1/campaign/18262/donations?searchQ=&limit=10&sortBy=-time&extend=organization&extend=team&extend=level&extend=converted_currency&extend=campaign"

function date_diff(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}


var now = new Date(Date.now());
var donationDate = new Date(1664631982000);

var diffminutes = date_diff(now, donationDate); //Math.abs(Math.round(diff));
document.getElementById("date").innerText = "Hace " + diffminutes + " minutos.";