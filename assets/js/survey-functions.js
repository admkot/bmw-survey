$( document ).ready(function() {

  // https://shaack.com/projekte/bootstrap-input-spinner/
  $("input[type='number']").inputSpinner();
  $("input[type='number']").on("change", function (event) {
    if($(this).val()==''){
      $(this).val( $(this).attr('min') );
    }
  });

  var curentStep = 1;

  $('.btn.next-step').click(function(event){
      event.preventDefault();

      if(curentStep==1){
        continueSurvey = verifyStep1();
      }else if(curentStep==2){
        continueSurvey = verifyStep2();
      }else{
        continueSurvey = verifyStep3();
      }

      if(continueSurvey==true){
        $('#step-'+curentStep).addClass("d-none");
         curentStep++;
        $('#step-'+curentStep).removeClass("d-none");
        $('#curentStep').text(curentStep);
      }
  });
//Dynamicly adding or removing model input in function generateQeustion8()
  $('#q7').on("change", function (event) {
    var amountOfInputs = $(this).val();
    generateQeustion8( amountOfInputs );

  });


});



function verifyStep1()
{

      var age = $('#q1').val();
      if(age<18){
        //END SURVEY and save survey answers
        alertMessage = 'Thank you for your interest in helping BMW.';
        var surveyAnswers = {
              Q1: $('#q1').val(),
    					Q2: $('#q2').val(),
          };
        saveSurvey(surveyAnswers, alertMessage);
        return false;

      }else if(age>=18 && age<=25){
        //Display question 4
        $('#question-4').removeClass("d-none");
        return true;

      }else{
        return true;
      }
}

function verifyStep2()
{
      var answer3 = $('#q3').val();
      if(answer3 =='no'){
        var surveyAnswers = {
              Q1: $('#q1').val(),
              Q2: $('#q2').val(),
              Q3: answer3,
          };
        var alertMessage = 'Thank you for your interest in helping BMW.';
        saveSurvey(surveyAnswers,alertMessage);
        return false;

      }else if( !$('#question-4').hasClass('d-none') ){
          var answer4 = $('#q4').val();
          if(answer4=='yes'){
            var surveyAnswers = {
                  Q1: $('#q1').val(),
                  Q2: $('#q2').val(),
                  Q3: answer3,
                  Q4: answer4,
              };
            var alertMessage = 'We are targeting more experienced clients, thank you for your interest.';
            saveSurvey(surveyAnswers,alertMessage);
            return false;
          }else{
            return true;
          }
      }else{
        return true;
      }
}


function generateQeustion8( expectingElements )
{
    //Display question 8 block
    if(expectingElements>0){
      $('#question-8').removeClass("d-none");
    }

    var newInputModel = '<input type="text" class="form-control mt-3 new-input animate-box fadeIn animated"  autofocus="" placeholder="Model name"  />';
    var currentInputs = $("#question-8").find( "input" );

    if(currentInputs.length<expectingElements){
      //We add new inputs
      while (currentInputs.length < expectingElements) {
        $('#question-8').append( newInputModel );
        expectingElements--;
      }

    }else{
      //We remove last inputs
      while (currentInputs.length > expectingElements) {
        $('#question-8').children('span:last-child').remove();
        $('#question-8').children('input:last-child').remove();
        expectingElements++;
      }

    }

//Patterns Verification
/*
//  I did pattern validation here to make better interface for user
//  He will see that model is incorrect(without submitting form) until he will not enter correct model
*/
    var pattern1 = /^M?[0-9]{3}[d|i]?$/i;
    var pattern2 = /^[X|Z]{1}[0-9]{1}$/i;
    $("#question-8").find( "input" ).on("change paste keyup", function(value) {
        $(this).removeClass('new-input');

        var model = $(this).val();
        if( pattern1.test(model) || pattern2.test(model) ) {
          //valid bmw model
            $(this).next('span').remove();

        }else{
          //invalid bmw model - Adding error message for user
          if($(this).next('span').length){
            $(this).next('span').text( 'Invalid BMW Model' );
          }else{
            $(this).after( '<span class="text-danger">Invalid BMW Model</span>' );
          }

        }
    });

}

function verifyStep3()
{
  //Checking if there is empty model inputs or invalid models
  var emptyModelInputs = $("#question-8").find( ".new-input" );
  var incorectModels = $("#question-8").find( "span.text-danger" );
  if(emptyModelInputs.length>0 || incorectModels.length>0){
    //Adding error message for user
      emptyModelInputs.each(function() {
        if($(this).next('span').length){
          $(this).next('span').text( 'Invalid BMW Model' );
        }else{
          $(this).after( '<span class="text-danger">Invalid BMW Model</span>' );
        }
      });

  }else{
    var answer4 = null;
    if( !$('#question-4').hasClass('d-none') ){
        var answer4 = $('#q4').val();
    }

    var answer8 = {};
    $("#question-8").find( "input" ).each(function(i, e) {
      answer8[i] =  $( this ).val();
    });

    var surveyAnswers = {
          Q1: $('#q1').val(),
          Q2: $('#q2').val(),
          Q3: $('#q3').val(),
          Q4: answer4,
          Q5: $('#q5').val(),
          Q6: $('#q6').val(),
          Q7: $('#q7').val(),
          Q8: answer8,
      };
    alertMessage = 'Thank you for your interest in helping BMW.';
    saveSurvey(surveyAnswers, alertMessage);

  }
}

function saveSurvey(surveyAnswers,alertMessage)
{
    //Adding 1 extra field with current time when this survey was submitted
    surveyAnswers['time']=new Date().getTime();

    //SAVE TO LOCAL STORAGE
    var surveyAnswersArr = [];
    if (localStorage.getItem("surveyAnswers") === null) {
      //the first submited survey
      surveyAnswersArr.push( surveyAnswers );
    }else{
      //Getting Old answers and adding new
      surveyAnswersArr = JSON.parse(localStorage.getItem('surveyAnswers'));
      surveyAnswersArr.push( surveyAnswers );
    }

    localStorage.setItem('surveyAnswers', JSON.stringify(surveyAnswersArr));

    //END OF SURVEY Part for user
    $('.end-survey-remove').remove();
    $('#end-survey').text(alertMessage);
    $('#end-survey').removeClass('d-none');



}
