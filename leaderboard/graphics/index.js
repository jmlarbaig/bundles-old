    
    // initialization
    var athlete;
    var athletes;
    var timerId;
    var timecapNTP = [];
    var startTimeNTP;
    var heatId ;
    var heat_Name;
    var heatName;
    var resetVar = false;
    var athletes_final = new Array();
    var timerInterval= null;
    var dataTime;
    var athletesDivison;
    let Mvt_name = []

    let height_top = 150;

    let root = document.documentElement;

    let Clrs = {}

    let chrono;


    var showDrapeau;

    const setupLeaderboard = nodecg.Replicant('setupLeaderboard')
    const Colors = nodecg.Replicant('Colors', 'configuration');
    
    const logoEvent = nodecg.Replicant('assets:logoEvent','connector')
    const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')

    const timeNTP = nodecg.Replicant('timeNTP','connector')
    const nowNtp = nodecg.Replicant('nowNtp','connector')

    const listCis = nodecg.Replicant('CIS', 'connector')

    // Destructuration du fichier static
    const eventInfos = nodecg.Replicant('eventInfos', 'connector');
    const heatInfos = nodecg.Replicant('heatInfos', 'connector');
    const workoutInfo = nodecg.Replicant('workoutInfo', 'connector');
    const s_athletes = nodecg.Replicant('s_athletes', 'connector');

    // Destructuration du fichier Dynamic
    const statusHeat = nodecg.Replicant('status', 'connector');
    const d_athletes = nodecg.Replicant('d_athletes', 'connector');

    const bottomSponsors = nodecg.Replicant('assets:bottomSponsors', 'connector')

    const TopScore = nodecg.Replicant('TopScore', 'connector')
    const listWarmpUp = nodecg.Replicant('listWarmpUp', 'connector');


    // Initialisation du choix de la vue
    
    let overlay=''
    
    $('document').ready(()=>{
        let ch = document.location.pathname.split('/')
        overlay = ch[ch.length-1].replace('.html','')
        console.log('ready')
    })

    let newHeat = false;

    // on récupère les infos provenant du connecteur

    eventInfos.on('change',(newValue, oldValue)=>{
        if(newValue != undefined){
            if(JSON.stringify(newValue) !== JSON.stringify(oldValue)){
                resetHeat(newValue);
                if (newValue.heatId != heat.heatId){
                    newHeat = true;
                }else{
                    newHeat = false
                }
            }
        }
    })

    let tc
    let heat = {}

    heatInfos.on('change', (newValue, oldValue)=>{
        if(JSON.stringify(newValue) !== JSON.stringify(oldValue)){
            heat = typeWorkout(newValue)
            showTime(heat.timecap)
        }
    })

    let workouts = {}

    workoutInfo.on('change', (newValue, oldValue)=>{
        if(newValue != oldValue){
            workouts = treatWorkouts(newValue);
            workouts = newValue
        }
    })

    s_athletes.on('change', (newValue, oldValue)=>{
        console.log('update Static :', JSON.stringify(newValue) !== JSON.stringify(oldValue))
        if(JSON.stringify(newValue) !== JSON.stringify(oldValue)){
            resetLeaderboard(newValue);
        }
    })

    let statusWorkout = '0'
    let ntpStartTime;
    let startTime;
    let endTime;
    let timerLaunch = null;

    statusHeat.on('change', (newValue, oldValue)=>{
        if(JSON.stringify(newValue) !== JSON.stringify(oldValue)){
            if( newValue.NtpTimeStart !== ntpStartTime){
                ntpStartTime = newValue.NtpTimeStart
                startTime = timeToDateTime(ntpStartTime);
                endTime = timeToDateTime(ntpStartTime).setMinutes(startTime.getMinutes() + parseInt(tc[1]));
                if(timerLaunch != null){
                    clearInterval(timerLaunch)
                    timerLaunch = null;
                }
                newHeat = false
                timerLaunch = setInterval(updateTime, 500);
            }
            statusWorkout = newValue.status
        }
    })

    d_athletes.on('change', (newValue, oldValue)=>{
        if(overlay != 'sk' && newValue != undefined){
            updateDynamics(newValue, statusWorkout);
        }
    })

    let listOverall = []

    listWarmpUp.on('change', (newValue, oldValue)=>{
        if(newValue != undefined && JSON.stringify(newValue) != JSON.stringify(oldValue) && overlay == 'commentator'){
            let participantsHeat = newValue.warmUp[0].wod.participants
            let stations = newValue.warmUp[0].heat.stations
            for(let station of stations){
                let data = participantsHeat.find( element => element.id === station.participantId)
                listOverall[station.station] = {}
                listOverall[station.station].oR = data.rank
                listOverall[station.station].oP = data.points

                $('#oP_'+station.station).text(data.points)
                $('#oR_'+station.station).text(data.rank)
            }
            // console.log('warmup : ', newValue)
        }
    })


    TopScore.on('change', (newValue, oldValue)=>{
        // console.log("top Score = ",newValue[0][0].scores[0].score)
        if (newValue!=undefined && newValue.length > 0){
            let index=0;
            if (!newValue[0].hasOwnProperty('error')){
                for (let teams of newValue[0]){
                        console.log("top index =", index)
                        $('.repTarget'+index).html("-> "+teams.scores[0].score)
                        index++
                }
            }
        }
    })


    // Catégorie Assets

    logoEvent.on('change', (newValue, oldValue) => {
        try{
            if(newValue.length > 0){
                $("#logo").css("background-image", "url(" + newValue[0].url + ")");
                setupLeaderboard.value.logo != true ? $("#box_logo").hide() : ""
            }
        }
        catch(e){
            console.log(e)
        }
    });

    
    mainSponsors.on('change', (newValue)=> {
        if(newValue.length>0){

            $(".mainSponsor").css("background-image", "url(" + newValue[0].url + ")");
            $(".mainSponsor").fadeIn(1000)
        }
        else{
            $(".mainSponsor").fadeOut(1000)
        }
    })
    

    bottomSponsors.on('change', (newValue)=> {
        
        var $list = $("#sponsorLogo");
        $list.find(".sponsorImg").remove();

        if(newValue.length>0){
            $("#sponsorLogo").css('background-color', "black")
            newValue.forEach(element => {
                var $item = $('<img class="sponsorImg" id="sponsorImg" src="'+ element.url +'"></img>')
                $list.append($item);
            });
        }
        else{
            $("#sponsorLogo").css('background-color', "rgba(0,0,0,0)")
        }
    })

    var eventName

    // Congifuration et setup
    setupLeaderboard.on('change', (newValue, oldValue)=>{
        Object.keys(newValue).forEach((params, index)=>{
            let authorize = newValue[params]
            if(overlay ==  'leaderboard' || overlay == 'progression' || overlay=='commentator' || overlay=='sk' ){
                if(params != 'flag' && params != 'lane'){
                    authorize = true
                }
            }
            // if(overlay=='commentator' || overlay=='sk' ){
            //     authorize = true;
            // }
            switch(authorize){
                case true:
                    $('.'+params).fadeIn(1000)
                    break;
                case false :
                    $('.'+params).fadeOut(1000)
                    break;
            }
        })


        if(overlay == 'overlay_side' || overlay == 'overlay_top'){
            if(newValue.lowerthird){
                $(function(){
                    if($("#frame").find('#lower').length > 0){
                        $("#frame").find('#lower').show()
                        $("#lower").contents().find('body').css('background','transparent')
                    }else{                 
                        let $item = $('<iframe id="lower" src="../../lowerthird/graphics/lowerthirds.html" frameBorder="0"></iframe>')
                        $item.hide()
                        $("#frame").append($item)
                        $item.contents().find('body').css('background','transparent')
                        $item.show()
                    }
                });
            }else{
                $("#frame").find('#lower').hide()
            }
            if(newValue.attributionLane){
                $(function(){
                    if($("#frame").find('#attributionLane').length > 0){
                        $("#frame").find('#attributionLane').slideDown()
                    }else{                    
                        let $item = $('<iframe id="attributionLane" class="foreground" src="../../competition-corner/graphics/attribution-lane.html" frameBorder="0"></iframe>')
                        $item.hide()
                        $("#frame").append($item)
                        setTimeout(()=>{
                            $item.slideDown()
                        }, 1000)
                    }
                });
            }else{
                $("#frame").find('#attributionLane').slideUp()
            }
            if(newValue.heatResults){
                $(function(){
                    if($("#frame").find('#heatResults').length > 0){
                        $("#frame").find('#heatResults').slideDown()
                    }else{                    
                        let $item = $('<iframe id="heatResults" class="foreground" src="../../competition-corner/graphics/heat-result.html" frameBorder="0"></iframe>')
                        $item.hide()
                        $("#frame").append($item)
                        setTimeout(()=>{
                            $item.slideDown()
                        }, 1000)}
                });
            }else{
                $("#frame").find('#heatResults').slideUp()
            }
            if(newValue.overallStandingDivwod){
                $(function(){
                    if($("#frame").find('#osDivWod').length > 0){
                        $("#frame").find('#osDivWod').slideDown()
                    }else{                    
                        let $item = $('<iframe id="osDivWod" class="foreground" src="../../competition-corner/graphics/overall-division-workout.html" frameBorder="0"></iframe>')
                        $item.hide()
                        $("#frame").append($item)
                        setTimeout(()=>{
                            $item.slideDown()
                        }, 1000)}
                });
            }else{
                $("#frame").find('#osDivWod').slideUp()
            }
        }

    })

    Colors.on('change', (newValue, oldValue) => {

        let tabColor = newValue
        
        Object.keys(newValue).forEach((color, index) => {

            let _color = tabColor[color]

            if(overlay == 'commentator' && color == 'bg__color'){
                _color = 'black'
            }


            root.style.setProperty("--"+ color, _color );
            Clrs[color] = _color
        })
        
    })


    const videoInfos = nodecg.Replicant('videoInfos', 'leaderboard')
    const videoShow = nodecg.Replicant('videoShow', 'leaderboard')

    var videocontainer = document.getElementById('video');
    var videosource = document.getElementById('sourceVid');

    videoShow.on('change', (newValue)=>{
        switch(newValue){
            case true:

                videosource.setAttribute('src', videoInfos.value);
                videocontainer.load();
                videocontainer.play();
                
                $('#video').fadeIn(1000)
                break;
            case false:
                $('#video').fadeOut(1000)
                break;
        }
    })
