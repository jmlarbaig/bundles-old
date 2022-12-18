async function resetAttrLane(dataCC){

    // let dataCC = await loadAttributionLane(data.heatId)
  
    // Donnée de l'event Info
    console.log(dataCC)
  
    $('.headerLogo-text').text(dataCC.eventName)
    $('#heatName').text(dataCC.heatName)
    $('#workoutName').text(dataCC.workoutName)
  
    athletes = dataCC.participants
  
    console.log(athletes.length)
    maximumAthlete = athletes.length;
  
    loadTableLane(athletes)
  
  }

  async function resetHeatResults(dataCC){
    
    // Donnée de l'event Info
    // console.log(dataCC)
  
    $('.headerLogo-text').text(dataCC.eventName)
    $('#heatName').text(dataCC.heatName)
    $('#workoutName').text(dataCC.workoutName)
  
    athletes = dataCC.participants
  
    // console.log(athletes)
    maximumAthlete = athletes.length;
  
    loadTableResult(athletes)
  
  }
  

  async function resetWorkoutDivision(dataCC){

    // let dataCC = await loadDivisionWorkoutResult(data.selectedDivision, data.workoutSelected)
  
    // Donnée de l'event Info
    console.log(dataCC)
  
    $('.headerLogo-text').text(dataCC.eventName)
    $('#heatName').text(dataCC.divisionName)
    $('#workoutName').text(dataCC.workoutName)
  
    athletes = dataCC.athletesResults
  
    console.log(athletes)
    maximumAthlete = athletes.length;
  
    loadTableDivisionResults(athletes)
  
  }
  
  
  
  function changeLane(arrow){
    // arrow = event.target.id
    switch(arrow){
      case 'minus':
        if( initialCount > 0){
          initialCount -= 10
        }
        break;
      case 'plus':
        console.log(maximumAthlete)
        console.log((initialCount+10) <maximumAthlete)
        if((initialCount+10) <maximumAthlete){
          initialCount += 10;
        }
        console.log(initialCount)
        break;
    }

    switch(overlay){
        case 'attribution-lane':
            loadTableLane(athletes);
            break;
        case 'heat-result':
            loadTableResult(athletes)
            break;
        case 'overall-division-workout':
            loadTableDivisionResults(athletes);
            break;
    }
    
  }