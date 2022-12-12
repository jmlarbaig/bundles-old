
function createPresentator(data){

    if (data.checked){

        if($root.find('#presentator_'+data.id).length>0){
            $('#presentator_'+data.id).find('#name').text(data.name)
            $('#presentator_'+data.id).find('#function').text(data.function)
            changeClass('.headPresentator', data.position)
        }else{

            let $item = $(
                '<div id="presentator_'+ data.id +'" class="presentator">'+
                    '<div class="logo_event">'+
                    '</div>'+
                    '<div class="details">'+
                        '<div class="name_function">'+
                            '<div class="name">'+
                                '<span id="name">'+data.name+'</span>' +
                            '</div>' +
                            '<div class="function">'+
                                '<span id="function">'+data.function+'</span>' +
                            '</div>' +
                            '<div class="eventName">'+
                                '<span>'+infos.eventName+'</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="sponsor">'+
                    '</div>' +
                    '<div id="qrCode'+ data.id +'" class="qrCode">'+
                    '</div>'+
                '</div>'
            )
        
            $item.hide()
            $root.find('#headPresentator').append($item);
            
            $(".logo_event").css("background-image", "url(" + eventLogo + ")")
            
            if( data.sponsor != ''){
                $(".sponsor").css("background-image", "url(" + data.sponsor + ")")
            }else{
                $(".sponsor").remove()
            }

            if( data.qrcode != ''){
                generateQrCode(data.qrcode, $item.find("#qrCode"+data.id), 100, 100)
                // $("#qrCode"+data.id).css("background-image", "url(" + data.sponsor + ")")
            }else{
                $("#qrCode"+data.id).remove()
            }

            changeClass('.headPresentator', data.position)
        
            $item.slideDown(1000)
        }

    }else{
        $root.find('#presentator_'+data.id).slideUp(1000)

        setTimeout(()=>{
            $root.find('#presentator_'+data.id).remove()
        }, 1000)
    }


}

function createWaiting(data){

    if(data.checked){

        if($root.find('.waiting').length>0){
            $('.waiting').find('#nextEvent').text(data.nextEvent)
            $('.waiting').find('#localisation').text(data.localisation)
            $('.waiting').find('#qrcode').html(data.qrcode)
            changeClass('.waiting', data.position)
        }else{

            let $item = $(
                '<div class="waiting">'+
                    '<div class="logo_event">'+
                    '</div>'+
                    '<div class="detailsWaiting">'+
                        '<div class="nextEvent">'+
                            '<h4 id="nextEvent">'+data.nextEvent+'</h4>' +
                        '</div>' +
                        '<div class="localisation">'+
                            '<h5 id="localisation">'+data.localisation+'</h5>' +
                        '</div>' +
                        '<div class="eventName">'+
                            '<h6>'+infos.eventName+'</h6>' +
                        '</div>' +
                    '</div>' +
                    '<div class="sponsor">'+
                    '</div>'+
                    '<div id="qrCode" class="qrCode">'+
                    '</div>'+
                '</div>'
            )

            $item.hide()
            $root.append($item);
            
            $(".logo_event").css("background-image", "url(" + eventLogo + ")")
            
            if( data.sponsor != ''){
                console.log(data.sponsor)
                $(".sponsor").css("background-image", "url(" + data.sponsor + ")")
            }else{
                $(".sponsor").remove()
            }

            if( data.qrcode != ''){
                generateQrCode(data.qrcode, $item.find("#qrCode"), 100, 100)
                // $("#qrCode"+data.id).css("background-image", "url(" + data.sponsor + ")")
            }else{
                $("#qrCode").remove()
            }

            changeClass('.waiting', data.position)

            $item.fadeIn(1000)

        }
    }else{
        $root.find('.waiting').fadeOut(1000)

        setTimeout(()=>{
            $root.find('.waiting').remove()
        }, 1000)
    }
}


function createFree(data){

    console.log(data)

    if(data.checked){
        if($root.find('.free').length>0){
            $('.free').find('#header').text(data.header)
            $('.free').find('#subheader').text(data.subheader)
            $('.free').find('#text').html(data.text)
            changeClass('.free', data.position)

        }else{
            let $item = $(
                '<div class="free">'+
                    '<div class="first">'+
                        '<div class="logo_event">'+
                        '</div>'+
                        '<div class="headerSubheader">' +
                            '<div class="header">'+
                                '<h4 id="header">'+data.header+'</h4>' +
                            '</div>' +
                            '<div class="subheader">'+
                                '<h5 id="subheader">'+data.subheader+'</h5>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="second">'+
                        '<div id="text">'+data.text+'</div>' +
                    '</div>' +
                    '<div id="sponsorFree" class="sponsor">'+
                    '</div>'+
                '</div>'
            )

            $item.hide()
            $root.append($item);
            
            $(".logo_event").css("background-image", "url(" + eventLogo + ")")

            console.log(data.sponsor)
            if(data.sponsor == undefined){
                $('#sponsorFree').remove()
            }

            changeClass('.free', data.position)

            $item.slideDown(1000)
        }

    }else{
        $root.find('.free').slideUp(1000)

        setTimeout(()=>{
            $root.find('.free').remove()
        }, 1000)
    }

}

function createAthleteLowerthird(infos){

    const { lane, data, checked, subtype, position } = infos

    if (checked){

        if($root.find('#athlete_'+lane).length>0){
            // $('#athlete_'+data.id).find('#name').text(data.name)
            // $('#athlete_'+data.id).find('#function').text(data.function)
        }else{

            let $item = $(
                '<div id="athlete_'+ lane +'" class="athlete">'+
                    '<div class="logo_event">'+
                    '</div>'+
                    '<div class="detailsAth">'+
                        '<div class="firstAth">'+
                            '<span id="lane">#'+lane+' - </span>' +
                            '<span id="name">'+data.displayName+'</span>' +
                        '</div>' +
                        '<div class="subtype">'+
                        '</div>'+
                    '</div>' +
                '</div>'
            )
        
            $item.hide()
            $root.find('#headAthletes').append($item);
            
            $(".logo_event").css("background-image", "url(" + eventLogo + ")")
            console.log(data)
            switch(subtype){
                case 'affiliation':
                    createAffiliation(data, lane)
                    break;
                case 'athletes':
                    createAthletes(data, lane)
                    break;
                case 'benchmarks':
                    createBenchmarks(data, lane)
                    break;
                case 'wods':
                    createWods(data, lane)
                    break;
                case 'overall':
                    createOverall(data, lane)
                    break;
            }

            changeClass('#headAthletes', position)
        
            $item.slideDown(1000)
        }

    }else{
        $root.find('#athlete_'+lane).slideUp(1000)

        setTimeout(()=>{
            $root.find('#athlete_'+lane).remove()
        }, 1000)
    }

}

function createAffiliation(data, lane){
    const {affiliate} = data

    let aff = 'Independant'

    if(affiliate != '' && affiliate != null){
        aff = affiliate
    }

    let $subItem = $(
        '<div class="affiliation">FROM ' + aff + '</div>'
    )

    $root.find('#athlete_'+lane + ' .subtype').append($subItem)
}


function createAthletes(data, lane){
    const {ath} = data


    let $subAth = $root.find('#athlete_'+lane + ' .subtype');

    ath.forEach((athlete, index)=>{
        const {fullName, age, crossfitAffiliateName, avatarPath, instagram} = athlete

        let aff = 'Independant'

        if(crossfitAffiliateName != '' && crossfitAffiliateName != null){
            aff = crossfitAffiliateName
        }

        let $subItem = $(
            '<div class="ath">' + 
                '<div class="avatar" id="avatar'+ lane + '_'+index +'" ></div>' +
                '<h4 class="fullName" >' + fullName + '</h4>' +
                '<span class="affiliateAth"> / ' + aff + '</span>' +
            '</div>'
        )
            $subAth.append($subItem)
            // if(instagram != ''){
            //     generateQrCode('https://www.instagram.com/'+instagram, $subItem.find('#avatar'+ lane + '_'+index))
            if(avatarPath != '' && avatarPath != null){
                $("#avatar"+ lane + '_'+index).css("background-image", "url(" + (avatarPath) + ")")
            }else{
                $("#avatar"+ lane + '_'+index).css("background-image", "url(" + (eventLogo) + ")")
            }
    })
}

function createBenchmarks(data, lane){
    const {ath} = data

    let $subItem = $(
        '<div>' + ath + '</div>'
    )

    $root.find('#athlete_'+lane + ' .subtype').append($subItem)
}

function createWods(data, lane){
    const {workoutRank} = data

    let $subRoot = $('#athlete_'+lane + ' .subtype')

    workoutRank.forEach((element, index) =>{
        console.log(element)
        let $subItem = $(
            '<div class="wod">' + 
                '<span class="wodName">' + 
                    element.name + 
                '</span>' +
                '<div class="wodRank">' + 
                    element.rank + " RANK" +
                '</div>' +
            '</div>'
        )
        $subRoot.append($subItem);
    })

    $subRoot.addClass('wods');

}

function createOverall(data, lane){
    const {overallPoints, overallStanding, workoutRank} = data

    let numberEvents = workoutRank.length

    let $subItem = $(
        '<h4 class="overall"> RANKING ' + overallStanding + ' OVERALL AFTER ' + numberEvents + ' EVENTS</h4>'
    )

    $root.find('#athlete_'+lane + ' .subtype').append($subItem)
}
