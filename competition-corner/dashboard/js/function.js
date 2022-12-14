
async function resetOption(){
    $("#division-select option").append('<option value=0>-- Please Choose Division --</option>')

    $("#workout-select option").append('<option value=0>-- Please Choose Workout --</option>')

}

async function loadOptionDivisions(divisions){
    // let divisions = await loadDivisions(data)
    console.log(divisions)

    $("#division-select option").remove()

    for(let division of divisions){
        $("#division-select").append('<option value='+ division.id +'>' + division.title + '</option>');
    }
}

async function loadOptionsWorkouts(_EvId, divisionId){
    let workouts = await loadWorkoutsByDivision(_EvId, divisionId)
    console.log(workouts)

    $("#workout-select option").remove()

    for(let workout of workouts){
        $("#workout-select").append('<option value='+ workout.key +'>' + workout.value + '</option>');
    }
}