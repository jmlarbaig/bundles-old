    // initialization
    var athlete;
    var athletes;
    var timerId;
    var timecapNTP = [];
    var startTimeNTP;
    var heatId ;
    var heat_Name;
    var heatName;
    var updateInterval = 30000;
    var resetVar = false;
    var athletes_final = new Array();
    var timerInterval= null;
    var dataTime;

    let root = document.documentElement;

    var bg_color;
    var wod_color;
    var tx_wod_color;
    var chrono_color;
    var tx_chrono_color

    var main_color;
    var second_color;
    var finish__color;
    var first_rank__color;
    var second_rank__color;
    var third_rank__color;

    var tx_main_color;
    var tx_second_color;
    var tx_finish__color;
    var tx_first_rank__color;
    var tx_second_rank__color;
    var tx_third_rank__color;


    var showDrapeau;
    var logoEvent;

    const statics = nodecg.Replicant('statics', 'connector');
    const dynamics = nodecg.Replicant('dynamics', 'connector');
    const showLeaderboard_lead = nodecg.Replicant('showLeaderboard_Lead')
    const showLogo = nodecg.Replicant('showLogo')
    const showFlag = nodecg.Replicant('showFlag')
    const showHeat = nodecg.Replicant('showHeat')
    const showWodDetails = nodecg.Replicant('showWodDetails')
    const LogoImg = nodecg.Replicant('LogoImg', 'connector')
    const FVReplicant = nodecg.Replicant('FVspot')
    const LogoFVFixe = nodecg.Replicant('LogoFVFixe')

    const sponsorWod = nodecg.Replicant('sponsorWod', 'connector')

    const laneInfos = nodecg.Replicant('laneInfos', 'cis')
    const laneAthInfos = nodecg.Replicant('laneAthInfos', 'cis');
    const laneShow = nodecg.Replicant('laneShow', 'cis')
    const laneWods = nodecg.Replicant('laneWods', 'cis')
    const laneAth = nodecg.Replicant('laneAth', 'cis')

    const showChrono = nodecg.Replicant('showChrono')
    const Colors = nodecg.Replicant('Colors', 'configuration');
    const Border = nodecg.Replicant('Border','configuration');

    const UrlChange = nodecg.Replicant('UrlChange', 'leaderboard');

    const lowerThirdData = nodecg.Replicant('lowerThirdData', 'lowerthird')
    const lowerThirdVoidShow = nodecg.Replicant('lowerThirdVoidShow', 'lowerthird')
    const lowerThirdEventShow = nodecg.Replicant('lowerThirdEventShow', 'lowerthird')
    const lowerThirdYTShow = nodecg.Replicant('lowerThirdYTShow', 'lowerthird')
    const lowerThirdCodePromo = nodecg.Replicant('lowerThirdCodePromo', 'lowerthird')
    const lowerThirdShowCode = nodecg.Replicant('lowerThirdShowCode', 'lowerthird')

    const timeNTP = nodecg.Replicant('timeNTP','connector')
    const nowNtp = nodecg.Replicant('nowNtp','connector')

    const sponsors = nodecg.Replicant('assets:sponsors', 'connector')
    const sponsorLower = nodecg.Replicant('assets:sponsorLower', 'versus') 

    const Ft_Ap = nodecg.Replicant('fortime_amrap')

    const HideLane = nodecg.Replicant('HideLane')
       
    sponsorLower.on('change', (newValue)=> {
        // A revoir
        $(".logoSponsor").attr('src', newValue[0].url)
    })

    const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')
    mainSponsors.on('change', (newValue)=> {
        if(newValue.length>0){

            $(".mainSponsor").css("background-image", "url(" + newValue[0].url + ")");
                $(".mainSponsor").fadeIn(1000)

            // else{
            //     $("#mainSponsor").fadeOut(1000)
            // }
        }
        else{
            $(".mainSponsor").fadeOut(1000)
            // $("#mainSponsor").attr('src', "./img/PRESTA/SK-logo.png");
            // $("#mainSponsor").fadeIn(1000)
        }
        
    })
    

    sponsors.on('change', (newValue)=> {
        
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
    var tc

    statics.on('change', (newValue, oldValue) => {
        // console.log(`statics changed from ${oldValue} to ${newValue}`);

        var timeCap
        tc = newValue.heatInfo[0].timeCap.split(':');

        if (tc[0] != "00"){
            timeCap = tc[0] + "'" + tc[1] + "'" + tc[2];
        }
        else if(tc[1] != "00" ){
            timeCap = tc[1] + "'" + tc[2];
        }
        else{
            timeCap = "0'"+ tc[2];
        }
        timecapNTP = timeCap

        heatId = newValue.heatId;
        heat_Name = newValue.heatName;
        staticData = newValue
        eventName = newValue.eventName

        resetHeat();
        resetWod();
        showTime();
        resetLeaderboard();
    }); 

    dynamics.on('change', (newValue, oldValue) => {
        // console.log(`dynamics changed from ${oldValue} to ${newValue}`);

        if(newValue.status != 0 ){
        // console.log("dynamics", newValue.status)
            updateDynamics(newValue.athletes, newValue.status)
        }
        dataTime = newValue
        // console.log(dataTime)

    }); 

    // HideLane.on('change', (newValue, oldValue)=>{
    //     switch(newValue.visible){
    //         case true:
    //             $("#tableur").find("#aht"+newValue.lane).fadeIn()
    //             break;

    //         case false:
    //             $("#tableur").find("#aht"+newValue.lane).fadeOut()
    //             break;
    //     }
    // })
    
    const TopScore = nodecg.Replicant('TopScore', 'connector')

    TopScore.on('change', (newValue, oldValue)=>{
        console.log("top Score = ",newValue)
        // console.log("top Score = ",newValue[0][0].scores[0].score)
        if (newValue != undefined){
            let index=0;
            if (!newValue[0].hasOwnProperty('error')){
                for (let teams of newValue[0]){
                        console.log("top index =", index)
                        $('.repTarget'+index).text("-> "+teams.scores[0].score)
                        index++
                }
            }
        }
    })

    showLeaderboard_lead.on('change', (newValue, oldValue) => {
        // console.log(`Showleaderbord changed from ${oldValue} to ${newValue}`);
        if (newValue != oldValue){
            switch(newValue){
                case true:
                    $('#tableur').show(1000)
                    break;
                case false :
                    $('#tableur').fadeOut(1000)
                    break;
            }
        }
    }); 

    showFlag.on('change', (newValue) => {
        console.log(newValue)
        switch(newValue){
            case true:
                $('.flag').fadeIn(1000)
                // resetLeaderboard()
                break;
            case false :
                $('.flag').fadeOut(1000)
                break;
        }
    })

    showLogo.on('change', (newValue, oldValue) => {
        // console.log(`showLogo changed from ${oldValue} to ${newValue}`);
        switch(newValue){
            case true:
                $('#logoLocation').show(1000)
                break;
            case false :
                $('#logoLocation').hide(1000)
                break;
        }
    }); 

    showChrono.on('change', (newValue, oldValue)=> {
        switch(newValue){
            case true:
                $('#chronoLocation').fadeIn(1000)
                break;
            case false :
                $('#chronoLocation').fadeOut(1000)
                break;
        }
    })

    FVReplicant.on('change', (newValue, oldValue) => {
        // console.log(`showLogo changed from ${oldValue} to ${newValue}`);
        if (newValue == true){
            $('#fvLocation').show(1000)
            // showFV();
        }
        else{
            $('#fvLocation').hide(1000); 
        }
    }); 

    LogoImg.on('change', (newValue, oldValue) => {
        try{

            logoEvent = newValue
            $("#logoLocation").css("background-image", "url(" + logoEvent + ")");
            // var $imgLogo = $("#logoLocation");
            // $imgLogo.find(".logo").remove();

            // var $item = $(
            //         '<img class="logo img-fluid" src="'+ newValue +'">' +
            //         '</img>'
            // );
            
            // $imgLogo.append($item);
        }
        catch(e){
            console.log(e)
        }
    }); 

    showHeat.on('change', (newValue, oldValue) => {
        console.log(`heatDetails changed from ${oldValue} to ${newValue}`);
        switch(newValue){
            case true:
                $('#heatDetails').fadeIn(1000)
                break;
            case false :
                $('#heatDetails').fadeOut(1000)
                break;
        }
    }); 

    showWodDetails.on('change', (newValue, oldValue) =>{
        switch(newValue){
            case true:
                $('#wodDetails').fadeIn(1000)
                break;
            case false :
                $('#wodDetails').fadeOut(1000)
                break;
        }
    })

    

    laneShow.on('change', (newValue, oldValue) => {
            console.log(newValue)
            switch(newValue){
                case true:
                    lowerThird(laneInfos.value).then(()=>{
                        $('#lowerThird').fadeIn(1000)
                    })
                    break;
                case false :
                    $('#lowerThird').fadeOut(1000)
                    break;
            }
    })

    laneWods.on('change', (newValue, oldValue)=> {
        console.log("lane info = ", newValue)
        switch(newValue){
            case true:
                lowerThirdWods(laneInfos.value).then(()=>{
                    $('#lowerThirdWod').fadeIn(1000)
                })
                break;
            case false :
                $('#lowerThirdWod').fadeOut(1000)
                break;
        }
    })

    laneAth.on('change', (newValue, oldValue)=> {
        console.log("lane info = ", newValue)
        switch(newValue){
            case true:
                lowerThirdAthletes(laneInfos.value).then(()=>{
                    $('#lowerThirdAth').fadeIn(1000)
                })
                break;
            case false :
                $('#lowerThirdAth').fadeOut(1000)
                break;
        }
    })


    lowerThirdVoidShow.on('change', (newValue, oldValue) => {
            switch(newValue){
                case true:
                    lowerThirdVoid().then(()=>{
                        $('#lowerThirdVoid').fadeIn(1000)
                    })
                    break;
                case false :
                    $('#lowerThirdVoid').fadeOut(1000)
                    break;
            }

    })

    lowerThirdEventShow.on('change', (newValue)=> {
        switch(newValue){
            case true:
                lowerThirdEvent().then(()=>{
                    $('#lowerThirdEvent').fadeIn(1000)
                })
                break;
            case false :
                $('#lowerThirdEvent').fadeOut(1000)
                break;
        }
    })

    lowerThirdYTShow.on('change', (newValue)=> {
        switch(newValue){
            case true:
                lowerThirdYT().then(()=>{
                    $('#lowerThirdYT').fadeIn(1000)
                })
                break;
            case false :
                $('#lowerThirdYT').fadeOut(1000)
                break;
        }
    })

    lowerThirdShowCode.on('change', (newValue)=>{
        console.log(newValue)
        switch(newValue){
            case true:
                lowerThirdPromo().then(()=>{
                    $('#lowerThirdCodePromo').fadeIn(1000)
                })
                break;
            case false :
                $('#lowerThirdCodePromo').fadeOut(1000)
                break;
        }
    })

    Colors.on('change', (newValue, oldValue) => {
        console.log("new value = ", newValue)

        bg_color = newValue.BgColor
        $("body").css('background-color', bg_color)

        chrono_color = newValue.ChronoColor
        root.style.setProperty("--chrono-color", chrono_color );

        tx_chrono_color = newValue.TxChronoColor
        root.style.setProperty("--tx-chrono-color", tx_chrono_color );

        wod_color = newValue.WodColor
        root.style.setProperty("--wod-color", wod_color );

        tx_wod_color = newValue.TxWodColor
        root.style.setProperty("--tx-wod-color",tx_wod_color );

        main_color = newValue.MainColor;
        root.style.setProperty("--main-color",main_color );

        second_color = newValue.SecondColor;
        root.style.setProperty("--second-color",second_color );

        finish__color = newValue.FinishRankColor;
        root.style.setProperty("--finish-color",finish__color );

        first_rank__color = newValue.FirstRankColor;
        root.style.setProperty("--firstRank-color",first_rank__color );

        second_rank__color = newValue.SecondRankColor;
        root.style.setProperty("--secondRank-color",second_rank__color );

        third_rank__color = newValue.ThirdRankColor;
        root.style.setProperty("--thirdRank-color",third_rank__color );

        tx_main_color = newValue.TxMainColor;
        root.style.setProperty("--tx-main-color",tx_main_color );

        tx_second_color = newValue.TxSecondColor;
        root.style.setProperty("--tx-second-color",tx_second_color );

        tx_finish__color = newValue.TxFinishRankColor;
        root.style.setProperty("--tx-finish-color",tx_finish__color );

        tx_first_rank__color = newValue.TxFirstRankColor;
        root.style.setProperty("--tx-firstRank-color",tx_first_rank__color );

        tx_second_rank__color = newValue.TxSecondRankColor;
        root.style.setProperty("--tx-secondRank-color",tx_second_rank__color );

        tx_third_rank__color = newValue.TxThirdRankColor;
        root.style.setProperty("--tx-thirdRank-color",tx_third_rank__color );

        console.log(newValue.PositionXChrono)

        position_X_chrono = newValue.PositionXChrono;
        root.style.setProperty("--X-position-chrono",position_X_chrono +"px" );

        position_Y_chrono = newValue.PositionYChrono;
        root.style.setProperty("--Y-position-chrono",position_Y_chrono+"px" );
        
    })

    Border.on('change', (newValue) => {
        switch(newValue){
            case true: 
            console.log("border")
                $('.score').css('border-radius', '0px 10px 10px 0px');
                $('#chronoLocation').css('border-radius', '10px');
                $('.heat').css('border-radius', '10px');
                break;
            case false:    
                console.log("pas border")
                $('.score').css('border-radius', '0px 0px 0px 0px');
                $('.heat').css('border-radius', '0px');
                $('#chronoLocation').css('border-radius', '0px');
                break;
        }
    })

const videoInfos = nodecg.Replicant('videoInfos', 'leaderboard')
const videoShow = nodecg.Replicant('videoShow', 'leaderboard')

// const UrlChange = nodecg.Replicant('UrlChange', 'leaderboard')

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
