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

    Ft_Ap = setupLeaderboard.value.fortimeAmrap;
    startTimeNTP = dataTime.NtpTimeStart;

    // let now = new Date();
    let startTime = timeToDateTime(startTimeNTP);
    let endTime = timeToDateTime(startTimeNTP).setMinutes(startTime.getMinutes() + parseInt(tc[1]));

    let timeDiffStart = timeNTP.value - startTime;
    let timeDiffTimeCap = timeNTP.value - endTime;

    let timeDiffEnd = endTime - timeNTP.value;

    $("#time").css("background-color", chrono_color)
    $("#time").css("color", tx_chrono_color)

    console.log('timeDiffTimeCap ', timeDiffTimeCap)
    console.log('timeDiffEnd ', timeDiffEnd)

    if (timeDiffTimeCap < 0 && (timeDiffStart+1000) > 0 ){
        $('#cap').fadeIn(1000)
        if(typeWod_G == "amrap" || Ft_Ap == true){
            chrono = msToTime(timeDiffEnd - 1000)
        }
        else {
            chrono = msToTime(timeDiffStart + 1000);
        }
    } else if (timeDiffStart < 0  && timeDiffStart > -5000 ){
        $('#cap').fadeOut(1000)
        $("#time").css("background-color", "rgba(255,50,80,1)")
        $("#time").css("color", "rgb(255,255,255")
        chrono = msToTime(timeDiffStart).substring(4);
    } else {
        $('#cap').fadeOut(1000)
        if (timecapNTP != ''){
            chrono = timecapNTP
        }
        else{
            chrono = "00:00"
        }
    }
    if (timeDiffTimeCap > -30000 && timeDiffTimeCap < 0 ){
        $("#time").css("background-color", "rgba(255,50,80,1)")
        $("#time").css("color", "rgb(255,255,255")
        if(typeWod_G == "amrap" || Ft_Ap == true){
            chrono = msToTime(timeDiffEnd - 1000)
        }
        else {
            chrono = msToTime(timeDiffStart + 1000);
        }
    }
    document.getElementById("time").innerHTML = chrono;

}

function resetHeat(){

    // document.getElementById("heatName").innerHTML = data.heatName;
    // document.getElementById("timecap").innerHTML = "TIMECAP : " + timecapNTP + " '"

    try{

        data = staticData;
        var $list = $(".heat");
        $list.find(".heat_content").remove();

        typeWod_G = data.heatInfo[0].type;

        var $item = $(
            '<div class="heat_content">' +
                '<div class="details">' +
                    '<div id="workout" class="detail" > ' + data.workoutName + ' - </div>' +
                    '<div id="division" class="detail"> ' + data.heatName + ' </div>' +    
                    '// ' +'<div id="mvt" class="text-nowrap text-truncate"></div>' + 
                '</div>' +
                '<div class="box_mainSponsor">' +
                    '<div class="presented">PRESENTED BY</div>'+
                    '<div class="mainSponsor">' +
                    '</div>'+
                '</div>'+
            '</div>'
        );

        setupLeaderboard.value.heat != true ? $(".heat").hide() : "";

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
        var $list = $(".chrono");
        $list.find("#time").remove();
        $list.find("#cap").remove();

        var $item = $(
            '<div id="time"> </div>' +
            '<div id="cap">CAP '+timecapNTP+'</div>' 
        );


        setupLeaderboard.value.chrono != true ? $(".chrono").hide() : "";
        $list.append($item);
        $(".chrono").find('#cap').hide();
        if (timerLaunch == undefined){
            clearInterval(timerLaunch)
            timerLaunch = setInterval(updateTime, 1000);
        }
        else {
            timerLaunch = setInterval(updateTime, 1000);
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

        setupLeaderboard.value.wod != true ? $("#wod").hide() : ""

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