
const cors = "https://corsfv.herokuapp.com/"

module.exports = () => {

    let token;

    async function logCC(username, password) {
        let data = {
            'username': username,
            'password': password
        }

        let sign_url = "https://competitioncorner.net/api2/v1/accounts/login"

        return fetch(sign_url,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: { 'Content-Type': "application/json" }
            })
            .then(response => response.json())
            .then(d => {
                token = d.access_token
                return d.access_token
            }).catch(e => {
                console.log(e)
            })

    }

    async function dashboardEventCC(eventId) {
        return fetch("https://competitioncorner.net/api2/v1/events/" + eventId + "/dashboard", {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(response => response.json())
    }

    async function getHeatsTopScore(workoutId, divisionId) {
        return fetch("https://competitioncorner.net/api2/v1/leaderboard/workouts/" + workoutId + "/top-results?divisionId=" + divisionId, {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(response => response.json())
    }

    async function loadInfoEventCC(eventId) {
        let response = await fetch("https://competitioncorner.net/api2/v1/events/" + eventId);
        let json = await response.json();
        return json;
    }

    async function loadWorkouts(eventId) {
        return fetch("https://competitioncorner.net/api2/v1/events/" + eventId + "/workouts/", {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(response => response.json())
    }

    async function loadWorkoutsPlanning(eventId) {
        return fetch("https://competitioncorner.net/api2/v1/schedule/events/" + eventId + "/workouts")
            .then(response => response.json())
    }

    async function loadHeats(workoutId) {
        return fetch('https://competitioncorner.net/api2/v1/schedule/workout/' + workoutId)
            .then((response) => response.json())
    }

    async function loadParticpant(eventId, workoutID) {
        return fetch("https://competitioncorner.net/api2/v1/events/" + eventId + "/workouts/" + workoutID + "/eligible-participants", {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((response) => response.json());
    }

    async function loadAttributionLane(eventId, workoutId, heatId, start, end) {
        return fetch("https://competitioncorner.net/api2/v1/events/" + eventId + "/cuecard/heat-lane?workoutId=" + workoutId + "&heatId=" + heatId + "&hideEmptyLanes=true&from=" + start + "&totalCount=" + end, {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token },
        }).then((response) => {
            return response.json();
        }).catch((err) => { return err })
    }

    async function loadHeatResults(eventId, workoutId, heatId, start, end) {
        return fetch("https://competitioncorner.net/api2/v1/events/" + eventId + "/cuecard/heat-results?workoutId=" + workoutId + "&heatId=" + heatId + "&skipWd=true", {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token },
        }).then((response) => {
            return response.json();
        }).catch((err) => { return err })
    }

    async function loadDivisionWorkoutResults(eventId, divisionId, workoutId, start, end) {
        return fetch("https://competitioncorner.net/api2/v1/events/" + eventId + "/cuecard/division-results?divisionId=" + divisionId + "&workoutId=" + workoutId + "&from=" + start + "&totalCount=" + end, {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token },
        }).then((response) => {
            return response.json();
        }).catch((err) => { return err })
    }

    async function loadOverallStanding(eventId, scoringGroup, start, end) {
        return fetch("https://competitioncorner.net/api2/v1/events/" + eventId + "/cuecard/standing?scoringGroup=" + scoringGroup + "&from=" + start + "&totalCount=" + end, {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token.value },
        }).then((response) => {
            return response.json();
        }).catch((err) => { return err })
    }

    // async function loadDivisions(eventId){
    //     return fetch("https://competitioncorner.net/api2/v1/lookups/"+ eventId +"/divisions" , {
    //         method:"GET",
    //         headers:{'Authorization': 'Bearer ' + token},
    //     }).then((response)=>{
    //         return response.json();
    //     }).catch((err)=>{return err})
    // }

    async function loadWorkoutsByDivision(eventId, divisionId) {
        return fetch("https://competitioncorner.net/api2/v1/lookups/" + eventId + "/workouts?divisionId=" + divisionId, {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token },
        }).then((response) => {
            return response.json();
        }).catch((err) => { return err })
    }

    async function loadHeatsByWorkout(eventId, workoutId) {
        return fetch("https://competitioncorner.net/api2/v1/lookups/" + eventId + "/workouts/" + workoutId + "/heats", {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token },
        }).then((response) => {
            return response.json();
        }).catch((err) => { return err })
    }

    async function loadParticpantId(eventId, id) {
        return await fetch("https://competitioncorner.net/api2/v1/events/" + eventId + "/participants/" + id, {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((response) => response.json());
    }

    async function loadAthlete(alias) {
        return fetch("https://competitioncorner.net/api2/v1/accounts/athletepage/" + alias, {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + token.value }
        }).then((response) => response.json())
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
        loadParticpant,
        loadAttributionLane,
        loadDivisionWorkoutResults,
        loadHeatResults,
        loadOverallStanding,
        loadWorkoutsByDivision,
        loadHeatsByWorkout,
    }
}