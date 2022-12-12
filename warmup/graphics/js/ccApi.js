
const TOKEN_R = nodecg.Replicant('TOKEN','connector');
const cors = "https://corsfv.herokuapp.com/"


async function loadWorkouts(eventId, workoutId){
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/events/"+ eventId +"/workouts/", {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + TOKEN_R.value}
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


async function loadParticpant(eventId, workoutID) {
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/events/"+ eventId + "/workouts/"+ workoutID +"/eligible-participants", {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + TOKEN_R.value}
    });
    let json = await response.json();
    return json;
}