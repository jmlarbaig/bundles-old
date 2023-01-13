var percent = 0;

let bestPerf = []
let best = []

function updateDynamics(newScoring, status){
    try{

        Object.values(athletesDivision).forEach((elemAth, key) => {

            height_tot = 0;
            let index = 0;
            
            if(newScoring[1].CurrentRank != null && newScoring[2].CurrentRank != null){
                Object.keys(elemAth).forEach(i => {

                    elemAth[i] = Object.assign( {}, elemAth[i],fetchNewData(newScoring, elemAth[i].lane));
                    elemAth[i].$item.find(".rank").text(elemAth[i].CurrentRank);
                    
                    if( status == "W" || status == "R"){

                        !elemAth[i].$item.find(".score").is(':visible') && elemAth[i].$item.find(".score").show();

                        if( elemAth[i].status == "W" ){

                            if(workouts.length > 0 && auth[elemAth[i].division] && elemAth[i].result == ""){
                                    
                                Mvt_name[elemAth[i].lane] = heat.typeWod != "amrap" ? mvtIndexForTime(elemAth[i].score_abs, elemAth[i].division) : mvtIndexAmrap(elemAth[i].score_abs, elemAth[i].division, elemAth[i].log_round_time[0].length +1)

                                if ( Mvt_name[elemAth[i].lane] != undefined && Mvt_name[elemAth[i].lane].mvtNames.includes("_")){
                                    Mvt_name[elemAth[i].lane].mvtNames = Mvt_name[elemAth[i].lane].mvtNames.replaceAll("_", " ")
                                }

                                if ( Mvt_name[elemAth[i].lane] != undefined && Mvt_name[elemAth[i].lane].mvtNames.includes("Sprint")){
                                    elemAth[i].$item.find(".popup").text("SPRINT");
                                    elemAth[i].$item.find(".popup").show();
                                    elemAth[i].$item.find(".score").text(chrono);
                                }
                                else{
                                    if(overlay == 'progression' || overlay == 'commentator' || overlay == 'leaderboard'){
                                        if (heat.typeWod == 'amrap' && !Number.isNaN(Mvt_name[elemAth[i].lane].rounds)){
                                            percent = (Mvt_name[elemAth[i].lane].scoreRelMvt / Mvt_name[elemAth[i].lane].totalReps)*95
                                            elemAth[i].$item.find(".rounds").text("R"+(Mvt_name[elemAth[i].lane].rounds));
                                            elemAth[i].$item.find(".popup").text( "R"+(Mvt_name[elemAth[i].lane].rounds) + ' - ' + Mvt_name[elemAth[i].lane].mvtNames);
                                        }else{
                                            percent = (elemAth[i].score_abs / Mvt_name[elemAth[i].lane].totalReps)*95
                                            elemAth[i].$item.find(".popup").text(Mvt_name[elemAth[i].lane].mvtNames);
                                        }
                                        elemAth[i].$item.find(".popup").show();
                                        $('#circle'+elemAth[i].lane).css("transform","translateX("+ percent +"%)");
                                    }else{
                                        if (i!=0){
                                            if (Mvt_name[elemAth[i].lane].id != Mvt_name[elemAth[i-1].lane].id ){
                                                if (heat.typeWod == 'amrap' && !Number.isNaN(Mvt_name[elemAth[i].lane].rounds)){
                                                    elemAth[i].$item.find(".rounds").text("R"+(Mvt_name[elemAth[i].lane].rounds));
                                                    elemAth[i].$item.find(".popup").text( "R"+(Mvt_name[elemAth[i].lane].rounds) + ' - ' + Mvt_name[elemAth[i].lane].mvtNames);
                                                }else{
                                                    elemAth[i].$item.find(".popup").text(Mvt_name[elemAth[i].lane].mvtNames);
                                                }
                                                elemAth[i].$item.find(".popup").show();
                                            }
                                            else{
                                                elemAth[i].$item.find(".popup").hide();
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
                                                elemAth[i].$item.find(".popup").show();
                                            }
                                        }
                                    }

                                    elemAth[i].$item.find(".score").text(Mvt_name[elemAth[i].lane].scoreAbsMvt + "/" + Mvt_name[elemAth[i].lane].repTarget);
                                }

                                let mvts = Mvt_name[elemAth[index].lane].arrayMvt.toString().replaceAll(',', ' - ').replaceAll('_', ' ')
                                $('#mvt').html(mvts)
                                $('.mvt').html(mvts)

                                if(overlay == 'commentator' || overlay == 'progression' || overlay == 'leaderboard'){
                                    elemAth[i].$item.find(".popup").show();
                                }else{
                                    // setupLeaderboard.value.scoreConfig && elemAth[i].$item.find(".popup").hide();
                                }

                                setupLeaderboard.value.scoreConfig && elemAth[i].$item.find(".score").text(elemAth[i].score_abs) 
                            }
                            else{
                                elemAth[i].$item.find(".score").text(elemAth[i].score_abs)
                            }
                        } else if (elemAth[i].status == "F" ){
                            index += 1;
                            let result = elemAth[i].result;
                            elemAth[i].$item.find(".popup").show();
                            elemAth[i].$item.find(".score").text('FIN')
                            elemAth[i].$item.find(".popup").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                            if(overlay== 'progression'){
                                $('#circle'+elemAth[i].lane).css("transform","translateX(95%)");
                            }
                        }
                    } else if(status == "T"){
                        let result = elemAth[i].result;
                        elemAth[i].$item.find(".popup").show();
                        elemAth[i].$item.find(".score").text('FIN')
                        if (elemAth[i].status == "F" ){
                            elemAth[i].$item.find(".popup").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                            if(overlay== 'progression'){
                                $('#circle'+elemAth[i].lane).css("transform","translateX(95%)");
                            }
                        }else if(elemAth[i].status == "T"){
                            elemAth[i].$item.find(".popup").text(result);
                        }else {
                            elemAth[i].$item.find(".popup").text('CAP '+ elemAth[i].score_abs);
                        }
                    }

                    if(elemAth[i].result == "" && status != "T"){
                        if(overlay != 'overlay_top'){
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
                        }else{
                            if (elemAth[i].CurrentRank == 1){
                                elemAth[i].$item.find(".rank").addClass('first_rank')
                                elemAth[i].$item.find(".rank").removeClass('initial_rank_top second_rank third_rank other_rank')
                                elemAth[i].$item.find(".name").addClass('first_rank')
                                elemAth[i].$item.find(".name").removeClass('initial_rank_top second_rank third_rank other_rank')
                                elemAth[i].$item.find(".popup").addClass('first_rank')
                                elemAth[i].$item.find(".popup").removeClass('initial_rank_top second_rank third_rank other_rank')
                                elemAth[i].$item.find(".score").addClass('first_rank')
                                elemAth[i].$item.find(".score").removeClass('initial_rank_top second_rank third_rank other_rank')
                                elemAth[i].$item.find(".circle").addClass('first_rank')
                                elemAth[i].$item.find(".circle").removeClass('initial_rank_top second_rank third_rank other_rank')
                            }
                            else {                           
                                elemAth[i].$item.find(".rank").addClass('initial_rank_top')
                                elemAth[i].$item.find(".rank").removeClass('first_rank second_rank third_rank other_rank')
                                elemAth[i].$item.find(".name").addClass('initial_rank_top')
                                elemAth[i].$item.find(".name").removeClass('first_rank second_rank third_rank other_rank')
                                elemAth[i].$item.find(".popup").addClass('initial_rank_top')
                                elemAth[i].$item.find(".popup").removeClass('first_rank second_rank third_rank other_rank')
                                elemAth[i].$item.find(".score").addClass('initial_rank_top')
                                elemAth[i].$item.find(".score").removeClass('first_rank second_rank third_rank other_rank')
                                elemAth[i].$item.find(".circle").addClass('initial_rank_top')
                                elemAth[i].$item.find(".circle").removeClass('first_rank second_rank third_rank other_rank')
                            }
                        }
                    }
                    else{
                        if(overlay == 'overlay_top'){
                            elemAth[i].$item.find(".rank").toggleClass('rank finish_rank',true)
                            elemAth[i].$item.find(".rank").toggleClass('initial_rank_top', false)
                            elemAth[i].$item.find(".score").toggleClass('score finish_rank', true)
                            elemAth[i].$item.find(".score").toggleClass('initial_rank_top', false)
                            elemAth[i].$item.find(".name").toggleClass('name finish_rank', true)
                            elemAth[i].$item.find(".name").toggleClass('initial_rank_top', false)
                            elemAth[i].$item.find(".popup").toggleClass('popup finish_rank', true)
                            elemAth[i].$item.find(".popup").toggleClass('initial_rank_top', false)
                        }else{
                            elemAth[i].$item.find(".rank").toggleClass('rank finish_rank',true)
                            elemAth[i].$item.find(".rank").toggleClass('second_rank third_rank first_rank other_rank', false)
                            elemAth[i].$item.find(".score").toggleClass('score finish_rank', true)
                            elemAth[i].$item.find(".score").toggleClass('second_rank third_rank first_rank other_rank', false)
                            elemAth[i].$item.find(".circle").toggleClass('circle finish_rank', true)
                            elemAth[i].$item.find(".circle").toggleClass('second_rank third_rank first_rank other_rank', false)
                        }
                    }

                    if(overlay == 'overlay_top'){
                        if(elemAth[i].result != "" && status != "T" && elemAth[i].status == 'F'){
                            if(elemAth[i].CurrentRank > 1 && elemAth[i].$item.is(':visible') ){
                                setTimeout(()=>{
                                    elemAth[i].$item.fadeOut(1000);
                                }, 5000)
                            }        
                        }else if(status == 'T' && elemAth[i].$item.is(':hidden')){
                            setTimeout(()=>{
                                elemAth[i].$item.fadeIn(1000)
                            },3000)
                        }

                        if(status == 'T'){
                            $('#mvt').text('FINISH')
                            $('.mvt').text('FINISH')
                        }
                    }

                    if(overlay == 'commentator'){
                        if(bestPerf[elemAth[i].lane] == undefined){
                            bestPerf[elemAth[i].lane] = []
                        }
                        Object.values(elemAth[i].log_mvt[0]).forEach((time, index)=>{

                            if( time != '00:00.0'){
                                if(elemAth[i].$item.find("#mvt_id_"+index+"_"+elemAth[i].lane).text() == '-'){

                                    let secondes = time.split(':').map(Number)
                                    let min = secondes[0]*60;
                                    let total = secondes[1] + min

                                    if(total > 3){
                                        elemAth[i].$item.find("#mvt_id_"+index+"_"+elemAth[i].lane).text(time)
                                        bestPerf[elemAth[i].lane][index] = total
            
                                        if(best[index] == undefined){
                                            best[index] = total
                                        }
            
                                        if(bestPerf[elemAth[i].lane][index] <= best[index]){
                                            best[index] = bestPerf[elemAth[i].lane][index]
                                            
                                            $('#leaderboard'+key).find('.mvt_id_'+index).removeClass('bestStat');
                                            elemAth[i].$item.find("#mvt_id_"+index+"_"+elemAth[i].lane).addClass('bestStat');
                                        }

                                    }
                                }
                            }
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
                    console.log(height_tot)
                    console.log($("#leaderboard"+key + " .header").height())
                    $("#leaderboard"+ key).height(height_tot + $("#leaderboard"+key + " .header").height() + 15)
                }
            }
            else{
                overlay !== 'commentator' && $("#leaderboard"+ key).height(height_tot + $("#leaderboard"+key + " .header").height())

                // elemAth.sort(ascendingLane);
                // reposition("#leaderboard"+ key, elemAth);

            }

        })
    }
    catch(e){
        console.log(e)
    }
}    
