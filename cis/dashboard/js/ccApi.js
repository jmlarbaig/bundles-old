const token = nodecg.Replicant('TOKEN','connector');
const cors = "https://corsfv.herokuapp.com/"

async function loadParticpantId(eventId, id) {
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/events/"+ eventId + "/participants/"+ id , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token.value}
    });
    let json = await response.json();
    return json;
}

async function loadAthlete(alias) {
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/accounts/athletepage/"+ alias , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token.value}
    });
    let json = await response.json();
    return json;
}
