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
                        console.log("salut")
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

    // async function updateWorkout(eventId){
    //     var data = await loadWorkoutsPlanning(eventId);

    //     WorkoutTab = data.workouts;

    //     let i=0;
    //     for(let workout of WorkoutTab){
    //         // console.log(i++)
    //         // workout.heats = await loadHeats(workout.id)
    //         // workout.participants = await loadParticpant(eventId, workout.id)

    //         await loadHeats(workout.id).then((value) => {
    //             workout.heats = value;
    //             console.log(value);
    //             // expected output: "Success!"
    //         })
    //         await loadParticpant(eventId, workout.id).then((value)=>{
    //             console.log(value)
    //             workout.participants = value;
    //         })

    //     }

    //     EventPlanner = [];

    //     for(let date of data.dates){
    //         EventPlanner.push(date)
    //     }

    //     for(let date of EventPlanner){
    //         date.wods = []
    //         for(let wod of WorkoutTab){
    //             if(wod.date == date.value){
    //                 date.wods.push(wod)
    //             }
    //         }
    //     }

    //     // ParticipantsWod.value = WorkoutTab
    //     // WodTab.value = EventPlanner;

    // }

    // function updateWarmUp(logoUrl, workoutId, heatId){

    //     try{
    //     // var heatWUP = {"wod":[],"heat":[]};

    //     heatWUP = []
    //     var d = {"wod" :"", "heat":""}
    //     var d2 = {"wod" :"", "heat":""}
    //     var d3 = {"wod" :"", "heat":""}
    //     // console.log("Workout Id =", workoutId)
    //     // console.log("heat Id =", heatId)
    //     // console.log("Workout Tab = ", WorkoutTab)
    //     if (WorkoutTab != undefined){
    //         for (let i=0; i < WorkoutTab.length; i++){
    //             if(WorkoutTab[i].id == workoutId){
    //                 for(let y=0; y < WorkoutTab[i].heats.length; y++){
    //                     if (WorkoutTab[i].heats[y].id == heatId){
    //                         d.wod = (WorkoutTab[i])
    //                         d.heat = (WorkoutTab[i].heats[y])
    //                         if(WorkoutTab[i].heats[y+1] == undefined){
    //                             if(WorkoutTab[i+1].heats[0] != undefined){
    //                                 d2.heat = (WorkoutTab[i+1].heats[0])
    //                                 d2.wod = (WorkoutTab[i+1])
    //                                 if(WorkoutTab[i+1].heats[1] != undefined){
    //                                     d3.heat = (WorkoutTab[i+1].heats[1])
    //                                     d3.wod = (WorkoutTab[i+1])
    //                                 }
    //                             }
    //                         }
    //                         else {
    //                             d2.heat = (WorkoutTab[i].heats[y+1])
    //                             d2.wod = (WorkoutTab[i])

    //                             if(WorkoutTab[i].heats[y+2] == undefined){
    //                                 if(WorkoutTab[i+1].heats[0] != undefined){
    //                                     d3.heat = (WorkoutTab[i+1].heats[0])
    //                                     d3.wod = (WorkoutTab[i+1])
    //                                 }
    //                             }
    //                             else {
    //                                 d3.heat = (WorkoutTab[i].heats[y+2])
    //                                 d3.wod = (WorkoutTab[i])
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
            
    //         d.heat.current = "CURRENT"
    //         d2.heat.current = "NEXT"
    //         d3.heat.current = "CALL FOR WARM UP"
            
    //         heatWUP.push(d)
    //         heatWUP.push(d2)
    //         heatWUP.push(d3)

    //         WarmUpTab.value = heatWUP
    //         // console.log(heatWUP)
    //     }
    //     }
    //     catch(e){
    //         console.log(e)
    //         document.getElementById('log_error_static').innerHTML = e;
    //     }
    // }

    async function testButton(){
        // var response = await dashboardEventCC(document.getElementById('eventId').value)
        var result = await getHeatsTopScore(36997,28600);
        console.log('Resultats Heat = ', result)
    }

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

            //  !Faire les configs pour planning / wod / warmup

            document.getElementById('connection_but').disabled = true;
            
            dataNewConfig.staticServer = adr_IP_static
            dataNewConfig.dynamicServer = adr_IP_dynamics
            dataNewConfig.timeStatic = timer_updatestatic
            dataNewConfig.timeDynamics = timer_updatedynamic

            // dataConfig.value = dataNewConfig;

            nodecg.sendMessage('dataOverwrite', dataNewConfig);

            getLocalIP().then((ipAddr) => {
                console.log(ipAddr); // 192.168.0.122
                ipAddress.value = ipAddr
            });

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


/**
 * Get Local IP Address
 * 
 * @returns Promise Object
 *
 * getLocalIP().then((ipAddr) => {
 *    console.log(ipAddr); // 192.168.0.122
 * });
 */
 function getLocalIP() {
    return new Promise(function(resolve, reject) {
      // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
      var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
  
      if (!RTCPeerConnection) {
        reject('Your browser does not support this API');
      }
      
      var rtc = new RTCPeerConnection({iceServers:[]});
      var addrs = {};
      addrs["0.0.0.0"] = false;
      
      function grepSDP(sdp) {
          var hosts = [];
          var finalIP = '';
          sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
              if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                  var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                      addr = parts[4],
                      type = parts[7];
                  if (type === 'host') {
                      finalIP = addr;
                  }
              } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                  var parts = line.split(' '),
                      addr = parts[2];
                  finalIP = addr;
              }
          });
          return finalIP;
      }
      
      if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
          rtc.createDataChannel('', {reliable:false});
      };
      
      rtc.onicecandidate = function (evt) {
          // convert the candidate to SDP so we can run it through our general parser
          // see https://twitter.com/lancestout/status/525796175425720320 for details
          if (evt.candidate) {
            var addr = grepSDP("a="+evt.candidate.candidate);
            resolve(addr);
          }
      };
      rtc.createOffer(function (offerDesc) {
          rtc.setLocalDescription(offerDesc);
      }, function (e) { console.warn("offer failed", e); });
    });
  }
