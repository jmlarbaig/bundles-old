const Config = {
    "BgColor":"",
    "ChronoColor":"",
    "TxChronoColor":"",
    "WodColor":"",
    "TxWodColor":"",
    "MainColor":"",
    "SecondColor":"",
    "FinishRankColor":"",
    "FirstRankColor":"",
    "SecondRankColor":"",
    "ThirdRankColor":"",
    "TransparenceLogo":0,
    "Border":true,
    "TxMainColor":"",
    "TxSecondColor":"",
    "TxFinishRankColor":"",
    "TxFirstRankColor":"",
    "TxSecondRankColor":"",
    "TxThirdRankColor":"",

    "PositionXChrono":0,
    "PositionYChrono":0,
    "PositionXLogo":0,
    "PositionYLogo":0,
    "PositionXLeaderboard":0,
    "PositionYLeaderboard":0,
    "Font":'montserrat'
}


const Colors = nodecg.Replicant('Colors');

const TransparenceLogo = nodecg.Replicant('TransparenceLogo')
const Border = nodecg.Replicant('Border');

const logoEvent = nodecg.Replicant('assets:logoEvent');
const pubVideo = nodecg.Replicant('assets:pub');
const videoAth = nodecg.Replicant('assets:ath');

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}


function Actualiser(){
    
    Border.value = document.getElementById("border").checked;

    var bg_trans = document.getElementById("bg_trans").checked;

    if(bg_trans == true){
        Config.BgColor = "rgba(0,0,0,0)";
    }
    else{
        Config.BgColor = document.getElementById("bg__color").value;
    }

    Config.ChronoColor = document.getElementById("chrono_color").value;
    Config.TxChronoColor = document.getElementById("tx_chrono_color").value

    Config.WodColor = document.getElementById("wod_color").value;
    Config.TxWodColor = document.getElementById("tx_wod_color").value

    Config.MainColor = document.getElementById("main__color").value;
    Config.SecondColor = document.getElementById("second__color").value;

    Config.FinishRankColor = document.getElementById("finish__color").value;
    Config.FirstRankColor = document.getElementById("first_rank__color").value;
    Config.SecondRankColor = document.getElementById("second_rank__color").value;
    Config.ThirdRankColor = document.getElementById("third_rank__color").value;

    Config.TxMainColor = document.getElementById("tx_main__color").value;
    Config.TxSecondColor = document.getElementById("tx_second__color").value;
    Config.TxFinishRankColor = document.getElementById("tx_finish__color").value;
    Config.TxFirstRankColor = document.getElementById("tx_first_rank__color").value;
    Config.TxSecondRankColor = document.getElementById("tx_second_rank__color").value;
    Config.TxThirdRankColor = document.getElementById("tx_third_rank__color").value;

    Config.PositionXChrono = document.getElementById("positionX_chrono").value;
    Config.PositionYChrono = document.getElementById("positionY_chrono").value;


    Config.PositionXLogo = document.getElementById("positionX_logo").value;
    Config.PositionYLogo = document.getElementById("positionY_logo").value;

    Config.PositionXLeaderboard = document.getElementById("positionX_leaderboard").value;
    Config.PositionYLeaderboard = document.getElementById("positionY_leaderboard").value;

    Config.TransparenceLogo = document.getElementById("transparence_logo").value/ 100;
    Config.Border = document.getElementById("border").checked;

    Config.Font = document.getElementById("font-select").value;

    Colors.value = Config;

    nodecg.sendMessage('colorOverwrite', Config);
}

nodecg.readReplicant('Colors', (value) =>{

    if (value.BgColor == "rgba(0,0,0,0)"){
        document.getElementById('bg_trans').checked = true;
    }
    else{
        document.getElementById('bg_trans').checked = false;
    }
    document.getElementById('bg__color').value = value.BgColor

    document.getElementById("chrono_color").value = value.ChronoColor;
    document.getElementById("tx_chrono_color").value = value.TxChronoColor

    document.getElementById("wod_color").value = value.WodColor
    document.getElementById("tx_wod_color").value = value.TxWodColor

    document.getElementById('main__color').value = value.MainColor
    document.getElementById('second__color').value = value.SecondColor
    document.getElementById('finish__color').value = value.FinishRankColor
    document.getElementById('first_rank__color').value = value.FirstRankColor
    document.getElementById('second_rank__color').value = value.SecondRankColor
    document.getElementById('third_rank__color').value = value.ThirdRankColor

    document.getElementById("tx_main__color").value = value.TxMainColor;
    document.getElementById("tx_second__color").value = value.TxSecondColor;
    document.getElementById("tx_finish__color").value = value.TxFinishRankColor;
    document.getElementById("tx_first_rank__color").value = value.TxFirstRankColor;
    document.getElementById("tx_second_rank__color").value = value.TxSecondColor;
    document.getElementById("tx_third_rank__color").value = value.TxThirdRankColor;

    document.getElementById("positionX_chrono").value =  value.PositionXChrono;
    document.getElementById("positionY_chrono").value =  value.PositionYChrono;

    document.getElementById("positionX_logo").value =  value.PositionXLogo;
    document.getElementById("positionY_logo").value =  value.PositionYLogo;

    document.getElementById("positionX_leaderboard").value =  value.PositionXLeaderboard;
    document.getElementById("positionY_leaderboard").value =  value.PositionYLeaderboard;

    document.getElementById('transparence_logo').value = value.TransparenceLogo
    document.getElementById('border').value = value.Border
    document.getElementById("font-select").value = value.Font;
})

nodecg.readReplicant('Border', (value) =>{
    document.getElementById('border').value = value
})
