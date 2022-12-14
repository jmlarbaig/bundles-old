
    let root = document.documentElement;
    
    const Colors = nodecg.Replicant('Colors', 'configuration');
    const mainSponsors = nodecg.Replicant('assets:mainSponsor','connector')

    const DatesEvent = nodecg.Replicant('DatesEvent', 'connector');
    const WodTab = nodecg.Replicant('WodTab', 'connector');


    // Destructuration du fichier static
    const eventInfos = nodecg.Replicant('eventInfos', 'connector');


    const logoEvent = nodecg.Replicant('assets:logoEvent','connector')

    // Destructuration du fichier Dynamic
    const statusHeat = nodecg.Replicant('status', 'connector');

    let eventLogo;

    logoEvent.on('change', (newValue, oldValue) => {
        try{
            if(newValue.length > 0){
                eventLogo = newValue[0].url
                $("#logo").css("background-image", "url(" + newValue[0].url + ")");
            }
        }
        catch(e){
            console.log(e)
        }
    }); 


    var workoutId=0;



    eventInfos.on('change', (newValue)=>{
        resetHeader(newValue)
        updateWorkout(newValue);
    })

    Colors.on('change', (newValue, oldValue) => {

        Object.keys(newValue).forEach((color, index) => {
            // console.log(color, newValue[color])
            root.style.setProperty("--"+ color, newValue[color] );
            // Clrs[color] = newValue[color]
        })
        
    })


    let overlay=''
    
    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')
    })