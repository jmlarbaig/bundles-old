const dataNewConfigCC = {"usernameCC":"","passwordCC":"", "eventId":0}

var staticJSONString = "";
var dynamicJSONString = "";
var heatId = "";
var athletes_final = new Array();
let sameJson;
var adr_IP_static;
var adr_IP_dynamics;
var EventPlanner = [];
var heatWUP = []
var static_
var workoutId;
var wodId;

var statics_timer;
var dynamics_timer;

var init = false

var data = []

var liste_donnees = {'Team':[], 'Individual':[]}


    data_ath.on('change', (newValue, oldValue) => {
        if (newValue.length > 0){
            if (newValue != oldValue){
                liste_donnees = {'Team':[], 'Individual':[]}
                listeAthlete.value = {'Team':[], 'Individual':[]}
                $.getJSON( newValue[0].url, function( data ) {
                    console.log("Data = ",data)
                    // updateData(data)
                    listeAthlete.value = data.Athletes
                    // console.log(items)
                  });
            }
        }
    })

    async function updateOverlayStatics() {
        getStatics(adr_IP_static)
                .then(function(statics) {

                    if(statics.eventId != undefined){
                        let sameJson = sha256(staticJSONString) == sha256(JSON.stringify(statics));
                        if (sameJson) {
                            return
                        }
                        staticJSONString = JSON.stringify(statics);
                        // statics.logoUrl = LogoImg.value
        
                        statics_R.value = statics
        
                        console.log("statics from update = ",statics)
        
                        document.getElementById('log_static').innerHTML = JSON.stringify(statics, undefined, 4);
                        // updateWarmUp(statics.logoUrl, statics.workoutId, statics.heatId)
                        // if(workoutId != statics.workoutId){
                            // updateWorkout(statics.eventId);
                        //     workoutId = statics.workoutId;
                        // }
                        updateScoreToBeat(statics.workoutId , statics.athletes);
                        // AttributionLane.value = loadAttributionLane(statics.heatId)
                    }

                })
                .catch(function(e) {
                    console.log(e)
                    document.getElementById('log_error_static').innerHTML = e;
                })
    }

    async function updateOverlayDynamics() {
        getDynamics(adr_IP_dynamics)
            .then(function(dynamics) {
                console.log("Dynamics : ",dynamics)

                document.getElementById('log_dyn').innerHTML = JSON.stringify(dynamics, undefined, 4);
                // if (dynamics.status != "0" && dynamics.athletes[0].CurrentRank != null){
                    dynamics_R.value = dynamics
                // }
            })
            .catch(function(e) {
                console.log(e)
                document.getElementById('log_error_dynamic').innerHTML = e;
            })
    }

    async function updateEvent(eventId){
        var data = await loadInfoEventCC(eventId);
        var dashboard = await dashboardEventCC(document.getElementById('eventId').value)

        console.log("Dashboard division ",dashboard.divisions)

        // console.log('Resultats Heat = ', result)
        affiliateStats.value = dashboard.affiliates
        divisionsEvent.value = dashboard.divisions

    }

    logoEvent.on('change', (newValue) => {
        // console.log(newValue[0].url)
        if(newValue.length>0){
            LogoImg.value = newValue[0].url
        }
    })

    async function updateScoreToBeat(workoutId, athletes){
        var divisionName = [];
        var divisionId = [];
        athletes.forEach(function(athlete){
            // console.log("division Athlete = ", athlete.division)
            // console.log("true = ", !divisionName.includes(athlete.division))
            if( !divisionName.includes(athlete.division) ){
                divisionName.push(athlete.division)
            }
        });

        console.log("Divison Name = ",divisionName)
        console.log("divisionsEvent = ",divisionsEvent.value)

        for (let division of divisionName){
            let div = divisionsEvent.value.find( element => element.title === division)
            console.log("div_ID",div)
            divisionId.push(div)
        }

        console.log("Divison ID = ",divisionId)
        var result = []
        for await (let element of divisionId){
            if (element != undefined){
                // console.log("élément : ", element)
                let res = await getHeatsTopScore(workoutId, element.id);
                console.log("top =", res)
                result.push(res)
            }
        }
        // var result = await getHeatsTopScore(workoutId,divisionId);
        // console.log("result ID = ",result)
        TopScore.value = result
    }

    async function updateWorkoutInfos(eventId){
        var data = await loadWorkouts(eventId);
        WorkoutInfos.value = data;
    }

    // async function testButton(){
    //     var result = await getHeatResults(268188);
    //     console.log('Resultats Heat = ', result)
    // }

    // async function testButton2(){
    //     var result = await getWorkoutResults();
    //     console.log('Resultats Heat = ', result)
    // }

    // async function testButton3(){
    //     var result = await getOverallStanding();
    //     console.log('Resultats Heat = ', result)
    // }

    async function ConnectionCC(){
        try{
            let user = document.getElementById('usernameCC').value.toString()
            let passwd = document.getElementById('passwordCC').value.toString()
            let eventId = document.getElementById('eventId').value
            eventId_R.value = eventId

            document.getElementById('log_CC').value = "WAITING ! WAITING ! WAITING !"
            
            await logCC(user, passwd)

            dataNewConfigCC.usernameCC = user
            dataNewConfigCC.passwordCC = passwd
            dataNewConfigCC.eventId = eventId

            // dataConfigCC.value = dataNewConfigCC;
            nodecg.sendMessage('dataOverwriteCC', dataNewConfigCC);

            // nodecg.sendMessage('dataOverwriteCC', dataNewConfigCC);
            
            await updateEvent(eventId)
            // await updateWorkout(eventId)
            await updateWorkoutInfos(eventId)

            document.getElementById('log_CC').value = "CONNECTED."
            // document.getElementById('log_CC').value = "Connected." + token
            // document.getElementById('connection_but_CC').disabled = true;
        }
        catch(e){
            console.log(e)
            document.getElementById('log_CC').value = "ERROR CONNECTION"
            alert(e)
        }
    }

    function Connection(){
        try{
            adr_IP_static = document.getElementById('address_IP_statics').value.toString();
            adr_IP_dynamics = document.getElementById('address_IP_dynamics').value.toString();

            var timer_updatestatic = document.getElementById('timer_static').value;
            var timer_updatedynamic = document.getElementById('timer_dynamic').value;
            
            updateOverlayStatics();

            Connection_R.value = true;
            statics_timer = setInterval(updateOverlayStatics, timer_updatestatic);
            dynamics_timer = setInterval(updateOverlayDynamics, timer_updatedynamic);

            document.getElementById('connection_but').disabled = true;
            
            dataNewConfig.staticServer = adr_IP_static
            dataNewConfig.dynamicServer = adr_IP_dynamics
            dataNewConfig.timeStatic = timer_updatestatic
            dataNewConfig.timeDynamics = timer_updatedynamic

            // dataConfig.value = dataNewConfig;

            nodecg.sendMessage('dataOverwrite', dataNewConfig);

        }
        catch(e){
            console.log(e)
            document.getElementById('log_static').innerHTML = e;
            document.getElementById('log_dyn').innerHTML = e;
        }
    }

    function Deconnection(){
        try{
            document.getElementById('connection_but').disabled = false;
            document.getElementById('log_static').innerHTML = "Deconnection succesful";
            document.getElementById('log_dyn').innerHTML = "Deconnection succesful";
            nodecg.sendMessageToBundle('connection', 'leaderboard', false);
            clearInterval(statics_timer)
            clearInterval(dynamics_timer)
            Connection_R.value = false;
            staticJSONString = "";
            dynamicJSONString = "";

            document.getElementById('log_error_static').innerHTML = "";
            document.getElementById('log_error_dynamic').innerHTML = "";
        }
        catch(e){
            console.log(e)
            document.getElementById('log_static').innerHTML = e;
            document.getElementById('log_dyn').innerHTML = e;
        }
    }


    nodecg.readReplicant('dataConfig', (value) =>{
        document.getElementById('address_IP_statics').value = value.staticServer.toString()
        document.getElementById('timer_static').value = value.timeStatic.toString()
        document.getElementById('address_IP_dynamics').value = value.dynamicServer.toString()
        document.getElementById('timer_dynamic').value = value.timeDynamics.toString()
    })


    nodecg.readReplicant('dataConfigCC', (value) =>{
        document.getElementById('usernameCC').value = value.usernameCC.toString()
        document.getElementById('passwordCC').value = value.passwordCC.toString()
        document.getElementById('eventId').value = value.eventId.toString()
    })

    ipAddress.on('change', (newValue, oldValue) => {
        let ipHtml = $('#ipAdresse');
        ipHtml.text(newValue)
        console.log(newValue.includes('10.'))
        if(newValue != undefined && newValue.includes('10.')){
            $('#led_ipAdresse').addClass('led-green')
            $('#led_ipAdresse').removeClass('led-red')
            $('#led_ipAdresse').removeClass('led-orange')
        }else if(newValue != undefined){
            $('#led_ipAdresse').addClass('led-orange')
            $('#led_ipAdresse').removeClass('led-red')
            $('#led_ipAdresse').removeClass('led-green')
        }else{
            $('#led_ipAdresse').removeClass('led-green')
            $('#led_ipAdresse').removeClass('led-red')
            $('#led_ipAdresse').addClass('led-orange')
        }
    })

    nowNtp.on('change', (newValue, oldValue)=>{
        if(!newValue.includes('Timeout waiting for NTP')){
            $('#ntpTime').text(newValue)
            $('#led_NTP').addClass('led-green')
            $('#led_NTP').removeClass('led-orange')
            $('#led_NTP').removeClass('led-red')
        }
        else{
            $('#ntpTime').text(newValue)
            $('#led_NTP').removeClass('led-red')
            $('#led_NTP').addClass('led-orange')
            $('#led_NTP').removeClass('led-green')
        }
    })

    Mqtt_connected.on('change', (newValue, oldValue) => {
        console.log("NewValue MQTT =",newValue)
        if(newValue.connected == true){
            $('#mqttMSG').text('Connected')
            $('#led_MQTT').addClass('led-green')
            $('#led_MQTT').removeClass('led-red')
        }
        else{
            if(newValue.error != ''){
                $('#mqttMSG').text('Reconnection ...')
            }else{
                $('#mqttMSG').text('Disconnected')
            }
            $('#led_MQTT').addClass('led-red')
            $('#led_MQTT').removeClass('led-green')
        }
    })