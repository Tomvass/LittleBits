//set up request to send.
//includes
var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var YQL = require('yql');

var deviceId = "00e04c037b69";
var accessToken = "db1a5b0a254dc532fd2d7265b8d758c8c4c03ed62220ab5d1daec47fdd9b9057";
var APIKey = "799b3417-0b03-498b-a119-e08cb463fcb3";
var riotUrl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/RiotSchmick?api_key=";

var TWOSDURATION = 2000;




 	function sendRequestToCloudBit(duration, percent) {
  	//all your request code in here
  	//1. set up request to send.
	var options = {
	  method: "POST",
	  url: 'https://api-http.littlebitscloud.cc/v2/devices/'+deviceId+'/output',
	  body: JSON.stringify({
		"percent": percent,
		"duration_ms": duration}),
	    headers: {
	      'Content-Type': 'application/json',
	      'Authorization': 'Bearer ' + accessToken
	    }
	  };

	    //2. what happens when it completes
	  function callback(error, response, body) {

	    if (!error && response.statusCode == 200) {
	      console.log(JSON.stringify(body));
	    } else {
	      console.log(JSON.stringify(error));
	    }

	  }
	      //3. send request.
 		 request(options, callback);
	}

	function httpGet(key){

	    var xmlHttp =  new XMLHttpRequest();
	    xmlHttp.open( "GET", key, false );
	    xmlHttp.send( null );
	    console.log(xmlHttp.responseText);
	    return xmlHttp.responseText;

	}


	function getDataFromYQL(city, country){
		var query = new YQL ('select item.forecast from weather.forecast '
							+'where woeid in '
							+'(select woeid from geo.places(1) where text="'
								+city +', ' +country +'"' +')'
							+'AND u=\'c\'');
		//2. Run it and set up what happens when it completes

	  query.exec(function (error, response) {

	      if(error){
	        console.log("error!");
	      } else {
	        var results = response.query.results.channel;
			//console.log(JSON.stringify(results));
			var today = results[0];
			var todayText = today.item.forecast.high;
			console.log(todayText);

			if(todayText < 5){
				sendRequestToCloudBit(TWOSDURATION,20);
			}else if (todayText < 10){
				sendRequestToCloudBit(TWOSDURATION, 40);
			}else if (todayText < 15){
				sendRequestToCloudBit(TWOSDURATION, 60);
			}else if (todayText < 20){
				sendRequestToCloudBit(TWOSDURATION, 80);
			}else{
				sendRequestToCloudBit(TWOSDURATION, 10);
				}
				
	      }

	  });
	}


httpGet(""+riotUrl +APIKey);
 

