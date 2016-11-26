/*

TODO:
  		map out some new constellations on pen and paper
  		row picker

*/


$(document).ready(function(){

	var rootNote = 46;
	var keys = {"0": "z",
							"1": "x",
							"2": "c",
							"3": "v",
							"4": "b",
							"5": "n",
							"6": "m",
							"7": "s",
							"8": "d",
							"9": "f",
							"10": "g",
							"11": "h",
							"12": "j",
							"13": "w",
							"14": "e",
							"15": "r",
							"16": "t",
							"17": "y",
							"18": "u",
							"19": "i"};

	//binds a certain key to a note, plays it, then adds some CSS abrakebabra!
	function bindIt(rootNote) {
		var keyFunctions = [];
		function keybindFunction(i) {
				keyboardJS.bind(keys[i], function(e) {
					//stops a key hold triggering the note over and over
					e.preventRepeat();
					var note = rootNote + i;
					playNote(note);
					var ts = "#" + i;
				  $(ts).addClass("button-primary");
				  $("#note-display").text(MIDI.noteToKey[note]);
				}, function(e) {
					var ts = "#" + i;
				  $(ts).removeClass("button-primary");
					var note = rootNote + i;
					stopNote(note);
				});		
		}
		for (var i = 0; i < 20; i++) {
			keyFunctions[i] = keybindFunction(i);
		}
	}	

	function octaveUp() {
		if (rootNote <= 77) {
			rootNote += 12;
			keyboardJS.reset();
			bindIt(rootNote);
			$("#oct-up").animate({
				opacity: 0.5
			}, 250, function(){
				$("#oct-up").animate({
					opacity: 1
				}, 250);
			});
		}
	}

	function octaveDown() {
		if (rootNote > 32) {
			rootNote -= 12;
			keyboardJS.reset();
			bindIt(rootNote);
			$("#oct-down").animate({
				opacity: 0.5
			}, 250, function(){
				$("#oct-down").animate({
					opacity: 1
				}, 250);
			});
		}
	}

	function noteUp() {
		if (rootNote < 89) {
			rootNote += 1;
			keyboardJS.reset();
			bindIt(rootNote);
			$("#note-up").animate({
				opacity: 0.5
			}, 250, function(){
				$("#note-up").animate({
					opacity: 1
				}, 250);
			});
		}	
	}

	function noteDown() {
		if (rootNote > 21) {
			rootNote -= 1;
			keyboardJS.reset();
			bindIt(rootNote);
			$("#note-down").animate({
				opacity: 0.5
			}, 250, function(){
				$("#note-down").animate({
					opacity: 1
				}, 250);
			});
		}		
	}

	keyboardJS.bind('', function(e){
		$("#message").slideUp(1000);
		$("#message").fadeOut(500);
		$("#note-display").slideDown(600);
		$("#menu-switch").slideDown(600);
	});

	$("#menu-switch").on("click", function() {
		$("#options").slideToggle(600);
	});

	$("#oct-down").on("click", function() {
		octaveDown();
	});

	$("#oct-up").on("click", function() {
		octaveUp();
	});

	$("#note-down").on("click", function() {
		noteDown();
	});

	$("#note-up").on("click", function() {
		noteUp();
	});

	$("#saw-sel").on("click", function() {
	console.log("butts");
	osc = T("saw");
	synthInit();
	});

	$("#saw-sel").on("click", function() {
	console.log("butts");
	osc = T("saw");
	synthInit();
	});

	$("#sine-sel").on("click", function() {
	console.log("butts");
	osc = T("sin");
	synthInit();
	});

	$("#tri-sel").on("click", function() {
	console.log("butts");
	osc = T("tri");
	synthInit();
	});

	$("#pulse-sel").on("click", function() {
	console.log("butts");
	osc = T("pulse");
	synthInit();
	});

	bindIt(rootNote);
	synthInit();
});
