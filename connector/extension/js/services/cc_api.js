
const cors = "https://corsfv.herokuapp.com/"

module.exports = () => {

    let token;

    async function logCC(username, password){
        let data = {
            'username' : username,
            'password' : password
        }
        
        let sign_url = "https://competitioncorner.net/api2/v1/accounts/login"
    
        return fetch(sign_url,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers:{'Content-Type':"application/json"}
        })
        .then(response => response.json())
        .then(d => {
            token = d.access_token
            return d.access_token
        }).catch(e=>{
            console.log(e)
        })
    
    }
    
    async function dashboardEventCC(eventId){
        return fetch("https://competitioncorner.net/api2/v1/events/"+eventId+"/dashboard" , {
            method:"GET",
            headers:{'Authorization': 'Bearer ' + token}
        }).then(response => response.json())
    }
    
    async function getHeatsTopScore(workoutId, divisionId){
        return fetch( "https://competitioncorner.net/api2/v1/leaderboard/workouts/"+workoutId+"/top-results?divisionId="+divisionId, {
            method:"GET",
            headers:{'Authorization': 'Bearer ' + token}
        }).then(response => response.json())
    }
    
    async function loadInfoEventCC(eventId){
        let response = await fetch( "https://competitioncorner.net/api2/v1/events/" + eventId );
        let json = await response.json();
        return json;
    }
    
    async function loadWorkouts(eventId){
        return fetch( "https://competitioncorner.net/api2/v1/events/"+ eventId +"/workouts/", {
            method:"GET",
            headers:{'Authorization': 'Bearer ' + token}
        }).then(response => response.json())
    }
    
    async function loadWorkoutsPlanning(eventId) {
        return fetch( "https://competitioncorner.net/api2/v1/schedule/events/" + eventId + "/workouts")
        .then(response=>response.json())
    }
    
    async function loadHeats(workoutId) {
        return fetch( 'https://competitioncorner.net/api2/v1/schedule/workout/' + workoutId)
        .then((response)=>response.json())
    }

    async function loadParticpant(eventId, workoutID) {
        return fetch( "https://competitioncorner.net/api2/v1/events/"+ eventId + "/workouts/"+ workoutID +"/eligible-participants", {
            method:"GET",
            headers:{'Authorization': 'Bearer ' + token}
        }).then((response) => response.json());
    }
    
    async function heatDetails(eventId, heatId) {
        let response = await fetch( "https://competitioncorner.net/api2/v1/schedule/workout/"+ eventId + "/heat/" + heatId + "/details");
        let json = await response.json();
        return json;
    }
    
    async function getHeatInfo(eventId, heatId) {
        let response = await fetch( "https://competitioncorner.net/api2/v1/schedule/workout/"+ eventId + "/heat/" + heatId);
        let json = await response.json();
        return json;
    }
    
    async function getHeatResults(heatId) {
    
        let response = await fetch( "https://competitioncorner.net/api/v1/events/cuecard/heats/" + heatId + "/results")
        let json = await response.json();
        return json;
    }
    
    async function getWorkoutResults(heatId) {
    
        let response = await fetch( "https://competitioncorner.net/api/v1/cuecard/divisionresults/28601/workout/35638")
        let json = await response.json();
        return json;
    }
    
    async function getOverallStanding(heatId) {
    
        let response = await fetch( "https://competitioncorner.net/api/v1/events/5034/cuecard/standings/team_28601")
        let json = await response.json();
        return json;
    }
        
    
    async function loadParticpantId(eventId, id) {
        return await fetch( "https://competitioncorner.net/api2/v1/events/"+ eventId + "/participants/"+ id , {
            method:"GET",
            headers:{'Authorization': 'Bearer ' + token}
        }).then((response) => response.json()); 
    }

    async function loadAthlete(alias) {
        return fetch("https://competitioncorner.net/api2/v1/accounts/athletepage/"+ alias , {
            method:"GET",
            headers:{'Authorization': 'Bearer ' + token.value}
        }).then((response) => response.json())
    }    
    
    async function loadAttributionLane(heatId){
        let response = await fetch( "https://competitioncorner.net/api/v1/events/cuecard/heats/"+heatId+"/heatlane" , {
            method:"GET",
            headers:{'Authorization': 'Bearer ' + token},
        });
        let json = await response.json();
        return json;
    }
    
    return {
        logCC,
        dashboardEventCC,
        loadWorkouts,
        getHeatsTopScore,
        loadInfoEventCC,
        loadParticpantId,
        loadAthlete,
        loadWorkoutsPlanning,
        loadHeats,
        loadParticpant
    }
}