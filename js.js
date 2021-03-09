//	Simple example of using private variables
//
//	To start the stopwatch:
//		obj.start();
//
//	To get the duration in milliseconds without pausing / resuming:
//		var	x = obj.time();
//
//	To pause the stopwatch:
//		var	x = obj.stop();	// Result is duration in milliseconds
//
//	To resume a paused stopwatch
//		var	x = obj.start();	// Result is duration in milliseconds
//
//	To reset a paused stopwatch
//		obj.stop();
//
var	clsStopwatch = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
 
		// Public methods
		// Start or resume
		this.start = function() {
				startAt	= startAt ? startAt : now();
			};

		// Stop or pause
		this.stop = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};

		// Reset
		this.reset = function() {
				lapTime = startAt = 0;
			};

		// Duration
		this.time = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	};

let x = new clsStopwatch();
let $time;
let clocktimer;

function pad(num, size) {
	let s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime(time) {
	let h = m = s = ms = 0;
	let newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % 1000;

	newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
	return newTime;
}

function show() {
	$time = document.getElementById('time');
	update();
}

function update() {
	$time.innerHTML = formatTime(x.time());
}

function start() {
	clocktimer = setInterval("update()", 1);
	x.start();
}

function stop() {
	x.stop();
	clearInterval(clocktimer);
}

let tS = 0;	//0 - Não Travado
			//1 - Travado
function toggleStop(){
	if(tS === 0){
		x.stop();
		tS = 1;
		document.getElementById("btn").value = "Travado";
		document.getElementById("btn").blur();
	}
	else{
		x.start();
		tS = 0;
		document.getElementById("btn").value = "Travar";
		document.getElementById("btn").blur();
	}
}

function reset() {
	if(state === 0){
	}
	else if(state === 1) {
		stop();
		x.reset();
		update();
		state = 0;
	}
}
let state = 0; 	//0 = Cronometro parado;
				//1 = rodando;
				//2 = parado, mostrando resultado;
function resetSpace() {
	if((event.keyCode === 32 || event.which === 32) && tS === 0){
		if(state === 0){
			stop();
			x.reset();
			update();
		}
		else if(state === 1){
			x.stop();
			clearInterval(clocktimer);
			state = 2;
		}
		else if (state === 2){		
			stop();
			x.reset();
			update();
			state = 0;
		}
	}
}

function startSpace() {
	if((event.keyCode === 32 || event.which === 32) && tS === 0){
		if(state === 0){
			clocktimer = setInterval("update()", 1);
			x.start();
			state = 1;
		}
	}
}

let showPopUpRight = false;
function helpPage(){
	if(!(event.keyCode === 32 || event.which === 32)){
		document.getElementById("helpBtn").blur();
		if(!showPopUpRight){
			document.getElementById("popUp").style.right = "0";
			document.getElementById("conteudo").style.transition = "0.4s ease";
			document.getElementById("conteudo").style.filter = "blur(2px)";
			showPopUpRight = true;
		}else{
			document.getElementById("popUp").style.right = "-50%";
			document.getElementById("conteudo").style.transition = "0.4s ease";
			document.getElementById("conteudo").style.filter = "blur(0px)";
			document.getElementById("helpBtn").blur();
			document.getElementById("xRight").blur();
			showPopUpRight = false;
		}
	}
}

let showPopUpLeft = false;
function savePage(){
	if(!(event.keyCode === 32 || event.which === 32)){
		document.getElementById("saveBtnPage").blur();
		if(!showPopUpLeft){
			document.getElementById("popUpLeft").style.left = "0";
			document.getElementById("conteudo").style.transition = "0.4s ease";
			document.getElementById("conteudo").style.filter = "blur(2px)";
			showPopUpLeft = true;
		}else{
			document.getElementById("popUpLeft").style.left = "-50%";
			document.getElementById("conteudo").style.transition = "0.4s ease";
			document.getElementById("conteudo").style.filter = "blur(0px)";
			document.getElementById("saveBtnPage").blur();
			document.getElementById("xLeft").blur();
			document.getElementById("downBtn").blur();
			showPopUpLeft = false;
		}
	}
}

let typeOf = "Não Identificado";
const OPTIONS = ['2x2x2', '3x3x3', '4x4x4', 'Pyraminx', '2x2x2 Time Machine'];
let pos = 0;

document.getElementById('changeTypeBtn').addEventListener('click', (e) => {
  e.target.value = OPTIONS[pos];
  typeOfFunct(e.target.value);
  if(pos > OPTIONS.length - 2) {
    pos = 0;
    return;
  }
  pos += 1;
});

function typeOfFunct(typeOfThis){
	typeOf = typeOfThis;
}

let innerCounter = 1;

function saveResult(timeOf,typeOfThis){
	if(!(showPopUpLeft||showPopUpRight)){
		let div = document.createElement("p");
		div.innerHTML =innerCounter + ". Tempo: " + formatTime(x.time()) + " com " + typeOf + "\n";
		document.getElementById("saveThisText").appendChild(div);
		innerCounter++;
	}
}

function download(filename) {
	let resultsOf = document.getElementById("saveThisText").textContent;
	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resultsOf));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
  }
  