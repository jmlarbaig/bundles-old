var startTimeNTP;
var timerLaunch;

function timeToDateTime(time) {
    var times = time.split(':');
    if (times.length == 3){
        var hours = times[0];
        var minutes = times[1];
        var secmili = times[2].split('.');
        var seconds = secmili[0];
        var mili = secmili[1];

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();

        // Pas de milliseconds dans le constructeur Date
        return new Date(year, month, day, hours, minutes, seconds);
    }
}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (secs<10) { secs = '0' + secs}
    if (mins<10) { mins = '0' + mins}
    return mins + ':' + secs ;
}


function updateTime(){
    document.getElementById("division").innerHTML = heat_Name;

    startTimeNTP = dataTime.NtpTimeStart;

    // let now = new Date();
    let startTime = timeToDateTime(startTimeNTP);
    let endTime = timeToDateTime(startTimeNTP).setMinutes(startTime.getMinutes() + + parseInt(tc[1]));

    let timeDiffStart = timeNTP.value - startTime;
    let timeDiffTimeCap = timeNTP.value - endTime;

    let timeDiffEnd = endTime - timeNTP.value;

    // console.log("startTime =", startTime)
    // console.log("timeDiffStart =", timeDiffStart)
    // console.log("timeDiffEnd =", timeDiffEnd)
    // console.log("timeDiffTimeCap =", timeDiffTimeCap)
    // console.log("endTime =", endTime)
    // console.log("chrono =", chrono)

    $("#chrono").css("background-color", chrono_color)
    $("#chrono").css("color", tx_chrono_color)
    if (timeDiffTimeCap < 0 && (timeDiffStart+1000) > 0 && dataTime.status != 0){
        if(typeWod_G == "amrap" || Ft_Ap.value == true){
            chrono = msToTime(timeDiffEnd - 1000)
        }
        else{
            chrono = msToTime(timeDiffStart + 1000);
        }
    } else if (timeDiffTimeCap < 0 && timeDiffStart < 0){
        chrono = msToTime(timeDiffStart).substring(4);
        $("#chrono").css("background-color", "rgba(255,50,80,1)")
        $("#chrono").css("color", "white")
    } else {
        if (timecapNTP != ''){
            chrono = timecapNTP;
        }
        else{
            chrono = "00:00"
        }
    }

    document.getElementById("chrono").innerHTML = chrono;

}


function resetHeat(data){

    // document.getElementById("heatName").innerHTML = data.heatName;
    // document.getElementById("timecap").innerHTML = "TIMECAP : " + timecapNTP + " '"

    try{
        var $list = $("#headerSection #first");
        $list.find(".heat").remove();
    
        var $item = $(
            '<div class="heat row d-xl-flex align-items-xl-center">' +
                '<div class="col">' +
                    '<div class="row">' +
                        '<div class="col- text-center" style="padding-left: 10px;color: white;padding-bottom: 1px;padding-top: 1px;">' +
                            '<h3 class="m-auto">'+ data.workoutName + '</h3>' +
                            '<div class="row " style="padding-top:5px"> ' +
                            ' <div class="col text-center">' +
                                    '<h3 id="division" class="m-auto"></h3>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        // ' <div class="col sponsor" id="sponsor" style="color: rgb(255,255,255);padding-top: 5px;padding-bottom: 5px; text-align:center;">' +
                            
                        // ' </div>' +
                    ' </div>' +
                ' </div>' +
               ' <div class="col" style="color: rgb(255,255,255);padding-top: 5px;padding-bottom: 5px; text-align:center;font-size:50px;">' +
                    '<h3 class="text-center m-auto" id="chrono" style="text-align:center; "></h3>' +
                ' </div>' +
                '<div class="col-2 logoPresta" >' + 
                    '<img id="mainSponsor" class="logoSK img-fluid" src="./img/PRESTA/SK-logo.png"/>' +
                '</div>' +

                '<div class="col-2 logoPresta" >' + 
                    '<div class="text-center">' + '<h3 style="color:white;font-size:10px;"> DESIGN BY </h3><img class="logoFv img-fluid" src="./img/PRESTA/FV-logo.png"/> ' + '</div>' +
                '</div>' +
            '</div>' 
        );

        // heatDetails.$item = $item;
        $list.append($item);

    }
    catch(e){
        console.log(e)
    }
}


function resetWod(data){

    try{
        var $list = $("#mvtNames");
        $list.find(".wodrow").remove();

        var WodInfos = data.WorkoutInfo
        var mvtNames_final = []
        var mvtNames_final = []
        var divisionsNames = []

        let i = 0;
        for(let y=0; y < data.athletes.length - 1; y++){
            divisionsNames[i] = data.athletes[y].division
            console.log(data.athletes[y].division)
            if( data.athletes[y].division != data.athletes[y+1].division ){
                i++;
                divisionsNames[i] = data.athletes[y].division
            }
        }

        for(let y=0; y < divisionsNames.length; y++){
            for(let ii = 0; ii < WodInfos.length ; ii ++){
                var mvtNames = []
                if (WodInfos[ii].division == divisionsNames[y]){
                    for (let i = 0; i < WodInfos[ii].mvt_names.length; i++) {
                        if( WodInfos[ii].mvt_names[i].charAt(0) <='9' && WodInfos[ii].mvt_names[i].charAt(0) >='0') {
                            mvtNames[i] = WodInfos[ii].mvt_names[i]; 
                        }
                        else {
                            mvtNames[i] = WodInfos[ii].mvt_reps[i] + WodInfos[ii].mvt_names[i]; 
                        }
                        // console.log(mvtNames[i])
                        // console.log(mvtNames[i].includes("Sprint"))
                        if( mvtNames[i].includes("Sprint")){
                            mvtNames[i] = mvtNames[i].substring(1)
                        }
                    }
                    for (let i = 0; i < WodInfos[ii].mvt_names.length; i++) {
                        mvtNames = mvtNames.toString().toUpperCase().replace(',',' - ')
                    }
                    mvtNames_final[y]=mvtNames
                }
            }
        }

        for(i=0; i < divisionsNames.length ; i++){
            console.log(divisionsNames[i])
            var $item = $(
                    '<div class="wodrow row text-center">'+ 
                        '<div class="col-1">'+
                            divisionsNames[i] + 
                        '</div>' +
                        '<div class="col">'+
                            mvtNames_final[i] + 
                        '</div>' +
                    '</div>'
            );

            $list.append($item);
        }

    }
    catch(e){
        console.log(e)
    }
}

function showTime(){
    try{
        var $list = $("#chronoLocation");
        $list.find(".time").remove();

        var $item = $(
            '<div class="time">' +
                '<img class="logoSK img-fluid" src="./img/PRESTA/SK-logo.png"/>' +
                '<h3 id="chrono" class="text-center m-auto"></h3>' +
                '<h3 id="timecap" class="text-center m-auto"> TIMECAP : '+ timecapNTP +"'</h3>" +
            '</div>'
        );

        $list.append($item);
        if (timerLaunch == undefined){
            clearInterval(timerLaunch)
            timerLaunch = setInterval(updateTime, 200);
        }
        else {
            timerLaunch = setInterval(updateTime, 200);
        }

    }
    catch(e){
        console.log(e)
    }
}


function showFV(){
    $('#presta').show(1000)
    setTimeout(function(){ $('#presta').hide(1000); }, 10000);
}