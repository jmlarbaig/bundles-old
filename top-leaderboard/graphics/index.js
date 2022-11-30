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

    const Font = nodecg.Replicant('assets:font','configuration');
    const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')


    const setupLeaderboard = nodecg.Replicant('setupLeaderboard','leaderboard')
    const LogoImg = nodecg.Replicant('LogoImg', 'connector')

    const Colors = nodecg.Replicant('Colors', 'configuration');
    const Border = nodecg.Replicant('Border','configuration');

    /* Lowerthrid Replicants */
    const laneInfos = nodecg.Replicant('laneInfos', 'cis')
    const laneAthInfos = nodecg.Replicant('laneAthInfos', 'cis');
    const laneShow = nodecg.Replicant('laneShow', 'cis')
    const laneWods = nodecg.Replicant('laneWods', 'cis')
    const laneAth = nodecg.Replicant('laneAth', 'cis')

    const lowerThirdData = nodecg.Replicant('lowerThirdData', 'lowerthird')
    const lowerThirdVoidShow = nodecg.Replicant('lowerThirdVoidShow', 'lowerthird')
    const lowerThirdEventShow = nodecg.Replicant('lowerThirdEventShow', 'lowerthird')
    const lowerThirdYTShow = nodecg.Replicant('lowerThirdYTShow', 'lowerthird')
    const lowerThirdCodePromo = nodecg.Replicant('lowerThirdCodePromo', 'lowerthird')
    const lowerThirdShowCode = nodecg.Replicant('lowerThirdShowCode', 'lowerthird')

    const statics = nodecg.Replicant('statics', 'connector');
    const dynamics = nodecg.Replicant('dynamics', 'connector');

    const UrlChange = nodecg.Replicant('UrlChange', 'leaderboard');

    const timeNTP = nodecg.Replicant('timeNTP','connector')
    const nowNtp = nodecg.Replicant('nowNtp','connector')

    const sponsorWod = nodecg.Replicant('sponsorWod', 'connector')
    const sponsors = nodecg.Replicant('assets:sponsors', 'connector')
    const sponsorLower = nodecg.Replicant('assets:sponsorLower', 'versus') 

    const TopScore = nodecg.Replicant('TopScore', 'connector')
    
    const videoInfos = nodecg.Replicant('videoInfos', 'leaderboard')
    const videoShow = nodecg.Replicant('videoShow', 'leaderboard')





    sponsorLower.on('change', (newValue)=> {
        if(newValue.length > 0){
            $(".logoSponsor").attr('src', newValue[0].url)
        }
    })

    mainSponsors.on('change', (newValue)=> {
        if(newValue.length>0){

            $(".mainSponsor").css("background-image", "url(" + newValue[0].url + ")");
            $(".mainSponsor").fadeIn(1000)
        }
        else{
            $(".mainSponsor").fadeOut(1000)
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

    setupLeaderboard.on('change', (newValue, oldValue)=>{
        Object.keys(newValue).forEach((params, index)=>{
            console.log(params + ' ' + newValue[params])
            switch(newValue[params]){
                case true:
                    $('.'+params).fadeIn(1000)
                    break;
                case false :
                    $('.'+params).fadeOut(1000)
                    break;
            }
        })
    })

    TopScore.on('change', (newValue, oldValue)=>{
        // console.log("top Score = ",newValue[0][0].scores[0].score)
        if (newValue != undefined){
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


    LogoImg.on('change', (newValue, oldValue) => {
        try{
            logoEvent = newValue
            $(".logo").css("background-image", "url(" + logoEvent + ")");

            setupLeaderboard.value.logo != true ? $(".logo").hide() : ""
        }
        catch(e){
            console.log(e)
        }
    }); 

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

        position_X_chrono = newValue.PositionXChrono;
        root.style.setProperty("--X-position-chrono",position_X_chrono +"px" );

        position_Y_chrono = newValue.PositionYChrono;
        root.style.setProperty("--Y-position-chrono",position_Y_chrono+"px" );

        root.style.setProperty("--Y-position-heatDetails",(parseInt(position_Y_chrono) - 70) +"px" );

        position_X_logo = newValue.PositionXLogo;
        root.style.setProperty("--positionX_logo",position_X_logo +"px" );

        position_Y_logo = newValue.PositionYLogo;
        root.style.setProperty("--positionY_logo",position_Y_logo+"px" );

        position_X_leaderboard = newValue.PositionXLeaderboard;
        root.style.setProperty("--positionX_leaderboard",position_X_leaderboard +"px" );

        position_Y_leaderboard = newValue.PositionYLeaderboard;
        root.style.setProperty("--positionY_leaderboard",position_Y_leaderboard+"px" );

        font = newValue.Font;
        root.style.setProperty("--family_font",font );
        
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
