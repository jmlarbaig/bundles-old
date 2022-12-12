async function lowerThird(newData){

    console.log("newData from = ", newData)
    var data = newData
    var country
    var avatar
    var affichage_aff = true;
    var affiliate;

    affiliate = data.affiliate != undefined ? data.affiliate : '-'


    if (data.countryCode=="" || data.countryCode==null){country = "FR"}
    else{
        console.log(country)
        country = FLAG.find(element => element["3L"] == data.countryCode)
    }

    // if (data.avatarPath=="" || data.avatarPath==undefined){avatar = "https://competitioncorner.net/file.aspx/mainFilesystem?Avatars%2F80CAD1B0-409B-42C3-98A1-67BC86D3D51F.jpeg"}
    // else {avatar = data.avatarPath}

    console.log(country)
    console.log(data.affiliate)

    var $lower = $("#lowerThird")
    $lower.find(".lowerThirdChildren").remove()

    lowerThirdVoidShow.value != true ? $("#lowerThird").hide() : ""

        var $item = $(
            '<div class="container lowerThirdChildren" style=" font-family: montserrat;">'+
                '<div class="row lowerChild">'+
                    // '<div class="col-auto text-truncate text-center" style="width: 30px;padding: 0px 5px; overflow-y: visible;">'+
                    //     '<picture><img class="img-fluid" src="'+ avatar +'"></picture>'+
                    // '</div>'+
                    '<div class="col" style="">'+
                        '<div class="row justify-content-between">'+
                            '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><strong style="font-size: 24px;color:white;">L'+ data.lane+'</strong></div>'+
                            // '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><img class="d-lg-flex" src="https://flagcdn.com/'+ country["2L"].toLowerCase() + '.svg" style="width: 30px;margin: -3px 5px;"></div>'+
                            '<div class="col text-left d-xl-flex align-items-xl-center text-nowrap text-truncate text-break" style="padding: 0px 40px 0px 10px;">' +
                                '<h1 class="text-left d-xl-flex justify-content-xl-start" style="color: rgb(255,255,255);font-size: 24px;margin: 0px;">'+data.displayName+'</h1>' +
                           ' </div>' +
                            '<div class="col-auto" style="margin-right: 10px;">' +
                                '<div class="row">' +
                                    '<div class="col d-xl-flex justify-content-xl-end" style="padding: 0px 5px;margin-top: 5px;"><em style="color: rgb(255,255,255);font-size: 8px;">FROM</em></div>' +
                                '</div>' +
                                '<div class="row">' +
                                    '<div class="col text-nowrap text-truncate text-break text-right" style="padding: 0px;"><strong style="color: rgb(255,255,255);font-size: 12px;padding: 0px 5px;">'+ affiliate +'</strong></div>' +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>' +
                '</div>'+
                '<div class="overall col-auto text-center d-flex flex-column align-items" style="background-color: #ffffff;padding: 2px 2px;margin-left: 40px;margin-bottom: 5px;margin-right: 5px;"><em class="text-center" style="padding-right:5px;">'+data.overallStanding+'° OVERALL RANKING</em>'+
                // '<strong style="font-size: 35px;">'+ data.rank+'</strong>'+
                '</div>'+
            '</div>'
        )



    $lower.append($item)

}


async function lowerThirdWods(data){

    console.log("newData from = ", data.workoutRank)
    var country
    var avatar
    var affichage_aff = true;
    var affiliate;

    affiliate = data.affiliate != undefined ? data.affiliate : '-'


    if (data.countryCode=="" || data.countryCode==null){data.countryCode = "FRA"}
    else{
        console.log(country)
        country = FLAG.find(element => element["3L"] == data.countryCode)
    }

    // if (data.avatarPath=="" || data.avatarPath==undefined){avatar = "https://competitioncorner.net/file.aspx/mainFilesystem?Avatars%2F80CAD1B0-409B-42C3-98A1-67BC86D3D51F.jpeg"}
    // else {avatar = data.avatarPath}

    // console.log(data.countryCode)
    // console.log(data.affiliate)

    var $lower = $("#lowerThirdWod")
    $lower.find(".lowerThirdChildrenWod").remove()

    console.log("Lane wod ",laneWods.value)

    laneWods.value != true ? $("#lowerThirdWod").hide() : ""

        var $item = $(
            '<div class="lowerThirdChildrenWod">'+
                '<div class="row lowerChildWod">'+
                    '<div class="col-auto text-center d-flex flex-column align-items" style="background-color: #ffffff;padding: 2px 2px;margin-left: 5px;margin-bottom: 5px;margin-right: 5px;margin-top: 5px;"><em class="text-center" style="font-size: 20px; padding-right:5px;">'+data.overallStanding+'° </em>'+
                        // '<strong style="font-size: 35px;">'+ data.rank+'</strong>'+
                    '</div>'+
                    // '<div class="col-auto text-truncate text-center" style="width: 30px;padding: 0px 5px; overflow-y: visible;">'+
                    //     '<picture><img class="img-fluid" src="'+ avatar +'"></picture>'+
                    // '</div>'+
                    '<div class="col" style="">'+
                        '<div class="row justify-content-between">'+
                            '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><strong style="font-size: 24px;color:white;">L'+ data.lane+'</strong></div>'+
                            // '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><img class="d-lg-flex" src="https://flagcdn.com/'+ country["2L"].toLowerCase() + '.svg" style="width: 30px;margin: -3px 5px;"></div>'+
                            '<div class="col text-left d-xl-flex align-items-xl-center text-nowrap text-truncate text-break" style="padding: 0px 40px 0px 10px;">' +
                                '<h1 class="nameLower text-left d-xl-flex justify-content-xl-start" style="color: rgb(255,255,255);font-size: 24px;margin: 0px;">'+data.displayName+'</h1>' +
                           ' </div>' +
                            '<div class="col-auto" style="margin-right: 10px;">' +
                                '<div class="row">' +
                                    '<div class="col d-xl-flex justify-content-xl-end" style="padding: 0px 5px;margin-top: 5px;"><em style="color: rgb(255,255,255);font-size: 8px;">FROM</em></div>' +
                                '</div>' +
                                '<div class="row">' +
                                    '<div class="col text-nowrap text-truncate text-break text-right" style="padding: 0px;"><strong style="color: rgb(255,255,255);font-size: 12px;padding: 0px 5px;">'+ affiliate +'</strong></div>' +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>' +
                '</div>'+
                '<div class=" wods" id="wods">' +
                '</div>' +
            '</div>'
        )

        $lower.append($item)

        var $wod = $("#wods")
        $wod.find(".wodCol").remove()

        data.workoutRank.forEach((element, index)=> {
            console.log("salut ", element.name)

            var $itemWod = $(
                '<div class="col-2 wodCol">'+
                    '<div class="wodName text-truncate">' + element.name + '</div>' +
                    '<div class="wodRank">' + element.rank + '°</div>' +
                '</div>'
            )

            $wod.append($itemWod)
        })

}


async function lowerThirdAthletes(data){

    console.log("newData from = ", data)
    var country
    var avatar
    var affichage_aff = true;
    var affiliate;

    affiliate = data.affiliate != undefined ? data.affiliate : '-'
    var overallStanding = data.overallStanding != undefined ? data.overallStanding : '-'


    if (data.countryCode=="" || data.countryCode==null){data.countryCode = "FRA"}
    else{
        console.log(country)
        country = FLAG.find(element => element["3L"] == data.countryCode)
    }

    console.log("salut 2 ", data)
    // if (data.avatarPath=="" || data.avatarPath==undefined){avatar = "https://competitioncorner.net/file.aspx/mainFilesystem?Avatars%2F80CAD1B0-409B-42C3-98A1-67BC86D3D51F.jpeg"}
    // else {avatar = data.avatarPath}

    // console.log(data.countryCode)
    // console.log(data.affiliate)

    var $lower = $("#lowerThirdAth")
    $lower.find(".lowerThirdChildrenAth").remove()

    laneAth.value != true ? $("#lowerThirdAth").hide() : ""


        var $item = $(
            '<div class="lowerThirdChildrenAth">'+
                // '<div class="aths cards-list " id="aths">' +
                // '</div>' +
                '<div class="row lowerChildAth">'+
                    '<div class="col-auto text-center d-flex flex-column align-items" style="background-color: #ffffff;padding: 2px 2px;margin-left: 5px;margin-bottom: 5px;margin-right: 5px;margin-top: 5px;"><em class="text-center" style="font-size: 20px; padding-right:5px;">'+overallStanding+'° </em>'+
                        // '<strong style="font-size: 35px;">'+ data.rank+'</strong>'+
                    '</div>'+
                    // '<div class="col-auto text-truncate text-center" style="width: 30px;padding: 0px 5px; overflow-y: visible;">'+
                    //     '<picture><img class="img-fluid" src="'+ avatar +'"></picture>'+
                    // '</div>'+
                    '<div class="col" >'+
                        '<div class="row justify-content-between">'+
                            '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><strong style="font-size: 24px;color:white;">L'+ data.lane+'</strong></div>'+
                            // '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><img class="d-lg-flex" src="https://flagcdn.com/'+ country["2L"].toLowerCase() + '.svg" style="width: 30px;margin: -3px 5px;"></div>'+
                            '<div class="col text-left d-xl-flex align-items-xl-center text-nowrap text-truncate text-break" style="padding: 0px 40px 0px 10px;">' +
                                '<h1 class="nameLower text-left d-xl-flex justify-content-xl-start" style="color: rgb(255,255,255);font-size: 24px;margin: 0px;">'+data.displayName+'</h1>' +
                           ' </div>' +
                        '</div>'+
                    '</div>' +
                '</div>'+
                '<div class="row affiliation">' +
                    '<ul type="I" class="aths list-ath " id="aths">' +
                    '</ul>' +
                    '<div class="text-nowrap text-truncate text-break aff"><strong>'+ 'FROM ' +affiliate +'</strong></div>' +
                '</div>'+
            '</div>'
        )

        $lower.append($item)

        var $wod = $("#aths")
        $wod.find(".name").remove()

        data.ath.forEach((element, index)=> {
            console.log("salut ", element)
            // console.log("salut 2 = ", laneAthInfos.value.ath[index])

            if (data.ath_infos[index].benchmarks != undefined){
                var clean_jerk = data.ath_infos[index].benchmarks.cleanJerk != null ? data.ath_infos[index].benchmarks.cleanJerk : '-'
                var back_squat = data.ath_infos[index].benchmarks.backsquat != null ? data.ath_infos[index].benchmarks.backsquat : '-'
                var deadlift = data.ath_infos[index].benchmarks.deadlift != null ? data.ath_infos[index].benchmarks.deadlift : '-'
                var snatch = data.ath_infos[index].benchmarks.snatch != null ? data.ath_infos[index].benchmarks.snatch : '-'  
                var fran = data.ath_infos[index].benchmarks.fran != null ? data.ath_infos[index].benchmarks.fran : '-'
            }
            else{
                var clean_jerk = element.hasOwnProperty('Clean&Jerk') == true ? element['Clean&Jerk'] != null ? element['Clean&Jerk'] : '-' : '-'
                var back_squat = element.hasOwnProperty('Back Squat') == true ? element['Back Squat'] != null ? element['Back Squat'] : '-' : '-'
                var deadlift = element.hasOwnProperty('Deadlift') == true ? element['Deadlift'] != null ? element['Deadlift'] : '-' : '-'
                var snatch = element.hasOwnProperty('Snatch') == true ? element['Snatch'] != null ? element['Snatch'] : '-' : '-'    
                var snatch = element.hasOwnProperty('Fran') == true ? element['Fran'] != null ? element['Fran'] : '-' : '-'    
            }

            var avatar = data.ath_infos[index].avatarPath != undefined ? data.ath_infos[index].avatarPath : logoEvent
            
            var country_ath

            if (data.countryCode=="" || data.countryCode==null){data.countryCode = "FRA"}
            else{
                console.log(country)
                country_ath = FLAG.find(element => element["3L"] == data.countryCode)
            }

            console.log("Age ",element.age)

            // var age = element.age != undefined ? element.age : '-'
            // var height = element.height != undefined ? element.height : '-'
            var aff = element.hasOwnProperty('Affiliate') == true ? element['Affiliate'] != undefined ? element['Affiliate'] : '-' :'-'
            var capitaine = element['Captain'] == "TRUE" ? " - CAPTAIN" : ''

            var $itemWod = $(
                '<li class="text-truncate name">' + element['First Name'] + ' ' +  element['Last Name'] + capitaine + '</li>' 
            )

            $wod.append($itemWod)
        })

}



async function lowerThirdEvent(){

    console.log("LowerThird Data = ",lowerThirdData.value)
    console.log("sponsorLower Data = ",sponsorLower.value)
    var data = lowerThirdData.value

    console.log(data.url == '')
    // if (data.url == ''){
    //     data.url = logoEvent
    // }
    let img = data.url == '' ? logoEvent : data.url


    console.log(data)

    var $lower = $("#lowerThirdEvent")
    $lower.find(".lowerThirdChildrenVoid").remove()

    if (data.qrcode != ""){
        var $item = $(
            '<div class="lowerThirdChildrenVoid text-left">'+
                '<div class="row lowerChildVoid">'+
                    '<div class="col-2 img_event">'+
                    '</div>'+
                    '<div class="col text_lower">'+
                        '<div class="text_lower_1">'+
                            '<h4 class="text-left eventName">'+eventName+'</h4>' +
                            '<h6 class="text-left fonction">'+data.Name+'</h6>' +
                        '</div>' +
                        '<div class="text_lower_2">'+
                            '<h5 class="text-left names">'+data.Fonction+'</h5>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-2 img_sponsor">'+
                    '</div>'+
                    '<div class="col qrcodeC">'+
                            '<div id="qrcode"></div>' +
                    '</div>' +
                '</div>'+
            '</div>'
        )
    }
    else {
        var $item = $(
            '<div class="lowerThirdChildrenVoid text-left">'+
                '<div class="row lowerChildVoid">'+
                    '<div class="col-2 img_event">'+
                    '</div>'+
                    '<div class="col text_lower">'+
                        '<div class="text_lower_1">'+
                            '<h4 class="text-left fonction">'+eventName+'</h4>' +
                            '<h6 class="text-left eventName">'+data.Name+'</h6>' +
                        '</div>' +
                        '<div class="text_lower_2">'+
                            '<h5 class="text-left names">'+data.Fonction+'</h5>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-2 img_sponsor">'+
                    '</div>'+
                '</div>'+
            '</div>'
        )
    }
    // lowerThirdVoidShow.value == false ? $lower.find("#lowerThirdVoid").hide() : ''

    $lower.append($item)

    $(".img_event").css("background-image", "url(" + logoEvent + ")")
    $(".img_sponsor").css("background-image", "url(" + img + ")")

    if (data.qrcode != ""){
        var qrcode = new QRCode("qrcode", {
            text: data.qrcode,
            width: 100,
            height: 100,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }

}

async function lowerThirdYT(){

    // console.log("LowerThird Data = ",lowerThirdData.value)
    // console.log("sponsorLower Data = ",sponsorLower.value)
    var data = lowerThirdData.value


    // Name = Pseudo
    // Fonction = Commentaire


    var $lower = $("#lowerThirdYT")
    $lower.find(".lowerThirdChildrenYT").remove()

    lowerThirdYT.value != true ? $("#lowerThirdYT").hide() : ""


    var $item = $(
        '<div class="lowerThirdChildrenYT">'+
            '<div class="row lowerChildYT">'+
                '<div class="col-2 img_event">'+
                '</div>'+
                '<div class="col textYT">'+
                    '<div class="text_lower_1_YT">'+
                        '<h6 class="text-left eventNameYT">"'+data.Fonction+'"</h6>' +
                    '</div>' +
                    '<div class="text_lower_2_YT">'+
                        '<h6 class="text-right namesYT">/'+data.Name+'</h6>' +
                    '</div>' +
                '</div>' +
            '</div>'+
        '</div>'
    )
    // lowerThirdVoidShow.value == false ? $lower.find("#lowerThirdVoid").hide() : ''

    $lower.append($item)

}

async function lowerThirdPromo(){
    var data = lowerThirdCodePromo.value

    console.log("Data = ", data)

    var $lower = $("#lowerThirdCodePromo")
    $lower.find(".lowerThirdChildrenCodePromo").remove()

    // lowerThirdShowCode.value != true ? $("#lowerThirdCodePromo").hide() : ""


    var $item = $(
        '<div class="lowerThirdChildrenCodePromo">'+
            '<div class="col lowerChildcodePromo">'+
                '<div class="row qrCodeCodePromo">'+
                '</div>'+
                '<div class="row sponsorQrCode">'+
                '</div>'+
                '<div class="row textCodePromo">'+
                    '<h6 class="text-left codePromo">"'+data.discount+'"</h6>' +
                '</div>' +
            '</div>'+
        '</div>'
    )
    // lowerThirdVoidShow.value == false ? $lower.find("#lowerThirdVoid").hide() : ''

    $lower.append($item)

    $(".qrCodeCodePromo").css("background-image", "url(" + data.urlQrcode + ")")
    $(".sponsorQrCode").css("background-image", "url(" + data.urlSponsor + ")")

}

