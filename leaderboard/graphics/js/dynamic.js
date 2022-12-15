var percent = 0;


function updateDynamics(newScoring, status){
    try{

        Object.values(athletesDivision).forEach((elemAth, key) => {

            height_tot = 0;
            
            if(newScoring[1].CurrentRank != null && newScoring[2].CurrentRank != null){
                Object.keys(elemAth).forEach(i => {

                    elemAth[i] = Object.assign( {}, elemAth[i],fetchNewData(newScoring, elemAth[i].lane));
                    elemAth[i].$item.find(".rank").text(elemAth[i].CurrentRank);
                    
                    if( status == "W" || status == "0"){

                        !elemAth[i].$item.find(".score").is(':visible') && elemAth[i].$item.find(".score").show();

                        if( elemAth[i].status == "W" || elemAth[i].status == "0" ){

                            if(workouts.length > 0 && auth[elemAth[i].division] && elemAth[i].result == ""){
                                    
                                Mvt_name[elemAth[i].lane] = heat.typeWod != "amrap" ? mvtIndexForTime(elemAth[i].score_abs, elemAth[i].division) : mvtIndexAmrap(elemAth[i].score_abs, elemAth[i].division, elemAth[i].log_round_time[0].length +1)

                                
                                if ( Mvt_name[elemAth[i].lane] != undefined && Mvt_name[elemAth[i].lane].mvtNames.includes("_")){
                                    Mvt_name[elemAth[i].lane].mvtNames = Mvt_name[elemAth[i].lane].mvtNames.replaceAll("_", " ")
                                }

                                if ( Mvt_name[elemAth[i].lane] != undefined && Mvt_name[elemAth[i].lane].mvtNames.includes("Sprint")){
                                    elemAth[i].$item.find(".popup").text( Mvt_name[elemAth[i].lane].mvtNames);
                                    elemAth[i].$item.find(".popup").show();
                                    elemAth[i].$item.find(".score").text(chrono);
                                }
                                else{
                                    if (i!=0){
                                        if (Mvt_name[elemAth[i].lane].id != Mvt_name[elemAth[i-1].lane].id ){
                                            if (heat.typeWod == 'amrap' && !Number.isNaN(Mvt_name[elemAth[i].lane].rounds)){
                                                elemAth[i].$item.find(".rounds").text("R"+(Mvt_name[elemAth[i].lane].rounds));
                                                elemAth[i].$item.find(".popup").text( "R"+(Mvt_name[elemAth[i].lane].rounds) + ' - ' + Mvt_name[elemAth[i].lane].mvtNames);
                                            }else{
                                                elemAth[i].$item.find(".popup").text(Mvt_name[elemAth[i].lane].mvtNames);
                                            }
                                            elemAth[i].$item.find(".score").text(Mvt_name[elemAth[i].lane].scoreAbsMvt + "/" + Mvt_name[elemAth[i].lane].repTarget);
                                            elemAth[i].$item.find(".popup").show();
                                        }
                                        else{
                                            elemAth[i].$item.find(".popup").hide();
                                            elemAth[i].$item.find(".score").text(Mvt_name[elemAth[i].lane].scoreAbsMvt + "/" + Mvt_name[elemAth[i].lane].repTarget);
                                        }
                                    }
                                    else {
                                        if(Mvt_name[elemAth[i].lane].mvtNames == "" || Mvt_name[elemAth[i].lane].mvtNames.includes("Workout")){
                                            elemAth[i].$item.find(".popup").hide();
                                        }
                                        else{
                                            if (heat.typeWod == 'amrap' && !Number.isNaN(Mvt_name[elemAth[i].lane].rounds)){
                                                elemAth[i].$item.find(".popup").text( "R"+(Mvt_name[elemAth[i].lane].rounds) + ' - ' + Mvt_name[elemAth[i].lane].mvtNames);
                                            }else{
                                                elemAth[i].$item.find(".popup").text(Mvt_name[elemAth[i].lane].mvtNames);
                                            }
                                            // console.log(Mvt_name)
                                            elemAth[i].$item.find(".score").text(Mvt_name[elemAth[i].lane].scoreAbsMvt + "/" + Mvt_name[elemAth[i].lane].repTarget);
                                            elemAth[i].$item.find(".popup").show();
                                            let mvts = Mvt_name[elemAth[i].lane].arrayMvt.toString().replaceAll(',', ' - ').replaceAll('_', ' ')
                                            $('#mvt').html(mvts)
                                            $('.mvt').html(mvts)
                                        }
                                    }
                                    if(heat.typeWod == 'amrap'){
                                        percent = (Mvt_name[elemAth[i].lane].scoreRelMvt / Mvt_name[elemAth[i].lane].totalReps)*95
                                    }else{
                                        percent = (elemAth[i].score_abs / Mvt_name[elemAth[i].lane].totalReps)*95
                                    }

                                    $('#circle'+elemAth[i].lane).css("transform","translateX("+ percent +"%)");
                                }

                                if(overlay == 'commentator' || overlay == 'progression' || overlay == 'leaderboard'){
                                    elemAth[i].$item.find(".popup").show();
                                }

                                setupLeaderboard.value.scoreConfig && elemAth[i].$item.find(".score").text(elemAth[i].score_abs) 
                                setupLeaderboard.value.scoreConfig && elemAth[i].$item.find(".popup").hide();
                            }
                            else{
                                elemAth[i].$item.find(".score").text(elemAth[i].score_abs)
                            }
                        } else if (elemAth[i].status == "F" ){
                            var result = elemAth[i].result;
                            elemAth[i].$item.find(".popup").show();
                            elemAth[i].$item.find(".score").text('FIN')
                            elemAth[i].$item.find(".popup").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                        }
                    } else if(status == "T"){
                        if (elemAth[i].status != "F"){
                            let _r = (elemAth[i].result || ('CAP ' +elemAth[i].score_abs)).toString()
                            elemAth[i].$item.find(".score").text('TC');
                            elemAth[i].$item.find(".popup").show();
                            elemAth[i].$item.find(".popup").text( _r);
                        }
                    }


                    if(elemAth[i].result == "" && status != "T"){
                        if (elemAth[i].CurrentRank == 1){
                            elemAth[i].$item.find(".rank").toggleClass('rank first_rank', true)
                            elemAth[i].$item.find(".rank").toggleClass('second_rank third_rank other_rank', false)
                            elemAth[i].$item.find(".score").toggleClass('score first_rank', true)
                            elemAth[i].$item.find(".score").toggleClass('second_rank third_rank other_rank', false)
                            elemAth[i].$item.find(".circle").toggleClass('circle first_rank', true)
                            elemAth[i].$item.find(".circle").toggleClass('second_rank third_rank other_rank', false)
                        }
                        else if (elemAth[i].CurrentRank == 2){
                            elemAth[i].$item.find(".rank").toggleClass('rank second_rank', true)
                            elemAth[i].$item.find(".rank").toggleClass('first_rank third_rank other_rank', false)
                            elemAth[i].$item.find(".score").toggleClass('score second_rank', true)
                            elemAth[i].$item.find(".score").toggleClass('first_rank third_rank other_rank', false)
                            elemAth[i].$item.find(".circle").toggleClass('circle second_rank', true)
                            elemAth[i].$item.find(".circle").toggleClass('first_rank third_rank other_rank', false)
                        }
                        else if (elemAth[i].CurrentRank == 3){
                            elemAth[i].$item.find(".rank").toggleClass('rank third_rank', true)
                            elemAth[i].$item.find(".rank").toggleClass('second_rank first_rank other_rank', false)
                            elemAth[i].$item.find(".score").toggleClass('score third_rank', true)
                            elemAth[i].$item.find(".score").toggleClass('second_rank first_rank other_rank', false)
                            elemAth[i].$item.find(".circle").toggleClass('circle third_rank', true)
                            elemAth[i].$item.find(".circle").toggleClass('second_rank first_rank other_rank', false)
                        }
                        else {
                            elemAth[i].$item.find(".rank").toggleClass('rank other_rank', true)
                            elemAth[i].$item.find(".rank").toggleClass('second_rank third_rank first_rank', false)
                            elemAth[i].$item.find(".score").toggleClass('score other_rank', true)
                            elemAth[i].$item.find(".score").toggleClass('second_rank third_rank first_rank', false)
                            elemAth[i].$item.find(".circle").toggleClass('circle other_rank', true)
                            elemAth[i].$item.find(".circle").toggleClass('second_rank third_rank first_rank', false)
                        }
                    }
                    else{

                        elemAth[i].$item.find(".rank").toggleClass('rank finish_rank',true)
                        elemAth[i].$item.find(".rank").toggleClass('second_rank third_rank first_rank other_rank', false)
                        elemAth[i].$item.find(".score").toggleClass('score finish_rank', true)
                        elemAth[i].$item.find(".score").toggleClass('second_rank third_rank first_rank other_rank', false)
                        elemAth[i].$item.find(".circle").toggleClass('circle finish_rank', true)
                        elemAth[i].$item.find(".circle").toggleClass('second_rank third_rank first_rank other_rank', false)

                        if(overlay == 'overlay_top'){
                            if(elemAth[i].CurrentRank > 2 ){
                                let _lane = elemAth[i].lane;
                                setTimeout(()=>{
                                    for(let ath of elemAth){
                                        if(ath.lane === _lane){
                                            ath.$item.fadeOut(1000);
                                            setTimeout(()=>{
                                                ath.$item.remove();
                                                reposition("#leaderboard"+ key, elemAth);
                                            }, 2000)
                                            break;
                                        }
                                    }

                                }, 5000)
                            }
                        }
                    }

                    if(overlay == 'commentator'){
                        console.log(elemAth[i].log_mvt[0])
                        Object.values(elemAth[i].log_mvt[0]).forEach((time, index)=>{
                            elemAth[i].$item.find(".mvt_id"+index).text(time)
                        })
                    }

                    // Dans tous les cas, on prend la valeur height pour redéféinir les dimensions du leaderboard
                    // if(overlay === 'overlay_side' || overlay === 'leaderboard') {}
                    if(overlay === 'overlay_top') {height_tot = height_top}else{(height_tot +=  elemAth[i].$item.height())}

                })

                elemAth.sort(ascendingRank);
                reposition("#leaderboard"+ key, elemAth);

                if(overlay !== 'commentator'){
                    $("#leaderboard"+ key + " #athletes").height(height_tot)
                    $("#leaderboard"+ key).height(height_tot + $("#leaderboard"+key + " .header").height() + 15)
                }
                // $("#leaderboard"+ key).height(height_tot + $("#leaderboard"+key + " .header").height()+15)
                // if ($("#leaderboard"+ key +" .athletes").find(".powered").length < 1){
                //     var $item = $( 
                //         '<div class="athlete powered" id="powered'+key+'">' + 
                //             '<div class="img"><img src="./img/PRESTA/SK-logo.png" alt="" height=15></img></div>' + 
                //             '<div class="text">POWERED BY</div>' + 
                //             '<div class="img"><img src="./img/PRESTA/FV-logo.png" alt="" height=15 ></img></div>' + 
                //         '</div>'
                //     );
                //     $("#leaderboard"+ key +" .athletes").append($item);
                // }
                // $("#powered"+key).css('top', $("#leaderboard"+ key).height() + 10 + 'px');

            }
            else{
                // elemAth.sort(ascendingLane);
                overlay !== 'commentator' && $("#leaderboard"+ key).height(height_tot + $("#leaderboard"+key + " .header").height())

                elemAth.sort(ascendingLane);
                reposition("#leaderboard"+ key, elemAth);

            }

        })
    }
    catch(e){
        console.log(e)
    }
}    