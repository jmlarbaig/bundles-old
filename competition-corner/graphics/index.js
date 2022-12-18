
    const logoEvent = nodecg.Replicant('assets:logoEvent','connector')
    const mainSponsors = nodecg.Replicant('assets:mainSponsor','connector')

    const sponsors = nodecg.Replicant('assets:sponsors', 'connector')
    const sponsorLower = nodecg.Replicant('assets:sponsorLower', 'versus') 

    const AttributionLane = nodecg.Replicant('AttributionLane', 'connector');
    const HeatResults = nodecg.Replicant('HeatResults', 'connector')
    const OSDivisionWorkout = nodecg.Replicant('OSDivisionWorkout', 'connector')

    let overlay=''
    let eventLogo;
    let initialCount = 0;
    let athletes;
    let maximumAthlete = 10;
        
    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')
    })

    logoEvent.on('change', (newValue) => {
        if(newValue.length > 0){
            eventLogo = newValue[0].url;
            $('.headerLogo-img').css("background-image", "url("+newValue[0].url+")")
        }
    })

    AttributionLane.on('change', (newValue, oldValue)=>{
        if(overlay == 'attribution-lane'){
            resetAttrLane(newValue)
        }
    })

    HeatResults.on('change', (newValue, oldValue)=>{
        if(overlay == 'heat-result'){
            resetHeatResults(newValue)
        }
    })

    OSDivisionWorkout.on('change', (newValue, oldValue)=>{
        if(overlay == 'overall-division-workout'){
            resetWorkoutDivision(newValue)
        }
    })

