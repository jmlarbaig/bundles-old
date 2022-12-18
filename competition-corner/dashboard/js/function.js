
async function resetOption(){
    $("#division-select option").append('<option value=0>-- Please Choose Division --</option>')

    $("#workout-select option").append('<option value=0>-- Please Choose Workout --</option>')
}

async function loadOptionsWorkoutHeat(workouts){

    $("#workout_heat-select option").remove()

    for(let workout of workouts){
        $("#workout_heat-select").append('<option value='+ workout.id +'>' + workout.name + '</option>');
    }
}

async function loadOptionsHeats(heats){

    $("#heat-select option").remove()

    for(let heat of heats){
        $("#heat-select").append('<option value='+ heat.key +'>' + heat.value + '</option>');
    }
}

async function loadOptionDivisions(divisions){

    $("#division-select option").remove()

    for(let division of divisions){
        $("#division-select").append('<option value='+ division.id +'>' + division.title + '</option>');
    }
}

async function loadOptionsWorkoutsDivision(workouts){

    $("#workout_division-select option").remove()

    for(let workout of workouts){
        $("#workout_division-select").append('<option value='+ workout.key +'>' + workout.value + '</option>');
    }
}