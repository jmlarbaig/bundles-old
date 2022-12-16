
let token ="";

const TOKEN_R = nodecg.Replicant('TOKEN');
const cors = "https://corsfv.herokuapp.com/"

async function dashboardEventCC(eventId){
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/events/"+eventId+"/dashboard" , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token}
    });
    let json = await response.json();
    console.log(json)
    return json;

}

async function getHeatsTopScore(workoutId, divisionId){
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/leaderboard/workouts/"+workoutId+"/top-results?divisionId="+divisionId, {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token}
    });
    let json = await response.json();
    return json;
}

async function loadInfoEventCC(eventId){
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/events/" + eventId );
    let json = await response.json();
    return json;
}

async function loadWorkouts(eventId){
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/events/"+ eventId +"/workouts/", {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token}
    });
    let json = await response.json();
    return json;
}

async function loadWorkoutsPlanning(eventId) {
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/schedule/events/" + eventId + "/workouts");
    let json = await response.json();
    return json;
}

async function loadHeats(workoutId) {
    let response = await fetch(cors + 'https://competitioncorner.net/api2/v1/schedule/workout/' + workoutId);

    let json =  response.json();
    return json;
}

async function loadHeats2(eventId, workoutId) {
    let response = await fetch('./heats2?eventId=' + eventId + '&workoutId=' + workoutId);
    let json = await response.json();
    return json;
}

async function heatDetails(eventId, heatId) {
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/schedule/workout/"+ eventId + "/heat/" + heatId + "/details");
    let json = await response.json();
    return json;
}

async function getHeatInfo(eventId, heatId) {
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/schedule/workout/"+ eventId + "/heat/" + heatId);
    let json = await response.json();
    return json;
}

async function getHeatResults(heatId) {

    let response = await fetch(cors + "https://competitioncorner.net/api/v1/events/cuecard/heats/" + heatId + "/results")
    let json = await response.json();
    return json;
}

async function getWorkoutResults(heatId) {

    let response = await fetch(cors + "https://competitioncorner.net/api/v1/cuecard/divisionresults/28601/workout/35638")
    let json = await response.json();
    return json;
}

async function getOverallStanding(heatId) {

    let response = await fetch(cors + "https://competitioncorner.net/api/v1/events/5034/cuecard/standings/team_28601")
    let json = await response.json();
    return json;
}

async function loadParticpant(eventId, workoutID) {
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/events/"+ eventId + "/workouts/"+ workoutID +"/eligible-participants", {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token}
    });
    let json = await response.json();
    return json;
}


async function loadParticpantId(eventId, id) {
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/events/"+ eventId + "/participants/"+ id , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token}
    });
    let json = await response.json();
    return json;
}

async function loadAttributionLane(heatId){
    let response = await fetch(cors + "https://competitioncorner.net/api/v1/events/cuecard/heats/"+heatId+"/heatlane" , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token},
    });
    let json = await response.json();
    return json;
}

async function logCC(username, password){
    let data = {
        'username' : username,
        'password' : password
    }
    let sign_url = "https://competitioncorner.net/api2/v1/accounts/login"

    await fetch(cors + sign_url,
    {
        method: "POST",
        body: JSON.stringify(data),
        headers:{'Content-Type':"application/json"}
    })
    .then(response => response.json())
    .then(d => {
        console.log("Response CC = ", d)
        token = d.access_token
        TOKEN_R.value = token
    })

    sign_url = "https://competitioncorner.net/api2/v1/accounts/current/profile"

    await fetch(cors + sign_url,
        {
            method: "GET",
            headers:{'Authorization': 'Bearer ' + token},
            // body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(d => {
            console.log("Response CC = ", d)
            StateConnection('connected','cc','')
        })
        .catch((e)=>{
            StateConnection('error','cc',e)
        })
}