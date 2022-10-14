
var _endpoint = "https://api.charidy.com/api/v1/campaign/18262/donations?searchQ=&limit=10&sortBy=-time&extend=organization&extend=team&extend=level&extend=converted_currency&extend=campaign"

_endpoint = 'https://jonathlan.github.io/Donations-Banners/demo/endpoint.json';

var _now = new Date(Date.now());
var _timeout = 5000;
var _donationsList = [];
var _k = 0;

function date_diff(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}


async function getDonations() {
    const response = await fetch(_endpoint);

    if (response.status >= 200 && response.status <= 400) {
        const json = await response.json();
        return await json.data;
    }
    else {
        console.log(`Error fetching data: ${response.status}`)
        return [];
    }
}

function updateBanner(name, curr, amnt, comment, creationDate) {
    var donationDate = new Date(creationDate);
    var diffminutes = date_diff(_now, donationDate);

    document.getElementById("name").innerHTML = `${name} (${amnt} ${curr})`;
    document.getElementById("comment").innerHTML = comment;
    document.getElementById("date").innerText = "Hace " + diffminutes + " minutos.";
}

function updateNextDonation() {
    if (_k >= _donationsList.length) {
        _k = 0;
    }

    updateBanner(_donationsList[_k].name, _donationsList[_k].currency_code, _donationsList[_k].total_charge_currency, _donationsList[_k].dedication, _donationsList[_k].created_at);
    _k++;
}

function displayHello() {
    console.log("Hello");
}

async function renderBanner() {
    let donations = await getDonations();
    donations.forEach(donation => {
        _donationsList.push(donation.attributes);
    });

    setInterval(updateNextDonation, _timeout);
}

renderBanner();



