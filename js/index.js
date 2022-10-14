// useful:
// Render data: https://www.javascripttutorial.net/javascript-fetch-api/


var _endpoint = "https://api.charidy.com/api/v1/campaign/18262/donations?searchQ=&limit=10&sortBy=-time&extend=organization&extend=team&extend=level&extend=converted_currency&extend=campaign"

//_endpoint = 'samples/endpoint.json';

var _now = new Date(Date.now());

function date_diff(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

/*
async function getbanner(){
    const response = await fetch(_endpoint);
    var donations;
    if (response.status >= 200 && response.status <= 400){
        const json = await response.json();
        donations = json.data;
    }
    else{
        console.log(`Error fetching data: ${response.status}`)
        return;
    }

    donations.forEach(donation => {        
        const donAttributes = donation.attributes;

        const name = donAttributes.name;
        const comment = donAttributes.dedication; 
        const creationDate = donAttributes.created_at;
        const amount = donAttributes.total_charge_currency;
        const currency = donAttributes.currency_code;

        //console.log(`fetch: ${name}, ${comment}, ${creationDate}`);

        updateBanner(name, currency, amount, comment, creationDate);
    });    
}*/

async function getDonations(){
    const response = await fetch(_endpoint);
    
    if (response.status >= 200 && response.status <= 400){
        const json = await response.json();
        return await json.data;
    }
    else{
        console.log(`Error fetching data: ${response.status}`)
        return NaN;
    }
}

function updateBanner(name, curr, amnt, comment, creationDate){    
    var donationDate = new Date(creationDate);
    var diffminutes = date_diff(_now, donationDate);

    document.getElementById("name").innerHTML = `${name} (${amnt} ${curr})`;
    document.getElementById("comment").innerHTML = comment;
    document.getElementById("date").innerText = "Hace " + diffminutes + " minutos.";
}

async function renderBanner(){
    let donations = await getDonations();

    donations.forEach(donation => {        
        const donAttributes = donation.attributes;

        //console.log(`fetch: ${name}, ${comment}, ${creationDate}`);

        updateBanner(donAttributes.name, donAttributes.currency_code, donAttributes.total_charge_currency, donAttributes.dedication, donAttributes.created_at);
    });    
}

renderBanner();

//getbanner();