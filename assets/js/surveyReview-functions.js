$( document ).ready(function() {

  var surveyAnswers = JSON.parse(localStorage.getItem('surveyAnswers'));
  var countSurveys = surveyAnswers.length;

  var adolescents = 0;
  var unlicensed = 0;
  var firstTimers = 0;
  var targetables = 0;

  var driftingLover = 0;
  var countFWD = 0;
  var countOwnedBMW = 0;
  var carModels={};
  //Looping trough our answers to get amount of each respondent group
  $.each(surveyAnswers, function( key, survey ) {
    if(survey.Q1<18){
        adolescents++;
    }else if(survey.Q3=='no'){
        unlicensed++;
    }else if(survey.Q4=='yes'){
        firstTimers++;
    }else{
        targetables++;
        if(survey.Q5=='FWD' || survey.Q5=='I don’t know'){
          countFWD++;
        }
        if(survey.Q6=='yes'){
          driftingLover++;
        }
        countOwnedBMW = countOwnedBMW + parseInt(survey.Q7);

        $.each( survey.Q8, function( key, model ) {
            if(model in carModels){
              var amount = carModels[model];
              amount++;
              carModels[model]=amount;
            }else{
              carModels[model]=1;
            }
        });

    }
  });
  //Calculating percentage of each group
  var adolescentsPercentage = getPercentage(adolescents, countSurveys);
  var unlicensedPercentage = getPercentage(unlicensed, countSurveys);
  var firstTimersPercentage = getPercentage(firstTimers, countSurveys);
  var targetablesPercentage = getPercentage(targetables, countSurveys);

  var driftingPercentage = 0;
  var fwdPercentage = 0;
  var averageOwnedBMW =0;
  if(targetables>0){
    var driftingPercentage = getPercentage(driftingLover, targetables);
    var fwdPercentage = getPercentage(countFWD, targetables);
    var averageOwnedBMW = Math.round(countOwnedBMW / targetables * 10) / 10; //2.6
  }



  //Staf requirements Display
  var html = '<li>How many under 18s participated? - <b>'+adolescents+ ' ('+adolescentsPercentage+'%)'+'</b></li>';
  html = html + '<li>How many unlicensed drivers participated? - <b>'+unlicensed+ ' ('+unlicensedPercentage+'%)'+'</b></li>';
  html = html + '<li>How many 18-25s first car owners participated? - <b>'+firstTimers+ ' ('+firstTimersPercentage+'%)'+'</b></li>';
  html = html + '<li>How many targetable clients participated? - <b>'+targetables+ ' ('+targetablesPercentage+'%)'+'</b></li>';
  html = html + '<li>Percentage of targetables that care about drifting: <b>'+targetablesPercentage+'%'+'</b></li>';
  html = html + '<li>Percentage of targetables that picked FWD or “I don’t know” for drivetrain: <b>'+fwdPercentage+'%'+'</b></li>';
  html = html + '<li>The average amount of BMWs owned by targetables: <b>'+averageOwnedBMW+'</b></li>';
  html = html + '<li>The model distribution of all the BMW models entered: <b>'+JSON.stringify(carModels)+'</b></li>';

  $('#staff-requirements').html(html);



  //chart for group
  var labels = ["Adolescents", "Unlicensed", "First-timers", "Targetables"];
  var data = [adolescents, unlicensed, firstTimers, targetables];
  var colors = ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"];
  createChart('groupChart', 'Amount of Participants by groups', 'bar', labels, data, colors);

  //chart for group %
  var labels = ["Adolescents", "Unlicensed", "First-timers", "Targetables"];
  var data = [adolescentsPercentage, unlicensedPercentage, firstTimersPercentage, targetablesPercentage];
  var colors = ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"];
  createChart('groupPercentageChart', ' A breakdown of each respondent group by percentage ', 'bar', labels, data, colors);


  //chart for targetGroup %
  var labels = ["Care about drifting", "Picked FWD or “I don’t know” for drivetrain"];
  var data = [driftingPercentage, fwdPercentage ];
  var colors = ["#ff6384", "#36a2eb"];
  createChart('targetGroup', 'Percentage of targetables ', 'bar', labels, data, colors);

  //chart for models
  createChartModels(carModels);





});


function getPercentage(num, per)
{
  var percents = (num/per)*100;
  percents = Math.round(percents * 100) / 100;
  return percents;
}


function createChart(divID, title, type, labels, data, colors)
{

  var ctx = document.getElementById(divID).getContext('2d');
  var myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: colors,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function createChartModels(models)
{

  var labels = [];
  var data = [];
  $.each(models, function (key, value) {
      labels.push(key);
      data.push(value);
  });
  var colors = [];


  var ctx = document.getElementById('models').getContext('2d');
  var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'The model distribution of all the BMW models entered',
                data: data,
                backgroundColor: colors,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
