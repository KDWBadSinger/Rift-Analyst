var API_key = "RGAPI-15c4d847-988e-4f6e-853e-272529f9add4";
var server_url= "";
const Regions = [
    'br1.api.riotgames.com',
    'eun1.api.riotgames.com',
    'euw1.api.riotgames.com',
    'jp1.api.riotgames.com',
    'kr.api.riotgames.com',
    'la1.api.riotgames.com',
    'la2.api.riotgames.com',
    'na1.api.riotgames.com',
    'oc1.api.riotgames.com',
    'tr1.api.riotgames.com',
    'ru.api.riotgames.com',
    'ph2.api.riotgames.com',
    'sg2.api.riotgames.com',
    'th2.api.riotgames.com',
    'tw2.api.riotgames.com',
    'vn2.api.riotgames.com'
];
const Spells = [' ','Cleanse',' ','Exhaust','Flash',' ','Ghost','Heal',' ',' ',' ','Smite','Teleport','','Ignite',' ',' ',' ',' ',' ',' ','Barrier']
var RegionName = "";

// 选服务器
function chooseRegion()
{
    RegionNumber = document.getElementById("choose_region").value;
    // document.getElementById("testregion").innerHTML = Regions[RegionNumber];
    server_url = Regions[RegionNumber];
}

// 通过玩家ID查询召唤师
function Search_summoner()
{
    // var: summoner_name存玩家ID
    var inputElement = document.getElementById("summoner_name");
    summoner_name = inputElement.value;
    
    console.log(summoner_name);
    chooseRegion();
    data();
}

async function data()
{
    var summonerNameUrl = "/lol/summoner/v4/summoners/by-name/" + summoner_name;
    var fullSummonerNameUrl = "https://"+server_url+summonerNameUrl+"?api_key="+API_key;
    console.log(fullSummonerNameUrl);

    const dataSummoner_1 = await fetch(fullSummonerNameUrl);
    const dataSummoner_full = await dataSummoner_1.json();
    console.log(dataSummoner_full);

    // ID
    summoner_name = dataSummoner_full.name;
    document.getElementById("summoner_name_data").innerHTML = "Summoner's ID:" + summoner_name;

    // 召唤师等级 var:summoner_Level存玩家等级
    var summoner_Level = dataSummoner_full.summonerLevel;
    console.log(summoner_Level);
    document.getElementById("summonerlevel_data").innerHTML = summoner_name + "'s level is "+summoner_Level;

    // 头像
    var profile_icon_number = dataSummoner_full.profileIconId;
    var profile_icon_url = "https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/"+profile_icon_number+".png";
    document.getElementById("summonerprofilepic_picture").src = profile_icon_url;

    // 排位
    var summoner_id = dataSummoner_full.id;
    var summoner_puuid = dataSummoner_full.puuid;
    var summonerNameUrl_2 = "/lol/league/v4/entries/by-summoner/"
    var ranked_summoner_url = "https://"+server_url+summonerNameUrl_2+summoner_id+"?api_key="+API_key;
    const rankedSummoner1 = await fetch(ranked_summoner_url);
    const rankedSummoner_Full = await rankedSummoner1.json();

    console.log(rankedSummoner_Full);
    const rankedSummoner_data = rankedSummoner_Full[0];
    console.log(rankedSummoner_data);
    var summoner_wins = rankedSummoner_data.wins;
    var summoner_losses = rankedSummoner_data.losses;
    console.log(summoner_wins);
    // W
    document.getElementById("ranked_win").innerHTML = "Win:"+summoner_wins;
    // L
    document.getElementById("ranked_lose").innerHTML = "Loss:"+summoner_losses;
    // 胜率
    var summoner_winratio = Math.round((summoner_wins / (summoner_losses + summoner_wins)) * 100) + "%";
    document.getElementById("ranked_winratio").innerHTML = "Win Ratio: " + summoner_winratio;
    // 段位
    var division = rankedSummoner_data.tier+" "+rankedSummoner_data.rank;
    var lp_ranked = rankedSummoner_data.leaguePoints;
    document.getElementById("ranked_division").innerHTML = division+" "+lp_ranked+" LP";
    
    // 调段位颜色
    var division_tier = rankedSummoner_data.tier;
    if(division_tier == "IRON"){
        document.getElementById("ranked_division").style.color = "gray";
    }
    if(division_tier == "Bronze"){
        document.getElementById("ranked_division").style.color = "brown";
    }
    if(division_tier == "SILVER"){
        document.getElementById("ranked_division").style.color = "lightgray";
    }
    if(division_tier == "GOLD"){
        document.getElementById("ranked_division").style.color = "yellow";
    }
    if(division_tier == "PLATINUM"){
        document.getElementById("ranked_division").style.color = "lightgreen";
    }
    if(division_tier == "DIAMOND"){
        document.getElementById("ranked_division").style.color = "blue";
    }
    if(division_tier == "MASTER"){
        document.getElementById("ranked_division").style.color = "purple";
    }
    if(division_tier == "GRANDMASTER"){
        document.getElementById("ranked_division").style.color = "lightred";
    }
    if(division_tier == "CHALLENGER"){
        document.getElementById("ranked_division").style.color = "red";
    }


    // 比赛记录、英雄熟练度
    // 须实现:
    // 所选英雄
    // K
    // D
    // A   
    // 补兵数

    let matchResultA = [];
    let matchTimeA = [];
    let matchChampionA = [];
    let matchSpell1A = [];
    let matchSpell2A = [];
    let matchMainRuneA = [];
    let matchSecondRuneA = [];
    let itemA = [];
    let blueTeamA = [];
    let redTeamA = [];
    let blueTeamChampsA = [];
    let redTeamChampsA = [];
    let matchStatsA = [];
    


    let matches_url = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/"+summoner_puuid+"/ids?api_key="+API_key;
    let matches_fetch = await fetch(matches_url);
    let matches_data = await matches_fetch.json();
    console.log(matches_data);

    let items_url = "https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/item.json"
    let items_fetch = await fetch(items_url);
    var items_data = await items_fetch.json();
    // console.log(items_data.data[1001]);

    let runes_url = "https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/runesReforged.json"
    let runes_fetch = await fetch(runes_url);
    var runes_data = await runes_fetch.json();
    console.log(runes_data)

    let champsStatistics = [];
    for(let l=0;l<20;l++)
    {
        let match_url = "https://europe.api.riotgames.com/lol/match/v5/matches/"+matches_data[l]+"?api_key="+API_key;
        let match_fetch = await fetch(match_url);
        let currentMatch_data = await match_fetch.json();
        let participants = currentMatch_data.metadata.participants;
        console.log(currentMatch_data)

        let matchTime = currentMatch_data.info.gameDuration;
        let matchMinutes = Math.floor(matchTime/60);
        let matchSecond = matchTime%60;

        let blueTeam = [];
        let blueTeamChamps = [];
        let redTeam = [];
        let redTeamChamps = [];

        // 0-4蓝色方队友信息
        // 5-9红色方队友信息
        for(let k=0;k<10;k++)
        {
            if(k<5)
            {
                blueTeam.push(currentMatch_data.info.participants[k].riotIdGameName)
                blueTeamChamps.push(currentMatch_data.info.participants[k].championName)
            }
            else
            {
                redTeam.push(currentMatch_data.info.participants[k].riotIdGameName)
                redTeamChamps.push(currentMatch_data.info.participants[k].championName)
            }
        }

        let counter = 0;
        let datasetChamp = [];

        
        for(let i=0;i<10;i++)
        {
            if(participants[i]==summoner_puuid)
            {
                break;
            }
            counter += 1;
        }
        console.log("counter:"+counter);
        console.log(currentMatch_data.info.participants[counter]);

        dataChamp = currentMatch_data.info.participants[counter];
        datasetChamp.push(dataChamp.championName);
        datasetChamp.push(dataChamp.kills);
        datasetChamp.push(dataChamp.deaths);
        datasetChamp.push(dataChamp.assists);
        datasetChamp.push(dataChamp.totalMinionsKilled + dataChamp.neutralMinionsKilled);
        datasetChamp.push(dataChamp.timePlayed);


        let matchStats = dataChamp.kills + "|" + dataChamp.deaths +"|"+ dataChamp.assists;
        let matchChampion = dataChamp.championName;
        let matchResult = dataChamp.win;
        if(matchResult==false){
            matchResult = "LOSE"
        }
        else
        {
            matchResult = "WIN"
        }
        let matchItems = []
        matchItems.push(dataChamp.item0)
        matchItems.push(dataChamp.item1)
        matchItems.push(dataChamp.item2)
        matchItems.push(dataChamp.item3)
        matchItems.push(dataChamp.item4)
        matchItems.push(dataChamp.item5)
        matchItems.push(dataChamp.item6)
        let matchSpell1 = dataChamp.summoner1Id;
        let matchSpell2 = dataChamp.summoner2Id;
        console.log(matchItems)
        var matchMainRune ='';
        var matchSecondRune = '';

        for(y=0;y<5;y++)
        {
            if (dataChamp.perks.styles[0].style==runes_data[y].id)
            {
                for(let i=0;i<4;i++)
                {
                    if(dataChamp.perks.styles[0].selections[0].perk == runes_data[y].slots[0].runes[i].id)
                    {
                        matchMainRune = runes_data[y].slots[0].runes[i].name
                        break;
                    }
                }
                // console.log(runes_data[y].slots[0].runes[0].name)
            }
        }
        for(y=0;y<5;y++)
        {
            if (dataChamp.perks.styles[1].style==runes_data[y].id)
            {
               var matchSecondRune = runes_data[y].name
            }
        }
        console.log(matchMainRune, matchSecondRune)

        
        matchResultA.push(matchResult)
        matchTimeA.push(matchMinutes + ":" + matchSecond)
        matchChampionA.push(matchChampion)
        matchSpell1A.push(matchSpell1)
        matchSpell2A.push(matchSpell2)
        matchMainRuneA.push(matchMainRune)
        matchSecondRuneA.push(matchSecondRune)
        itemA.push(matchItems)
        blueTeamA.push(blueTeam)
        redTeamA.push(redTeam)
        blueTeamChampsA.push(blueTeamChamps)
        redTeamChampsA.push(redTeamChamps)
        matchStatsA.push(matchStats)




        if(dataChamp.win == false)
        {
            datasetChamp.push(0);
            matchResult = "LOSE";
        }
        else
        {
            datasetChamp.push(1);
            matchResult = "WIN";
        }
        matchResultA.push(matchResult);
        datasetChamp.push(1);
        // datasetChamp.push(dataChamp.win);
        champsStatistics.push(datasetChamp);

        // console.log(datasetChamp);
        champsStatistics.push(datasetChamp);
    }
    console.log(champsStatistics);

    let champsStatisticsNR = [];
    let champStatsFinal = [];
    let counter2 = 0;
    for(let y=0;y<20;y++)
    {
        // champsStatisticsNR = [];
        // currentStats = champsStatistics[y];
        // champsStatisticsNR.push(currentStats[0]);
        // for(let z=0;z<20;z++)
        // {
        //     if(z==y)
        //     {
        //         continue;
        //     }
        //     if(currentStats[0] == champsStatistics[z][0])
        //     {
        //         // champStatsFinal.push(currentStats[0]);
        //         champsStatisticsNR[0] = currentStats[0];
        //         for(let p=1;p<7;p++)
        //         {
        //             champsStatisticsNR[p]=champsStatistics[z][p]+currentStats[p];
        //         }
        //     }
        //     // else
        //     // {
        //     //     champsStatisticsNR = currentStats;
        //     // }


            
        // }
        // champStatsFinal.push(champsStatisticsNR);

        counter2=0;
        for(let z=0;z<champStatsFinal.length;z++)
        {
            if(champsStatistics[y][0]==champStatsFinal[z][0])
            {
                counter2 += 1;
            }
        }
        if(counter2==0)
        {
            console.log("Y");
            champsStatisticsNR = [champsStatistics[y][0],0,0,0,0,0,0,0]
            champStatsFinal.push(champsStatisticsNR);
        }
    }

    for(let i=0;i<20;i++)
    {
        for(y=0;y<champStatsFinal.length;y++)
        {
            if(champsStatistics[i][0]==champStatsFinal[y][0])
            {
                for(let o=1;o<8;o++){
                    champStatsFinal[y][o] += champsStatistics[i][o];
                }
            }
        }
    }
    console.log(champStatsFinal);

    // 英雄数据
    let kdaChamp;
    let champStatsCode = "";
    let matchHistoryCode = "";
    let champMatchesPlayed;
    let champWinratio;
    let champAK;
    let champAD;
    let champAS;
    let champACS;
    let champMinutes;
    for(let m=0;m<champStatsFinal.length;m++)
    {
        // let currentChampDiv = document.createElement("div");
        // currentChampDiv.textContent = "\n"+champStatsFinal[m];
        // champStatsContainer.appendChild(currentChampDiv);

        champMatchesPlayed = champStatsFinal[m][7];
        champWinratio = (champStatsFinal[m][6]/champMatchesPlayed*100).toFixed(2);
        kdaChamp = (champStatsFinal[m][1]+champStatsFinal[m][3])/champStatsFinal[m][2];
        champAK = champStatsFinal[m][1]/champMatchesPlayed;
        champAD = champStatsFinal[m][2]/champMatchesPlayed;
        champAS = champStatsFinal[m][3]/champMatchesPlayed;
        champACS = champStatsFinal[m][4]/(champStatsFinal[m][5]/60);
        
        champStatsCode += "<div id='currentChamp'><img src='Champion ICON/"+champStatsFinal[m][0]+".jpg' width='200' height='200'></br>KDA: "+kdaChamp.toFixed(2)+"</br>"+champAK.toFixed(2)+" | "+champAD.toFixed(2)+" | "
                       +champAS.toFixed(2)+"</br>AVG CS: "+champACS.toFixed(2)+"</br>"+champWinratio+"%"+"</br>Matches played: "+champMatchesPlayed+"</div id='currentChamp'>";

        

        matchHistoryCode += "<div id='match'><div id='firstColumn'><div id ='result'>"+ matchResultA[m] +"</div><div id = 'championMatch'><img src='Champion ICON/"+ matchChampionA[m] +".jpg' width='80' height='80'></div><div id ='matchTime'>"
                         +matchTimeA[m]+"</div></div><div id ='matchSpell1'><img src='"+Spells[matchSpell1A[m]]+".png' width='60' height='60'></div><div id ='matchSpell2'><img src='"+Spells[matchSpell2A[m]]+".png' width='60' height='60'></div><div id ='matchRune1'><img src='"+matchMainRuneA[m]+".png' width='60' height='60'></div><div id ='matchRune2'><img src='"+matchSecondRuneA[m]
                         +".png' width='60' height='60'></div><div id ='items'>"

        for(let i =0;i<7;i++)
        {
            matchHistoryCode += "<img src='item/"+itemA[m][i]+".png' width='60' height='60'>"
        }

        matchHistoryCode += "</div><div id = 'matchStats'>"+matchStatsA[m]+"</div><div id='blueTeam'>"
        for(let i = 0;i<5;i++)
        {
            // matchHistoryCode += "<img src='Champion ICON/>"+blueTeamChampsA[m][i]+".jpg' width='30' height='30'>"+blueTeamA[m][i]+"</br>"
            matchHistoryCode += "<img src='"+blueTeamChampsA[m][i]+".jpg' width='30' height='30'>"+blueTeamA[m][i]+"</br>"
        }
        matchHistoryCode +="</div><div id ='redTeam'>"
        for(let i = 0;i<5;i++)
        {
            // matchHistoryCode += "<img src='Champion ICON/>"+redTeamChampsA[m][i]+".jpg' width='30' height='30'>"+redTeamA[m][i]+"</br>"
            matchHistoryCode += "<img src='"+redTeamChampsA[m][i]+".jpg' width='30' height='30'>"+redTeamA[m][i]+"</br>"
        }

        matchHistoryCode += "</div></div>"
        
    }
    document.getElementById("champStats").innerHTML = champStatsCode;
    document.getElementById("matchHistory").innerHTML = matchHistoryCode;
    
}