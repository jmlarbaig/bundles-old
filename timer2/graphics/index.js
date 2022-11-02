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

    var typeWod_G = undefined

    let root = document.documentElement;
    let logoEvent = document.getElementById("logoProgress");

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

    const Colors = nodecg.Replicant('Colors', 'configuration');
    const Ft_Ap = nodecg.Replicant('fortime_amrap', 'leaderboard')
    const statics = nodecg.Replicant('statics', 'connector');
    const dynamics = nodecg.Replicant('dynamics', 'connector');
    const LogoImg = nodecg.Replicant('LogoImg', 'connector')

    const UrlChange = nodecg.Replicant('UrlChange', 'leaderboard')
    const timeNTP = nodecg.Replicant('timeNTP','connector')


    statics.on('change', (newValue, oldValue) => {
        console.log("Static")
        // console.log(`statics changed from ${oldValue} to ${newValue}`);

        timecapNTP = newValue.heatInfo[0].timeCap;
        heatId = newValue.heatId;
        heat_Name = newValue.heatName;

        typeWod_G = newValue.heatInfo[0].type;

        resetHeat(newValue);
        showTime()
    }); 

    dynamics.on('change', (newValue, oldValue) => {
        // console.log(`dynamics changed from ${oldValue} to ${newValue}`);
        dataTime = newValue;

    }); 

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

    LogoImg.on('change', (newValue, oldValue) => {
        try{
            $("#logoEvent").attr("src", newValue);
        }
        catch(e){
            console.log(e)
        }
    }); 

    // UrlChange.on('change', (newValue, oldValue) => {
    //     console.log("Url = ",newValue)
    //     console.log("Url Old = ",oldValue)
    //     if( oldValue != undefined){
    //         if(newValue != oldValue){
    //             window.location.replace(newValue)
    //         }
    //     }
    // })