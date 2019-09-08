<?php
$request = $_SERVER['REQUEST_URI'];

switch ($request)
{
	case '/' :

		require("app/components/header.html");
		require("app/model/survey.php");

	break;

	case '' :
		require("app/components/header.html");
		require("app/model/survey.php");
	break;

	case '/survey-review/' :
		require("app/components/header.html");
		include_once("app/model/surveyReview.php");
	break;

	default:
		//Usually we would put here 404 page But in this case we can show survey form to users
		require("app/components/header.html");
		require("app/model/survey.php");
	break;
}



?>
