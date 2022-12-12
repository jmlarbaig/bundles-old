
    async function ConnectionSK(){
        try{
            $('#skState').text("CONNECTING..");
            $('#led_SK').removeClass('led-green led-red')
            $('#led_SK').addClass('led-orange')

            let addIp = $('#address_IP').val()
            adr_IP_static = addIp + '/Static.json';
            adr_IP_dynamics = addIp + '/Dynamics.json';
            
            updateOverlayStatics();
    
            Connected.value = true;
            statics_timer = setInterval(updateOverlayStatics, 1000);
            dynamics_timer = setInterval(updateOverlayDynamics, 1000);
    
            document.getElementById('connection_but').disabled = true;
            
            dataNewConfig.staticServer = addIp
    
            nodecg.sendMessage('dataOverwrite', dataNewConfig);
    
            $('#skState').text("CONNECTED")
            $('#led_SK').removeClass('led-orange led-red')
            $('#led_SK').addClass('led-green')
    

        }catch(e){
            console.log(e)            
            Deconnection();
        }

    }


    async function updateOverlayStatics() {
        getStatics(adr_IP_static)
                .then(function(statics) {

                    if(statics.eventId != undefined){
                        let sameJson = sha256(staticJSONString) == sha256(JSON.stringify(statics));
                        console.log(sameJson)
                        if (sameJson) {
                            return
                        }
                        staticJSONString = JSON.stringify(statics);
                        // statics.logoUrl = LogoImg.value

                        const {WorkoutInfo, heatInfo, athletes, ...rest} = statics
        

                        eventInfos.value = rest
                        console.log('event in ok')
                        heatInfos.value = heatInfo
                        console.log('event in ok')
                        workoutInfo.value = WorkoutInfo
                        console.log('event in ok')
                        s_athletes.value = athletes
                        console.log('event in ok')

                        // Statics.value = statics
        
                        updateScoreToBeat(statics.workoutId , statics.athletes);
                    }

                })
                .catch(function(e) {
                    console.log(e)
                })
    }

    async function updateOverlayDynamics() {
        getDynamics(adr_IP_dynamics)
            .then(function(dynamics) {

                if(dynamics.eventId != undefined){
                    const {athletes, status, NtpTimeStart, ...rest} = dynamics

                    // Insert des datas dans l'objet status
                    statusHeat.value = {status, NtpTimeStart}

                    console.log(statusHeat.value)
                    
                    // Insert des nouvelles datas des athletes
                    d_athletes.value = athletes

                    // Dynamics.value = dynamics
                }
                
                console.log(dynamics)
            })
            .catch(function(e) {
                console.log(e)
            })
    }
