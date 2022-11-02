    // initialization
    var athlete;
    var athletes;
    var timerId;
    var timecapNTP = "";
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
    var tx_chrono_color;

    var pathLogo;
    var main_color;
    var second_color;

    var finish__color
    var first_rank__color
    var second_rank__color
    var third_rank__color

    var tx_main_color
    var tx_second_color
    var tx_finish__color
    var tx_first_rank__color
    var tx_second_rank__color
    var tx_third_rank__color

    const Ft_Ap = nodecg.Replicant('fortime_amrap', 'leaderboard')
    const statics = nodecg.Replicant('statics', 'connector');
    const dynamics = nodecg.Replicant('dynamics', 'connector');
    const LogoImg = nodecg.Replicant('LogoImg', 'connector')
    const FVReplicant = nodecg.Replicant('FVspot', 'leaderboard')
    const sponsorWod = nodecg.Replicant('sponsorWod', 'connector')
    const showFlag = nodecg.Replicant('showFlag','leaderboard')
    const showAffiliate = nodecg.Replicant('showAffiliate', 'leaderboard')

    const Colors = nodecg.Replicant('Colors', 'configuration');

    const UrlChange = nodecg.Replicant('UrlChange', 'leaderboard')

    const BgColor = nodecg.Replicant('BgColor','configuration')
    const MainColor = nodecg.Replicant('MainColor','configuration')
    const SecondColor = nodecg.Replicant('SecondColor','configuration')

    const FinishRankColor = nodecg.Replicant('FinishRankColor','configuration')
    const FirstRankColor = nodecg.Replicant('FirstRankColor','configuration')
    const SecondRankColor = nodecg.Replicant('SecondRankColor','configuration')
    const ThirdRankColor = nodecg.Replicant('ThirdRankColor','configuration')

    const TransparenceLogo = nodecg.Replicant('TransparenceLogo', 'configuration')

    const timeNTP = nodecg.Replicant('timeNTP','connector')
    
    const mainSponsors = nodecg.Replicant('assets:mainSponsor', 'connector')
    
    mainSponsors.on('change', (newValue)=> {
        if(newValue.length>0){
            if($("#mainSponsor").attr('src') != newValue[0].url){
                $("#mainSponsor").attr('src', newValue[0].url);
                $("#mainSponsor").fadeIn(1000)
            }
            else{
                $("#mainSponsor").fadeOut(1000)
            }
        }
        else{
            $("#mainSponsor").fadeOut(1000)
            $("#mainSponsor").attr('src', "./img/PRESTA/SK-logo.png");
            $("#mainSponsor").fadeIn(1000)
        }
        
    })

    var largeur = window.innerWidth;
    console.log(largeur)
    root.style.setProperty("--width_screen", largeur+"px");
    // root.style.setProperty("--width_rank",largeur*0.05+"px");
    // root.style.setProperty("--width_lane",largeur*0.04+"px" );
    // root.style.setProperty("--width_flag",largeur*0.05+"px" );
    root.style.setProperty("--width_name",largeur*0.7+"px" );
    root.style.setProperty("--width_affiliate",largeur*0.15+"px" );
    // root.style.setProperty("--width_mvt",largeur*0.17+"px" );
    // root.style.setProperty("--width_score",largeur*0.17+"px" );    

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

        resetHeat(newValue);
        // resetWod(newValue);
        showTime()
        resetLeaderboard(newValue)
        // showFV();
    }); 

    dynamics.on('change', (newValue, oldValue) => {
        // console.log(`dynamics changed from ${oldValue} to ${newValue}`);
        if(newValue.status != 0 && newValue.athletes[0].CurrentRank !=null){
            updateDynamics(newValue.athletes, newValue.status)
        }
        dataTime = newValue

    }); 


    FVReplicant.on('change', (newValue, oldValue) => {
        // console.log(`showLogo changed from ${oldValue} to ${newValue}`);
        showFV();
    }); 

    LogoImg.on('change', (newValue, oldValue) => {
        try{
            console.log("Logo",newValue)
            var $imgLogo = $("#logoProgress");
            console.log($imgLogo)
            $(".logoEvent").attr("src", newValue);
            // $imgLogo.find(".logoEvent").remove();

            // var $item = $(
            //         '<img class="logoEvent img-fluid" src="'+ newValue +'">' +
            //         '</img>'
            // );
            
            // $imgLogo.append($item);
        }
        catch(e){
            console.log(e)
        }
    }); 

    const TopScore = nodecg.Replicant('TopScore', 'connector')

    TopScore.on('change', (newValue, oldValue)=>{
        console.log("top Score = ",newValue)
        // console.log("top Score = ",newValue[0][0].scores[0].score)
        if (newValue != undefined){
            let index=0;
            if (!newValue[0].hasOwnProperty('error')){
                for (let teams of newValue[0]){
                        console.log("top index =", index)
                        $('.teamTarget'+index).text( teams.scores[0].name )
                        $('.repTarget'+index).text( teams.scores[0].score)
                        index++
                }
            }
        }
    })

    sponsorWod.on('change', (newValue)=> {
        try{

            var $imgLogo = $("#sponsor");
            $imgLogo.find(".logoSponsor").remove();

            var $item = $(
                    '<img class="logoSponsor img-fluid" src="'+ newValue +'">' +
                    '</img>'
            );
            
            $imgLogo.append($item);
        }
        catch(e){
            console.log(e)
        }
    })

    showFlag.on('change',(newValue)=> {
        switch(newValue){
            case true:
                // showDrapeau = true
                $('.flag').fadeIn(1000)
                break;
            case false :
                // showDrapeau = false
                $('.flag').fadeOut(1000)
                break;
        }
    })

    showAffiliate.on('change', (newValue)=> {
        switch(newValue){
            case true:
                $('.affiliate').fadeIn(1000)
                root.style.setProperty("--width_name",largeur*0.3+"px" );
                root.style.setProperty("--width_affiliate",largeur*0.3+"px" );
                break;
            case false :
                // showDrapeau = false
                $('.affiliate').fadeOut(1000)
                root.style.setProperty("--width_name",largeur*0.6+"px" );
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
        
    })
    
    TransparenceLogo.on('change', (newValue) => {
        root.style.setProperty("--transparence",newValue );
    })