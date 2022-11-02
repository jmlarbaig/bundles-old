
function updateHeat(data){
    console.log(data)

    var divisionsNames = []
    var repTarget = []
    var workout = []
    
    for(let athletes of data.athletes){
        if( !divisionsNames.includes(athletes.division) ){
            divisionsNames.push(athletes.division)
        }
    }

    for(let y=0; y < divisionsNames.length; y++){
        for(let wod of data.WorkoutInfo){
            if(divisionsNames[y] == wod.division){
                repTarget[y] = wod.total_reps
                workout[y] = wod;
            }
        }
    }

    var eventName = data.eventName
    var heatName = data.heatName
    var heatTime = data.heatTime
    var workoutName = data.workoutName
    var location = data.location

    var $tab = $("#cis_heat")
    $tab.find(".rowHeat").remove();
    $tab.find(".wodDescription").remove();


    var $item = $( 
        '<div class="rowHeat" >' + 
            '<div>'+
                '<span class="time heatName">'+ heatTime + ' : ' + heatName +'</span>' + 
            '</div>' +
            '<div> ' +
                '<span class="workout Name">'+ workoutName +'</span> '+
            '</div>' +
            '<div>'+
                '<h3 class="eventName">' + eventName + '</h3>' + 
            '</div>' +
            '<div> ' +
                '<span class="location">' + location +  '</span> '+
            '</div>' +
        '</div>'+
        '<div class="wodDescription">'+
        '</div>' 
    );
    $tab.append($item);

    var $description = $(".wodDescription")
    $description.find(".description").remove();

    workout.forEach((wod, index)=>{
        let mvtDescription = wod.description.replaceAll('<p>', '  ') ;
        mvtDescription = mvtDescription.replaceAll('</p>',' ')
        mvtDescription = mvtDescription.replaceAll('_',' ')
        var $item = $( 
            '<div class="col">'+
                '<div class="description row" >' + 
                    '<span class="division col-3">Divison : '+divisionsNames[index]+'</span>' + 
                    '<span class="wodDescription col">'+ mvtDescription +'</span>' + 
                '</div>'+
                '<div class="repTarget_Team row"> ' +
                '</div>' +
            '</div>' 
        );
        $description.append($item);
    })

}