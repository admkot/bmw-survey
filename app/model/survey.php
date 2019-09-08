<form class="form-signin  animate-box fadeIn animated">
  <div class="text-center mb-4 ">
    <img class="mb-4" src="/assets/images/bmwlogo.png" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal">BMW Survey</h1>
  </div>

	<div id="step-1" class="end-survey-remove animate-box fadeIn animated">
		<div id="question-1" class="form-group">
			<label for="q1">Age:</label>
			<input type="number" id="q1" class="form-control" min="0" max="100" step="1"  autofocus="" value="18" required>
		</div>
		<div id="question-2" class="form-group" >
			 <label for="q2">Gender</label>
			 <select id="q2" class="form-control" >
				 <option value="M">Male</option>
				 <option value="F">Female</option>
				 <option value="Other">Other</option>
			 </select>
	  </div>
	</div>
	<div id="step-2" class="end-survey-remove animate-box fadeIn animated d-none">
  		<div id="question-3" class="form-group" >
  		 	<label for="q3">Do you own a car driving license?</label>
  		 	<select class="form-control" id="q3">
  		 		<option value="yes">Yes</option>
  		 		<option value="no">No, I prefer using other transport </option>
  		 	</select>
	   </div>
	   <div id="question-4" class="form-group d-none " >
  		  <label for="q4">Is this your first car?</label>
  		  <select class="form-control" id="q4">
  			 	 <option value="yes">Yes</option>
  			 	 <option value="no">No</option>
  		  </select>
	   </div>
	</div>
	<div id="step-3" class="end-survey-remove animate-box fadeIn animated d-none">
		   <div id="question-5" class="form-group" >
  				<label for="q5">Which drivetrain do you prefer?</label>
  				<select class="form-control" id="q5">
  					<option>FWD</option>
  					<option>RWD</option>
  					<option>I don’t know</option>
  				</select>
  		 </div>
  		 <div id="question-6" class="form-group " >
  				<label for="q6"> Do you care about drifting? </label>
  				<select class="form-control" id="q6">
  					 <option value="yes">Yes</option>
  					 <option value="no">No</option>
  				</select>
  		 </div>
  		 <div id="question-7" class="form-group">
  			 <label for="q7">How many BMWs did you drive? </label>
  			 <input type="number" id="q7" class="form-control" min="0" max="100" step="1"  autofocus="" value="0" >
  		 </div>
  		 <div id="question-8" class="form-group animate-box fadeIn animated d-none">
  			 <label for="q7">Which BMW did you drive? </label>

  		 </div>
	</div>
  <div id="end-survey" class=" animate-box fadeIn animated d-none text-center">

  </div>


  <button class="btn btn-primary btn-block next-step end-survey-remove" >Next</button>
  <p class="mt-5 mb-3 text-muted text-center end-survey-remove">Step <span id="curentStep">1</span>/3</p>
</form>

<script src="/assets/js/jquery.min.js"></script>
<script src="/assets/js/bootstrap.min.js"></script>
<script src="/assets/js/bootstrap-input-spinner.js"></script>
<script src="/app/js/survey-functions.js"></script>
