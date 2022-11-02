    // initialization
    var athlete;
    var athletes;
    var timerId;
    var timecapNTP = "";
    var startTimeNTP;
    var heatId ;
    var heat_Name;
    var heatName;
    var heatInfos = []
    var updateInterval = 30000;
    var resetVar = false;
    var athletes_final = new Array();
    var timerInterval= null;
    var dataTime;
    var totalRep = [];

    let root = document.documentElement;
    let logoEvent = document.getElementById("logoProgress");

    var pathLogo;
    var main_color;
    var second_color;

    var finish__color
    var first_rank__color
    var second_rank__color
    var third_rank__color

    const Colors = nodecg.Replicant('Colors', 'configuration');

    const statics = nodecg.Replicant('statics', 'connector');
    const dynamics = nodecg.Replicant('dynamics', 'connector');
    const LogoImg = nodecg.Replicant('LogoImg', 'leaderboard');
    const FVReplicant = nodecg.Replicant('FVspot', 'leaderboard');

    const BgColor = nodecg.Replicant('BgColor', 'leaderboard')
    const MainColor = nodecg.Replicant('MainColor', 'leaderboard')
    const SecondColor = nodecg.Replicant('SecondColor', 'leaderboard')

    const FinishRankColor = nodecg.Replicant('FinishRankColor', 'leaderboard')
    const FirstRankColor = nodecg.Replicant('FirstRankColor', 'leaderboard')
    const SecondRankColor = nodecg.Replicant('SecondRankColor', 'leaderboard')
    const ThirdRankColor = nodecg.Replicant('ThirdRankColor', 'leaderboard')

    const TransparenceLogo = nodecg.Replicant('TransparenceLogo', 'leaderboard')


    statics.on('change', (newValue, oldValue) => {
        console.log("Static")
        // console.log(`statics changed from ${oldValue} to ${newValue}`);

        timecapNTP = newValue.heatInfo[0].timeCap;
        heatId = newValue.heatId;
        heat_Name = newValue.heatName;

        resetHeat(newValue);
        // resetWod(newValue);
        showTime()
        resetProgress(newValue)
        showFV();
    }); 

    dynamics.on('change', (newValue, oldValue) => {
        // console.log(`dynamics changed from ${oldValue} to ${newValue}`);
        updateDynamics(newValue.athletes, newValue.status)
        dataTime = newValue;

    }); 

    FVReplicant.on('change', (newValue, oldValue) => {
        // console.log(`showLogo changed from ${oldValue} to ${newValue}`);
        showFV();
    }); 

    LogoImg.on('change', (newValue, oldValue) => {
        try{
            console.log("Logo url = ",newValue)

            var $imgLogo = $("#logoProgress");
            $imgLogo.find(".logo").remove();

            var $item = $(
                    '<img class="logo img-fluid" src="'+ newValue +'">' +
                    '</img>'
            );
            
            $imgLogo.append($item);
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