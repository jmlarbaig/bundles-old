
const token = nodecg.Replicant('TOKEN','connector');
const cors = "https://corsfv.herokuapp.com/"

console.log(token)

async function loadDivisions(eventId){
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/lookups/"+ eventId +"/divisions" , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token.value},
    }).then((response)=>{
        return response.json();
    }).catch((err)=>{return err})
    return response;
}

async function loadWorkoutsByDivision(eventId, divisionId){
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/lookups/"+ eventId +"/workouts?divisionId=" + divisionId , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token.value},
    }).then((response)=>{
        return response.json();
    }).catch((err)=>{return err})
    return response;
}

async function loadHeatsByWorkout(eventId, workoutId){
    let response = await fetch(cors + "https://competitioncorner.net/api2/v1/lookups/"+ eventId +"/workouts/" + workoutId + "/heats" , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token.value},
    }).then((response)=>{
        return response.json();
    }).catch((err)=>{return err})
    return response;
}