
    let eventLogo = []
    let infos;
    let root = document.documentElement;


    const Colors = nodecg.Replicant('Colors', 'configuration');
    const logoEvent = nodecg.Replicant('assets:logoEvent','connector')
    const eventInfos = nodecg.Replicant('eventInfos', 'connector');
    const lowerThirdData = nodecg.Replicant('lowerThirdData')

    // Initialisation du choix de la vue
    let overlay=''

    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')
    })

    let $root = $('#rootlowerthird');

    logoEvent.on('change',(newValue)=>{
        if(newValue.length > 0){
            eventLogo = newValue[0].url;
            $(".logo_event").css("background-image", "url(" + eventLogo + ")")
        }
    })

    eventInfos.on('change', (newValue)=>{
        infos = newValue
    })

    lowerThirdData.on('change', (newValue, oldValue)=>{
        if(newValue != undefined){
            switch(overlay){
                case 'free':
                    newValue.type == 'free' && createFree(newValue)
                    break;
                case 'waiting':
                    newValue.type == 'waiting' && createWaiting(newValue)
                    break;
                case 'presentator':
                    newValue.type == 'presentator' && createPresentator(newValue)
                    break;
                case 'athlete':
                    newValue.type == 'athlete' && createAthlete(newValue)
                    break;
                case 'lowerthirds':
                    createLowerThird(newValue);
                    break;
            }
        }
    })

    Colors.on('change', (newValue, oldValue) => {

        Object.keys(newValue).forEach((color, index) => {
            root.style.setProperty("--"+ color, newValue[color] );
            // Clrs[color] = newValue[color]
        })
        
    })