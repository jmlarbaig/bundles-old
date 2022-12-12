
    const logoEvent = nodecg.Replicant('assets:logoEvent','connector')
    const mainSponsors = nodecg.Replicant('assets:mainSponsor','connector')

    const sponsors = nodecg.Replicant('assets:sponsors', 'connector')
    const sponsorLower = nodecg.Replicant('assets:sponsorLower', 'versus') 

    // Appel des infos de l'événements
    const eventInfos = nodecg.Replicant('eventInfos', 'connector');

    // Replican from Competition Corner Control
    const attributeLaneIndex = nodecg.Replicant('attributeLaneIndex')
    const heatResultIndex = nodecg.Replicant('heatResultIndex')
    const OSDivisionWorkout = nodecg.Replicant('OSDivisionWorkout')


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

    eventInfos.on('change', (newValue, oldValue) => {
        if (newValue != oldValue && newValue != undefined){
            switch(overlay){
                case 'attribution-lane':
                    resetAttrLane(newValue)
                    break;
                case 'heat-result':
                    resetHeatResults(newValue)
                    break;
                case 'overall-division-workout':
                    resetHeatResults(newValue)
                    break;
            }
        }
    })
    
    attributeLaneIndex.on('change', (newValue, oldValue)=>{
        if((newValue == 'minus' || newValue == 'plus')){
            changeLane(newValue)
        }
    })

    heatResultIndex.on('change', (newValue, oldValue)=>{
        console.log(newValue)
        if((newValue == 'minus' || newValue == 'plus') && (overlay == 'heat-result' || overlay == 'overall-division-workout')){
            changeLane(newValue)
        }
    })

    OSDivisionWorkout.on('change', (newValue, oldValue)=>{
        if(overlay == 'overall-division-workout'){
            console.log(newValue)
            resetWorkoutDivision(newValue)
        }
    })