
    const logoEvent = nodecg.Replicant('assets:logoEvent','connector')
    const mainSponsors = nodecg.Replicant('assets:mainSponsor','connector')

    const DatesEvent = nodecg.Replicant('DatesEvent', 'connector');
    const WodTab = nodecg.Replicant('WodTab', 'connector');

    
    
    const statics = nodecg.Replicant('statics', 'connector');


    // Destructuration du fichier static
    const eventInfos = nodecg.Replicant('eventInfos', 'connector');
    const heatInfos = nodecg.Replicant('heatInfos', 'connector');
    const workoutInfo = nodecg.Replicant('workoutInfo', 'connector');
    const s_athletes = nodecg.Replicant('s_athletes', 'connector');

    // Destructuration du fichier Dynamic
    const statusHeat = nodecg.Replicant('status', 'connector');


    var workoutId=0;

    statics.on('change', (newValue)=>{
        resetHeader(newValue)
        updateWorkout(newValue);
    })


    let overlay=''
    
    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')
    })