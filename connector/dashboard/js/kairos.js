function createKairosView(){
    workoutsMQTT.on('change',(newValue, oldValue)=>{
        // createOptionWorkout(newValue)
    })

    $("#workoutsMqtt").on('change',  function(){
        createOptionHeat(this.value)
    })
}


function createOptionWorkout(data){
    $("#workoutsMqtt option").remove()

    $("#workoutsMqtt").append('<option value=0>-- Please Choose Workout --</option>')
    $("#workoutsMqtt").append('<option value=0>-- Please Choose Workout --</option>')

    for(let workout of data){
        $("#workoutsMqtt").append('<option value='+ workout.id +'>' + workout.name + '</option>');
    }
}

function createOptionHeat(id){
    console.log(id)
    $("#heatsMqtt option").remove()

    $("#heatsMqtt").append('<option value=0>-- Please Choose Heat --</option>')

    for(let heat of data){
        $("#heatsMqtt").append('<option value='+ heat.heatId +'>' + heat.heatName + '</option>');
    }
}

function changeHeat(){
    let data = {
        'workoutId': 0,
        'heatId' : 0
    }

    console.log($('#workoutsMqtt').val())


    data.workoutId = $('#workoutsMqtt').val()
    data.heatId = $('#heatsMqtt').val()

    nodecg.sendMessage('change_heat', data)

}


function startChrono(){
    let data = {
        'minutes': 0,
        'secondes' : 0,
        'type':''
    }

    data.type = heatInfos.value.type | 'time'

    let timeCap = heatInfos.value.timeCap

    data.minutes = parseInt(timeCap.split(':')[1]) | 1
    data.secondes = parseInt(timeCap.split(':')[2]) | 0

    nodecg.sendMessage('change_heat', data)

}