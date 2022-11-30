var startTimeNTP;
var timerLaunch;
var typeWod_G = undefined

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
    let endTime = timeToDateTime(startTimeNTP).setMinutes(startTime.getMinutes() + parseInt(tc[1]));

    // var timespan = countdown(startTime, endTime);
    // console.log("Time = ",timeNTP.value)
    // console.log("nowNtp = ", nowNtp.value)

    let timeDiffStart = timeNTP.value - startTime;
    let timeDiffTimeCap = timeNTP.value - endTime;

    let timeDiffEnd = endTime - timeNTP.value;

    // console.log("startTime =", startTime)
    // console.log("timeDiffStart =", timeDiffStart)
    // console.log("timeDiffEnd =", timeDiffEnd)
    // console.log("timeDiffTimeCap =", timeDiffTimeCap)
    // console.log("endTime =", endTime)
    // console.log("chrono =", chrono)

    $("#chono").css("background-color", chrono_color)
    $("#chono").css("color", tx_chrono_color)
    if (timeDiffTimeCap < 0 && (timeDiffStart+1000) > 0 && dataTime.status != 0){
        if(typeWod_G == "amrap" || Ft_Ap.value == true){
            chrono = msToTime(timeDiffEnd - 1000)
        }
        else if (typeWod_G == "time" || Ft_Ap.value == false){
            chrono = msToTime(timeDiffStart + 1000);
        }
        else{
            chrono = msToTime(timeDiffStart + 1000);
        }
    } else if (timeDiffTimeCap < 0 && timeDiffStart < 0){
        chrono = msToTime(timeDiffStart).substring(4);
        $("#chono").css("background-color", "rgba(255,50,80,1)")
        $("#chono").css("color", "rgb(0,0,0")
    } else {
        if (timecapNTP != ''){
            chrono = timecapNTP
        }
        else{
            chrono = "00:00"
        }
    }

    document.getElementById("time").innerHTML = chrono;

}

function resetHeat(){

    // document.getElementById("heatName").innerHTML = data.heatName;
    // document.getElementById("timecap").innerHTML = "TIMECAP : " + timecapNTP + " '"

    try{

        data = staticData;
        var $list = $("#heat");
        $list.find(".heat_name").remove();

        typeWod_G = data.heatInfo[0].type;

        var $item = $(
            '<div class="heat_name">' +
                '<div class="col heatlow">' +
                    '<div id="workout" class="m-auto text-nowrap text-truncate" > ' + data.workoutName + ' </div>' +
                    '<div id="division" class="m-auto text-nowrap text-truncate"></div>' +    
                '</div>' +
                '<div class="mainSponsor col">' +
                '</div>'+
            '</div>'
        );

        setupLeaderboard.value.heat != true ? $(".heat").hide() : "";
        // heatDetails.$item = $item;
        $list.append($item);

        if (mainSponsors.value.length > 0){
            $(".mainSponsor").css("background-image", "url(" + mainSponsors.value[0].url + ")");
        }
        else{
            $(".mainSponsor").hide()
        }


    }
    catch(e){
        console.log(e)
    }
}

function showTime(){
    try{
        var $list = $("#chrono");
        $list.find(".box_time").remove();

        var $item = $(
            '<div class="box_time row">' +
                // '<img id="mainSponsor" class="mainSponsor img-fluid" src="./img/PRESTA/SK-logo.png"/>' +
                '<div id="time" class="col" class="text-center m-auto"></div>' +
                '<div id="timecap" class="col">'+ timecapNTP +"' CAP</div>" +
            '</div>'
        );

        setupLeaderboard.value.chrono != true ? $(".chrono").hide() : "";
        $list.append($item);
        if (timerLaunch == undefined){
            clearInterval(timerLaunch)
            timerLaunch = setInterval(updateTime, 100);
        }
        else {
            timerLaunch = setInterval(updateTime, 100);
        }

    }
    catch(e){
        console.log(e)
    }
}


function resetWod(){

    // document.getElementById("heatName").innerHTML = data.heatName;
    // document.getElementById("timecap").innerHTML = "TIMECAP : " + timecapNTP + " '"

    try{

        data = staticData;
        divisionsNames = [];
        workoutNames = [];

        for(let athletes of data.athletes){
            if( !divisionsNames.includes(athletes.division) ){
                divisionsNames.push(athletes.division)
            }
        }

        console.log(divisionsNames)

        for(let y=0; y<divisionsNames.length; y++){
            for (let wod of data.WorkoutInfo){
                if(divisionsNames[y] == wod.division){
                    console.log(wod)
                    workoutNames[y] = wod
                }
            }
        }


        var $list = $("#wod");
        $list.find(".wod_box").remove();

        showWodDetails.value != true ? $("#wod").hide() : ""

        for (let wod of workoutNames){
            var $item = $(
                '<div class="wod_box">' +
                    '<div class="col" style="">' +
                        '<div class="wodDiv">' + wod.division +' </div>' +    
                        '<div class="wodDescription"> ' + wod.description + ' </div>' +
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