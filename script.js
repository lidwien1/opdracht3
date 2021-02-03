/*
  Wat doe je ook alweer in Javascript voor een micro-interactie?
  1. Gebruik de querySelector om een element in je html te selecteren
  2. Koppel een evenListener aan het element om een mouse-event te detecteren
  3. Gebruik het Classlist object om een css class aan een element toe te voegen of weg te halen.
*/

/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

var requestURL = 'https://koopreynders.github.io/frontendvoordesigners/opdracht3/json/movies.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

/* dit doen als de data terugkomt van de server */
/* hier wordt de carrousel gevuld met de films */
request.onload = function () {
	const movies = request.response;

	
	for (let i = 0; i < movies.length; i++) {		
		// voor elke film een li met titel, foto en reviews aanmaken en toevoegen
		let newLi = document.createElement("li");
      newLi.id = "slide" + (i + 1);	
		newLi.classList.add("carousel_slide");
		
		// de titel 
		let newHeader = document.createElement("h2");
		newHeader.innerHTML = movies[i].title;
		newLi.appendChild(newHeader);
		
		// de cover
		let newImg = document.createElement("img");
		newImg.src = movies[i].cover;
		newImg.alt = movies[i].title;
		newLi.appendChild(newImg);
		
		// de reviews
		let newReviews = document.createElement("ul");
		for (let t = 0; t < movies[i].reviews.length; t++) {
			let newReview = document.createElement("li");
			newReview.innerHTML = movies[i].reviews[t].score
			newReviews.appendChild(newReview);
		}
		newLi.appendChild(newReviews);
		
		document.body.querySelector("ul.carousel_track").appendChild(newLi);
		
		// voor elke film een bolletje aanmaken en toevoegen
		let newBolletje = document.createElement("a");
		newBolletje.classList.add("carousel_indicator");
		
		document.body.querySelector("nav.carousel_nav").appendChild(newBolletje);
	}

	
	// en dan nog de eerste li de class huidige-slide geven
	document.body.querySelector("ul.carousel_track li:first-child").classList.add("huidige-slide");
	// en het eerste bolletje de class current-slide
	document.body.querySelector("nav.carousel_nav a:first-child").classList.add("current-slide");
	
	
	// als de carrousel gevuld is, kan de interactie geinitieerd worden
	initieerInteractie();
}

function initieerInteractie() {
	var track = document.querySelector('.carousel_track');
	//alle slides bij elkaar door children
	var slides = Array.from(track.children);
	var rButton = document.querySelector('.carousel_button--right');
	var lButton = document.querySelector('.carousel_button--left');
	
	var nav = document.querySelector('.carousel_nav');
	var bolletje = Array.from(nav.children);
	
	//wanneer ik links klik, naar links bewegen
	//wanneer ik rechts klik, naar rechts bewegen
	
	var slideWidth = slides[0].getBoundingClientRect().width;

	//de slides naast elkaar zetten
	var slidePosition = (slides, index) => {
		slides.style.left = slideWidth * index + 'px';
	}

	slides.forEach(slidePosition);
    
    var moveToSlide = (track, huidigeSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
		huidigeSlide.classList.remove('huidige-slide');
		targetSlide.classList.add('huidige-slide');
    }
    
    var updateBolletje = (huidigeBol, targetBol) => {
        huidigeBol.classList.remove('current-slide');
        targetBol.classList.add('current-slide');
    }

    //wanneer ik links klik, naar links bewegen
	lButton.addEventListener('click', e => {
		var huidigeSlide = track.querySelector('.huidige-slide');
		var vorigeSlide = huidigeSlide.previousElementSibling;
        var huidigeBol = nav.querySelector('.current-slide');
        var vorigeBol = huidigeBol.previousElementSibling;
        
        moveToSlide(track, huidigeSlide, vorigeSlide);
        updateBolletje(huidigeBol, vorigeBol);
	});
    
    //wanneer ik rechts klik, naar rechts bewegen
	rButton.addEventListener('click', e => {
		var huidigeSlide = track.querySelector('.huidige-slide');
		var volgendeSlide = huidigeSlide.nextElementSibling;
        var huidigeBol = nav.querySelector('.current-slide');
        var volgendeBol = huidigeBol.nextElementSibling;
	
        moveToSlide(track, huidigeSlide, volgendeSlide);
        updateBolletje(huidigeBol, volgendeBol);

	});
    
    nav.addEventListener('click', e =>{
        //Op welk bolletje is geklikt?
        var targetBol = e.target.closest('a');
        
        if (!targetBol) return;
        
        var huidigeSlide = track.querySelector('.huidige-slide');
        var huidigeBol = nav.querySelector('.current-slide')
        var targetIndex = bolletje.findIndex(bol => bol === targetBol);
        var targetSlide = slides[targetIndex];
        
        moveToSlide(track, huidigeSlide, targetSlide);
        updateBolletje(huidigeBol, targetBol);
     
        })
}

	//Bron: https://www.youtube.com/watch?v=gBzsE0oieio


/*
document.addEventListener("keydown", function (e) {
    console.log(e.keyCode);
}, false);
//Guus Groenink: Met deze code kun je in de console kijken welke key welke code heeft in de console. Vervolgens kun je zoiets doen om een functie toe te wijzen aan een bepaalde keydown
document.addEventListener("keydown", function (e) {
    if (e.keyCode == 37) {
        goLeft();
    }
    if (e.keyCode == 39) {
        goRight();
    }
}, false);
*/


/*
var slides_length = slides.length;

function arrowRight() {
    i--;
    if (i > 0) {
        i = slides_length -1;
    }
    slides[i].checked = true;
}

function arrowLeft() {
    i--;
    if (i < 0) {
        i = slides_length -1;
    }
    slides[i].checked = true;
}

function toetsenbord(event){
    if (event.key == "ArrowRight") {
        arrowRight();
    } else if (event.key == "ArrowLeft") {
        arrowLeft();
    }
}

window.addEventListener("keydown", toetsenbord); 
*/