let intervalStatic = null;
let intervalDynamic = null;

    async function ConnectionSK(){
        try{

            let addIp = $('#address_IP').val()
            adr_IP_static = addIp + '/Static.json';
            adr_IP_dynamics = addIp + '/Dynamics.json';
            
            getStatics(adr_IP_static);

            if(intervalStatic != null){
                console.log('clear')
                clearInterval(intervalStatic)
                intervalStatic = null;
            }
            if(intervalDynamic != null){
                console.log('clear')
                clearInterval(intervalDynamic)
                intervalDynamic = null;
            }
            
            intervalStatic = setInterval(getStatics, 1000, adr_IP_static);
            intervalDynamic = setInterval(getDynamics, 1000, adr_IP_dynamics);
    
    
            document.getElementById('connection_but').disabled = true;
            
            dataNewConfig.staticServer = addIp
            dataNewConfig.ntpAdress = $('#adresse_ntp').val();
    
            nodecg.sendMessage('dataOverwrite', dataNewConfig);


            Connected.value = true;


        }catch(e){
            console.log(e)
        }

    }


    async function updateOverlayStatics() {
        getStatics(adr_IP_static)
                .then(function(statics) {
                    // console.log('static')

                    // if(statics.eventId != undefined){
                    //     let sameJson = sha256(staticJSONString) == sha256(JSON.stringify(statics));
                    //     console.log(sameJson)
                    //     if (sameJson) {
                    //         return
                    //     }
                    //     staticJSONString = JSON.stringify(statics);
                    //     // statics.logoUrl = LogoImg.value

                    //     const {WorkoutInfo, heatInfo, athletes, ...rest} = statics
        

                    //     eventInfos.value = rest
                    //     console.log('event in ok')
                    //     heatInfos.value = heatInfo
                    //     console.log('event in ok')
                    //     workoutInfo.value = WorkoutInfo
                    //     console.log('event in ok')
                    //     s_athletes.value = athletes
                    //     console.log('event in ok')

                    //     // Statics.value = statics
        
                    //     updateScoreToBeat(statics.workoutId , statics.athletes);
                    // }

                }).then(()=>{
                    StateConnection('connected','static','')
                })
                .catch(function(e) {
                    console.log(e)
                    StateConnection('error','static', e)
                    // Deconnection();
                })
    }

    async function updateOverlayDynamics() {
        getDynamics(adr_IP_dynamics)
            .then(function(dynamics) {
                console.log('dynamics')

                if(dynamics.eventId != undefined){
                    const {athletes, status, NtpTimeStart, ...rest} = dynamics

                    // Insert des datas dans l'objet status
                    statusHeat.value = {status, NtpTimeStart}

                    console.log(statusHeat.value)
                    
                    // Insert des nouvelles datas des athletes
                    d_athletes.value = athletes

                    // Dynamics.value = dynamics
                }

                // console.log(dynamics)
            }).then(()=>{
                StateConnection('connected','dynamic','')
            })
            .catch(function(e) {
                console.log(e)
                StateConnection('error','dynamic', e)
                // Deconnection();
            })
    }
