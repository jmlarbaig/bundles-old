
const athletes_init = {
    "lane": 0,
    "displayName": "",
    "rank": 0,
    "overallPoints": 0,
    "age": 0,
    "heigth": 0,
    "weight": 0,
    "affiliate": "",
    "division": "",
    "status": "",
    "CurrentRank": 0,
    "score_abs": 0,
    "score_rel": 0,
    "currentRound": 0,
    "tieBreak": "",
    "result": "",
    "currentMouvement": [
        {
            "mouvementName": "0",
            "nextMouvement": "",
            "repTarget": 0,
            "rep/min": 0,
            "power": 0,
            "cal_h": 0,
            "s/m": 0
        }
    ],
    "Log_mvt_time": [
        {
        }
    ],
    "Log_serie_time": [
        {
        }
    ],
    "Log_round_time": [
        {}
    ],
    "countryCode": "",
    "benchmark": [
        {
            "ForTime": {
                "fran": "",
                "helen": "",
                "grace": "",
                "filthy": "",
                "sprint400m": "",
                "run5k": "",
                "twoKRow": "",
                "fightgonebad": "",
                "cleanJerk": "",
                "deadlift": "",
                "crossfitTotal": 0,
                "snatch": "",
                "backSquat": ""
            }
        }
    ]
}


var athletesDivision = {}


var height_tot = 0


function resetLeaderboard(newData) {
    try {

        var data = { athletes: "" }
        data.athletes = newData
        // console.log("Static Data = ", staticData)
        // ! On prend le tableau

        if (overlay == 'overlay_top' || overlay == 'overlay_side') {
            setupLeaderboard.value.leaderboards != true ? $(".leaderboards").hide() : ""
        }


        var $tab = $(".leaderboards")
        $tab.find(".leaderboard").remove();

        //! on traite le wod en cours 

        athletesDivision = []

        // ! On récupère toutes les divisions présentes dans la heat en cours

        var divisionsNames = []
        var repTarget = [];


        for (let athletes of data.athletes) {
            if (!divisionsNames.includes(athletes.division)) {
                divisionsNames.push(athletes.division)
            }
        }

        //! on retient le rep targets

        for (let y = 0; y < divisionsNames.length; y++) {
            for (let wod of workouts) {
                if (divisionsNames[y] == wod.division) {
                    repTarget[y] = wod.total_reps
                    workouts[y] = wod;
                }
            }
        }

        //! Initialisation des athletes dans un seul format avec un triage par division

        athletesDivision = treatDivisions(divisionsNames, data.athletes)

        // ! On crée un tableau par division
        Object.values(athletesDivision).forEach((elementDiv, indexDivision) => {

            let $tabItem;
            switch (overlay) {
                case 'overlay_side':
                    $tabItem = headerSide(divisionsNames, indexDivision, repTarget)
                    break;
                case 'overlay_top':
                    $tabItem = headerTop(indexDivision)
                    break;
                case 'leaderboard':
                    $tabItem = headerTV(divisionsNames, indexDivision, repTarget)
                    break;
                case 'progression':
                    $tabItem = headerTV(divisionsNames, indexDivision, repTarget)
                    break;
                case 'commentator':
                    $tabItem = headerCommentator(divisionsNames, indexDivision, repTarget)
                    break;
                case 'sk':
                    $tabItem = headerScoringKairos(divisionsNames, indexDivision, repTarget)
                    break;
                case 'versus':
                    $tabItem = headerVersus(indexDivision)
                    break;
            }

            if (overlay == "versus") {
                indexDivision == 0 ? $tab.append($tabItem) : '';
            } else {
                $tab.append($tabItem);
            }


            if (overlay == 'commentator') {
                createStatsHeader(indexDivision);
            }

            let $list;
            if (overlay == "versus") {
                $list = $("#leaderboard" + indexDivision);
            } else {
                $list = $("#leaderboard" + indexDivision + " #athletes");
            }
            $list.find(".athlete").remove();

            let height_tot = 0;

            Object.values(elementDiv).forEach((elementAth, indexAthletes) => {

                let $item;
                switch (overlay) {
                    case 'overlay_side':
                        $item = overlaySide(elementAth)
                        break;
                    case 'overlay_top':
                        $item = overlayTop(elementAth)
                        break;
                    case 'leaderboard':
                        $item = leaderboardTV(elementAth)
                        break;
                    case 'progression':
                        $item = progressView(elementAth)
                        break;
                    case 'commentator':
                        $item = commentator(elementAth)
                        break;
                    case 'sk':
                        $item = scoringKairos(elementAth)
                        break;
                    case 'versus':
                        $item = leaderboardVersus(elementAth)
                }

                elementAth.$item = $item;
                elementAth.$item.hide()

                if (overlay == "versus") {
                    if (indexAthletes == 0 || indexAthletes == 1) {
                        elementAth.$item.show(500)
                        $list.append($item);
                    }
                } else {

                    elementAth.$item.show(500)
                    $list.append($item);

                    if (overlay == 'commentator') {
                        createStats(elementAth, indexDivision);
                    }
                }

                $('.leaderboards').find('.box_mvt').hide()

                setTimeout(() => {

                    // Dans tous les cas, on prend la valeur height pour redéféinir les dimensions du leaderboard
                    // if(overlay === 'overlay_side') {(height_tot +=  elementAth.$item.height())}
                    if (overlay === 'overlay_top') { height_tot = height_top } else { (height_tot += elementAth.$item.height() + 2) }

                    if (overlay != 'commentator' && overlay != 'sk') {
                        console.log('height tot ', height_tot)
                        $("#leaderboard" + indexDivision + " #athletes").height(height_tot)
                        $("#leaderboard" + indexDivision).height(height_tot + $("#leaderboard" + indexDivision + " .header").height())
                    }

                    statusHeat.status == '0' && athletesDivision[indexDivision].sort(ascendingLane);
                    if (overlay != "versus") {
                        reposition("#leaderboard" + indexDivision, athletesDivision[indexDivision]);
                    }

                }, 1000)

            })

            if (overlay == 'commentator') {
                setTimeout(() => {

                    $.fn.dataTable.ext.errMode = 'none';

                    $("#leaderboard" + indexDivision + " #table" + indexDivision).DataTable({
                        scrollY: "auto",
                        scrollX: true,
                        scrollCollapse: true,
                        paging: false,
                        fixedColumns: {
                            left: 3,
                            right: 2
                        }
                    });

                }, 100)
            }


        })
    }
    catch (e) {
        console.log(e)
    }
}


