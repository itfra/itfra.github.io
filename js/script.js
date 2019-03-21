$(function(){
	"use strict";

	var sect = $( window.location.hash ),
		portfolio = $('.portfolio-items');

	if(sect.length == 1){
		$('.section.active').removeClass('active');
		sect.addClass('active');
		if( sect.hasClass('border-d') ){
			$('body').addClass('border-dark');
		}
	}

	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	$('.view-project').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	$(window).on('load', function(){
		$('body').addClass('loaded');

		/*=========================================================================
			Portfolio Grid
		=========================================================================*/
		portfolio.shuffle();
		$('.portfolio-filters > li > a').on('click', function (e) {
			e.preventDefault();
			var groupName = $(this).attr('data-group');
			$('.portfolio-filters > li > a').removeClass('active');
			$(this).addClass('active');
			portfolio.shuffle('shuffle', groupName );
		});

	});

	/*=========================================================================
		Navigation Functions
	=========================================================================*/
	$('.section-toggle').on('click', function(){
		var $this = $(this),
			sect = $( '#' + $this.data('section') ),
			current_sect = $('.section.active');
		if(sect.length == 1){
			if( sect.hasClass('active') == false && $('body').hasClass('section-switching') == false ){
				$('body').addClass('section-switching');
				if( sect.index() < current_sect.index() ){
					$('body').addClass('up');
				}else{
					$('body').addClass('down');
				}
				setTimeout(function(){
					$('body').removeClass('section-switching up down');
				}, 2500);
				setTimeout(function(){
					current_sect.removeClass('active');
					sect.addClass('active');
				}, 1250);
				if( sect.hasClass('border-d') ){
					$('body').addClass('border-dark');
				}else{
					$('body').removeClass('border-dark');
				}
			}
		}
	});


	/*=========================================================================
		Testimonials Slider
	=========================================================================*/
	$('.testimonials-slider').owlCarousel({
		items: 2,
		responsive:{
			992: {
				items: 2
			},
			0: {
				items: 1
			}
		}
	});





	/*=========================================================================
		Contact Form
	=========================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}
	$('#contact-form').validator().on('submit', function (e) {

		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message

			e.preventDefault();
			var $this = $(this),

				//You can edit alerts here
				alerts = {

					success:
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",


					error:
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"

				};

			$.ajax({

				url: 'mail.php',
				type: 'post',
				data: $this.serialize(),
				success: function(data){

					if( isJSON(data) ){

						data = $.parseJSON(data);

						if(data['error'] == false){

							$('#contact-form-result').html(alerts.success);

							$('#contact-form').trigger('reset');

						}else{

							$('#contact-form-result').html(
							"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='ion-ios-close-empty' ></i> \
									</button> \
									"+ data['error'] +"\
								</div>\
							</div>"
							);

						}


					}else{
						$('#contact-form-result').html(alerts.error);
					}

				},
				error: function(){
					$('#contact-form-result').html(alerts.error);
				}
			});
		}
	});
});


/*=========================================================================
	My Functions
=========================================================================*/
var stringaLocali = "";
var citySelezionta = "";
var	mapLocal = new Map();
var mapNomi = new Map();
var mapReview1 = new Map();
var mapReview2 = new Map();
var arraySelectedContext = [0,0,0,0,0,0,0,0,0,0,0,0,0];
var arrayUrl1Match = [];
var arrayUrl2Match = [];
var arrayUrl3Match = [];
var arrayUrl4Match = [];
var arrayUrl5Match = [];
//var iRandom;
var datiInput;
var nome_locale;
var num_totali;
var num_spiegati;

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

firebase.initializeApp({
	apiKey: "AIzaSyBPWE6sAE8RdDrXnEtr7J7TRotpjwJueUg",
	authDomain: "explanationsystem.firebaseapp.com",
	projectId: "explanationsystem"
});

var db = firebase.firestore();


function letturaReview1(){
    // read text from URL location
		var urlExplanation = "";
		var request = new XMLHttpRequest();
    request.open('GET', 'js/FrasiPerExplanationOpt.txt');
    request.send();
		request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
          //  if (type.indexOf("text") !== 1) {
							urlExplanation = request.responseText;
              // return request.responseText;
        	//   }
        }
				line = urlExplanation.toString().split('\n');
				for (var i = 0; i < line.length; i++) {
					let url = line[i].split(';')[0];
					let contesto = line[i].split(';')[1];
					let frase = line[i].split(';')[2];
					mapReview1.set(url + contesto,frase);
				}
    }
}

function letturaReview2(){
    // read text from URL location
		var urlExplanation = "";
		var request = new XMLHttpRequest();
    request.open('GET', 'js/FrasiLocali.txt');
    request.send();
		request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
          //  if (type.indexOf("text") !== 1) {
							urlExplanation = request.responseText;
              // return request.responseText;
        	//   }
        }
				line = urlExplanation.toString().split('\n');
				for (var i = 0; i < line.length; i++) {
					let url = line[i].split(';')[0];
					let frase = line[i].split(';')[1];
					mapReview2.set(url,frase);
				}
    }
}



function letturaLocali(){
    // read text from URL location
		var request = new XMLHttpRequest();
    request.open('GET', 'js/InfoorderByValue.txt');
    request.send();
		request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
          //  if (type.indexOf("text") !== 1) {
							stringaLocali = request.responseText;
              return request.responseText;
        	//   }
        }
    }
}

function letturaInfo(){
    // read text from URL location
		var urlNome = "";
		var request = new XMLHttpRequest();
    request.open('GET', 'js/urlNome.txt');
    request.send();
		request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
          //  if (type.indexOf("text") !== 1) {
							urlNome = request.responseText;
              // return request.responseText;
        	//   }
        }
				line = urlNome.toString().split('\n');
				for (var i = 0; i < line.length; i++) {
					let url = line[i].split(';')[0];
					let nome = line[i].split(';')[1];
					mapNomi.set(url,nome);
				}
    }
}


function clearAllRadios() {
	let array =[];
	var rad1 = document.getElementsByName('umore');
	var rad2 = document.getElementsByName('salute');
	var rad3 = document.getElementsByName('pasto');
	var rad4 = document.getElementsByName('giorno');
	var rad5 = document.getElementsByName('compagnia');
	array.splice(0,0,rad1,rad2,rad3,rad4,rad5);
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j].checked)
				array[i][j].checked = false;
		}
	}
	disableButtonRun('button-run');
}

function getContextActive() {
	let array =[];
	let contesti = [];
	let e = document.getElementById('city');
	let city = e.options[e.selectedIndex].value;
	let rad5 = document.getElementsByName('umore');
	let rad4 = document.getElementsByName('salute');
	let rad1 = document.getElementsByName('pasto');
	let rad2 = document.getElementsByName('giorno');
	let rad3 = document.getElementsByName('compagnia');
	array.splice(0,0,rad1,rad2,rad3,rad4,rad5);
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j].checked){
				contesti.splice(1,0,array[i][j].getAttribute("id"));
				console.log(array[i][j].getAttribute("id"));
			}
		}
	}

	contesti.splice(0,0,city);

	c = getStringContext(contesti[1]);
	arraySelectedContext[getIdContext(contesti[1])] = 1;
	for (var i = 2; i < contesti.length; i++) {
		c = c + ", " + getStringContext(contesti[i]);
		arraySelectedContext[getIdContext(contesti[i])] = 1;
	}
	// document.getElementById('context_selected').innerHTML = c;
	console.log(arraySelectedContext.toString());
	console.log('contesti : ' + contesti);
 return contesti;
}

function startExplanationSystem() {
	datiInput = getContextActive();
	citySelezionta = datiInput[0].toString();
	createListLocali(citySelezionta);

	mapLocal.forEach(sameContextLocal);
	console.log("locali 1 contesto matchato: " + arrayUrl1Match.length);
	console.log("locali 2 contesto matchato: " + arrayUrl2Match.length);
	console.log("locali 3 contesto matchato: " + arrayUrl3Match.length);
	console.log("locali 4 contesto matchato: " + arrayUrl4Match.length);
	console.log("locali 5 contesto matchato: " + arrayUrl5Match.length);

	var arrayLocaliMatch = sceltaArrayUrl();

	//iRandom = getRandomUrlFromArray(arrayLocaliMatch);
	var urlConsigliato = arrayLocaliMatch[0];
	console.log(urlConsigliato);

	nome_locale = mapNomi.get(urlConsigliato);

	document.getElementById('nome_locale').innerHTML = nome_locale;

	setImage('https://s3-media4.fl.yelpcdn.com/bphoto/9o4XvXuW1X1z1wsmzIxrZw/ls.jpg');

	setExplanation1(datiInput, urlConsigliato);
	setExplanation2(urlConsigliato);
	//var contextReview = getContextReview(url);
	//var review = getReview(url);
}

function setExplanation2(url){
	explanation = mapReview2.get(url);
	if (explanation == undefined){
		explanation = "non sono state rilevate spiegazioni per questo contesto"
	}
	document.getElementById("explanation2").innerHTML ='Ti sugeriamo il locale '+ nome_locale + ' in quanto ' + explanation;
}

function setExplanation1(dati, url){
	var element = document.getElementById("explanation1");
	num_totali = dati.length - 1;
	num_spiegati = 0;
	while (element.firstChild) {
    element.removeChild(element.firstChild);
	}

	for(var i = 1; i < dati.length; i++){
		let contesto = dati[i];
		let key = url+contesto;

		explanation = mapReview1.get(key);

		if (explanation != undefined){
			num_spiegati ++;
			var para = document.createElement("p");
			var node = document.createTextNode('Ti suggeriamo di provare '+ nome_locale + getStringContext(contesto) + 'perchè '+ explanation);
			para.appendChild(node);
			element.appendChild(para);
		}
		console.log(key + ': '+ mapReview1.get(key));
	}

	console.log('totali : '+ num_totali);
	console.log('spiegati : '+ num_spiegati);

	if (num_spiegati == 0) {
		explanation = "non sono state rilevate spiegazioni per questo contesto"
		var para = document.createElement("p");
		var node = document.createTextNode(explanation);
		para.appendChild(node);
		element.appendChild(para);
	}

}

//log di ogni elemento nel map
function logMapElements(value, key, map) {
    console.log("m[" + key + "] = " + value);
}

//verifica che i contesti siano presenti
function sameContextLocal(value, key, map){
	var x = 0;
	for (var i = 0; i < arraySelectedContext.length; i++) {
		if (arraySelectedContext[i] == 1 && value[i] == 1){
			x++;
		}
	}
	switch (x) {
		case 1:
			arrayUrl1Match.push(key);
			break;
		case 2:
			arrayUrl2Match.push(key);
			break;
		case 3:
			arrayUrl3Match.push(key);
			break;
		case 4:
			arrayUrl4Match.push(key);
			break;
		case 5:
			arrayUrl5Match.push(key);
			break;
		default:

	}
}

function sceltaArrayUrl(){
	if (arrayUrl5Match.length != 0){
		return arrayUrl5Match;
		}else if (arrayUrl4Match.length != 0) {
			return arrayUrl4Match;
		}else if (arrayUrl3Match.length != 0) {
			return arrayUrl3Match;
		}else if (arrayUrl2Match.length != 0) {
			return arrayUrl2Match;
		}else if (arrayUrl1Match.length != 0) {
			return arrayUrl1Match;
		}else {
			alert("attanzione, nessun locale ha è adatto per questa situazione");
		}
}



function getRandomUrlFromArray(array){
	var max = array.length - 1;
	var random =Math.floor(Math.random() * (+ max - +0)) + +0;
  console.log("Random Number Generated : " + random );
	return random;
}

function getStringContext(s){
	text = "";
	switch (s) {
		case "buono" :
			text = " quando sei di buon umore ";
			break;
		case "non_buono":
			text = " se sei di cattivo umore ";
			break;
		case "feriale":
			text = " in settiman ";
			break;
		case "festivo":
			text = " nel week-end ";
			break;
		case "buona":
			text = " se sei in buona salute ";
			break;
		case "non_buona":
			text = " se hai Allergie/Intolleranze/Diabete ";
			break;
		case "amici":
			text = " con Amici ";
			break;
		case "coppia":
			text = " in Coppia ";
			break;
		case "famiglia":
			text = " in Famiglia ";
			break;
		case "colazione":
			text = " a colazione ";
			break;
		case "pranzo":
			text = " a pranzo ";
			break;
		case "cena":
			text = " a cena ";
			break;
		case "ricevimento":
			text = " per un Ricevimento ";
			break;

		default:
	}
	return text;
}

function getIdContext(s){
	switch (s) {
		case 'buono':
			text = 11;
			break;
		case 'non_buono':
			text = 12;
			break;
		case 'feriale':
			text = 4;
			break;
		case 'festivo':
			text = 3;
			break;
		case 'buona':
			text = 9;
			break;
		case 'non_buona':
			text = 10;
			break;
		case 'amici':
			text = 2;
			break;
		case 'coppia':
			text = 1;
			break;
		case 'famiglia':
			text = 0;
			break;
		case 'colazione':
			text = 5;
			break;
		case 'pranzo':
			text = 6;
			break;
		case 'cena':
			text = 7;
			break;
		case 'ricevimento':
			text = 8;
			break;
		default:
	}
	return text;
}

function createListLocali(city){
	mapLocal.clear();
	var line = stringaLocali.toString().split('\n');
	console.log(line.length);
	for (var i = 0; i < line.length; i++) {
		var localetxt = [];
		localetxt = line[i].split(";");
		url = localetxt.shift();
		cityLine = localetxt.shift();
		if (cityLine == city){
			mapLocal.set(url , localetxt);
		}
	}
	console.log("locali selezionati per città: "+ mapLocal.size);
}

function setImage(urlImage){
	var imageContainer = document.getElementById('image_container');
	while (imageContainer.firstChild) {
			imageContainer.removeChild(imageContainer.firstChild);
	}
	
	fetch(urlImage)
  .then(res => res.blob()) // Gets the response and returns it as a blob
  .then(blob => {
    let objectURL = URL.createObjectURL(blob);
    let myImage = new Image();
    myImage.src = objectURL;
    document.getElementById('image_container').appendChild(myImage)
});
}

function controlloContesti(){
	letturaLocali();
	console.log("lunghezza "+ mapLocal.size);
	letturaReview1();
	letturaReview2();

	var contesti_selezionati = false;
	let array =[];
	let e = document.getElementById('city');
	let city = e.options[e.selectedIndex].value;
	let rad5 = document.getElementsByName('umore');
	let rad4 = document.getElementsByName('salute');
	let rad1 = document.getElementsByName('pasto');
	let rad2 = document.getElementsByName('giorno');
	let rad3 = document.getElementsByName('compagnia');

	array.splice(0,0,rad1,rad2,rad3,rad4,rad5);
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j].checked){
				contesti_selezionati = true;
			}
		}
	}

	if (city == ""){
		alert("Selezionare la Città per proseguire");
	}else if (contesti_selezionati == false ) {
		alert("Selezionare almeno un contesto per proseguire");
	}else {
		enableButtonRun("button-run");
		alert("ora puoi proseguire");
		letturaInfo();
	}

}

function enableButtonRun(id) {
            document.getElementById(id).disabled = false;
            document.getElementById(id).style.visibility = 'visible';
        }

function disableButtonRun(id) {
            document.getElementById(id).disabled = true;
						document.getElementById(id).style.visibility = 'hidden';
        }

function suggerisciAltro(){
	var arrayLocaliMatch = sceltaArrayUrl();
	console.log("lunghezza array "+ arrayLocaliMatch.length);
	arrayLocaliMatch.splice(0, 1);

	var urlConsigliato = arrayLocaliMatch[0];

	nome_locale = mapNomi.get(urlConsigliato);
	document.getElementById('nome_locale').innerHTML = nome_locale;

	setImage('https://s3-media4.fl.yelpcdn.com/bphoto/9o4XvXuW1X1z1wsmzIxrZw/ls.jpg');

	setExplanation1(datiInput, urlConsigliato);
	setExplanation2(urlConsigliato);

	alert("Nuovo locale suggerito!");

}

//-----------------------------------------------------------------------------
// 		SaveData()
//-----------------------------------------------------------------------------
function saveData(){
	//true = context-aware - false = no context-aware
	var explanationPrefer = document.getElementsByName('tipo')[0].checked;
	var comprensione =  document.getElementsByName('comprensione')[0].checked;
	var convincimento =  document.getElementsByName('convincente')[0].checked;
	var newInfo =  document.getElementsByName('nuove')[0].checked;
	var fiducia =  document.getElementsByName('fiducia')[0].checked;
	let compagnia = null;
	let umore = null;
	let giorno = null;
	let salute = null;
	let pasto = null;

	for (var i = 0; i < arraySelectedContext.length; i++) {
		if (arraySelectedContext[i] == 1){
			console.log(getStringContext(arraySelectedContext[i]));

			switch (i) {
				case 0:
					compagnia = 'famiglia';
					break;
				case 1:
					compagnia = 'coppia';
					break;
				case 2:
					compagnia = 'amici';
					break;
				case 3:
					giorno = 'festivo';
					break;
				case 4:
					giorno = 'feriale';
					break;
				case 5:
					pasto = 'colazione';
					break;
				case 6:
					pasto = 'pranzo';
					break;
				case 7:
					pasto = 'cena';
					break;
				case 8:
					pasto = 'ricevimento';
					break;
				case 9:
					salute = 'buona';
					break;
				case 10:
					salute = 'non_buona';
					break;
				case 11:
					umore = 'buono';
					break;
				case 12:
					umore = 'non_buono';
					break;
				default:

			}
		}
	}

	var data = {
		url : datiInput[0],
		umore : umore,
		giorno : giorno,
		pasto :pasto,
		compagnia :compagnia,
		salute: salute,
		contesti : num_totali,
		spiegati : num_spiegati,
		explanationPrefer : explanationPrefer,
		comprensione : comprensione,
		convincimento : convincimento,
		newInfo : newInfo,
		fiducia : fiducia
	}

	writeNewPost(data);
	clearAllRadios();
}

function writeNewPost(postData) {
	// Add a second document with a generated ID.
	db.collection("users").add(postData)
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});

}
