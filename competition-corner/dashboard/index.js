
    const eventId = nodecg.Replicant('eventId', 'connector');
    const Divisions = nodecg.Replicant('Divisions', 'connector')
    const attributeLaneIndex = nodecg.Replicant('attributeLaneIndex', { persistenceInterval: 100 });
    const OSDivisionWorkout = nodecg.Replicant('OSDivisionWorkout')

    function changeLane(){
        attributeLaneIndex.value = event.target.id;
        setTimeout(()=>{
            attributeLaneIndex.value = ''
        }, 1000)
    }

    let _eventId;
    let selectedDivision;
    let id = 0;

    eventId.on('change', (newValue, oldValue) => {
        _eventId = newValue;
            // loadOptionDivisions(newValue);
    })

    Divisions.on('change', (newValue)=> {
        loadOptionDivisions(newValue);
    })
    
    $(document).ready(function(){
        $("#division-select").change(function(){
            selectedDivision = $(this).children("option:selected").val();
            loadOptionsWorkouts(_eventId, selectedDivision)
        });

        $("#workout-select").change(function(){
            var workoutSelected = $(this).children("option:selected").val();
            OSDivisionWorkout.value = {selectedDivision, workoutSelected}
        });
    });
