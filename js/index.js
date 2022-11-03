// Try something like this for the animations:
// https://codepen.io/yoannhel/pen/DMzjog
// https://speckyboy.com/css-javascript-text-animation-snippets/
var _urlProd = "https://api.charidy.com/api/v1/campaign/18262/donations?searchQ=&limit=10&sortBy=-time&extend=organization&extend=team&extend=level&extend=converted_currency&extend=campaign";
var _urlDemo = "https://jonathlan.github.io/Donations-Banners/demo/endpoint.json";
var _endpoint = _urlProd;

var _now = new Date(Date.now());
var _timeout = 8000;
var _donationsList = [];
var _k = 0;
var _intervalID;

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

    document.getElementById("amount").innerHTML = `$${amnt}`;
    document.getElementById("name").innerHTML = name;
    //document.getElementById("comment").innerHTML = comment;
    //document.getElementById("date").innerText = "Hace " + diffminutes + " minutos.";
}

function updateNextDonation() {
    if (_k >= _donationsList.length) {
        _k = 0;
        // Nomore donations fetch from server
        console.log("No more dontations, fetch from the server.");
        renderBanner();
        return;
    }

    updateBanner(_donationsList[_k].name, _donationsList[_k].currency_code, _donationsList[_k].total_charge_currency, _donationsList[_k].dedication, _donationsList[_k].created_at);
    _k++;
}

async function renderBanner() {
    clearIntervals();
    let donations = await getDonations();
    _donationsList.length = 0;
    donations.forEach(donation => {
        _donationsList.push(donation.attributes);
    });

    _intervalID = setInterval(updateNextDonation, _timeout);
}

function playDonations() {
    document.getElementById("status").innerHTML = "Playing";
    var isDemo = document.getElementById("btn_demo");
    if (isDemo.checked) {
        _endpoint = _urlDemo;
    }
    else {
        _endpoint = _urlProd;
    }
    renderBanner();
    console.log(`Playing. Demo:${isDemo.checked}`);
}

function pauseDonations() {
    console.log("Pause.");
    _donationsList.length = 0;
    clearIntervals();
    document.getElementById("status").innerHTML = "Paused";
}

function setTimer() {
    pauseDonations();
    var val = document.getElementById("inputSeconds").value;
    if (val > 0) {
        _timeout = val * 1000; // Miliseconds
        console.log(`Using custom timer: ${_timeout}`);
    }
    playDonations();
}

function clearIntervals(){
    // Clear current interval
    clearInterval(_intervalID);
    // Clear all intervals.
    for (let i = 1; i < _intervalID; i++) {
        window.clearInterval(i);
    }
}