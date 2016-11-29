//slider outputs
function updateOutput(val, target, param) {
$(target).text(val);
	envsettings[param] = Number(val);
	console.log(envsettings);
	synthInit();
}

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
					oscenv.noteOn(note, velocity);
					var ts = "#" + i;
				  $(ts).addClass("button-primary");
				  $("#note-display").text(noteToKey[note]);
				}, function(e) {
					var ts = "#" + i;
				  $(ts).removeClass("button-primary");
					var note = rootNote + i;
					oscenv.noteOff(note);	
				});		
		}
		//loop over the key object
		for (var i = 0; i < 20; i++) {
			keyFunctions[i] = keybindFunction(i);
		}
	}


	//initial animation
	keyboardJS.bind('', function(e){
		$("#message").slideUp(1000);
		$("#note-display").slideDown(600);
		$("#menu-switch").slideDown(600);
	});

	$("#menu-switch").on("click", function() {
		$("#options").slideToggle(600);
	});

	//key change functions
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

	//waveform selectors
	var selectors = ["#sin-sel", "#tri-sel", "#saw-sel", "#pulse-sel"];
	var waveforms = ["sin", "tri", "saw", "pulse"];
	var waveFunctions = [];

	function waveSelector(i){
		$(selectors[i]).on("click", function() {
		console.log("butts");
		osc = T(waveforms[i]);
		synthInit();
		});
	}

	for (var i = 0; i < selectors.length; i++) {
		waveFunctions[i] = waveSelector(i);
	}

	//note conversions
	var keyToNote = {}; // C8  == 108
	var noteToKey = {}; // 108 ==  C8

	var A0 = 0x15; // first note
	var C8 = 0x6C; // last note
	var number2key = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
	for (var n = A0; n <= C8; n++) {
		var octave = (n - 12) / 12 >> 0;
		var name = number2key[n % 12] + octave;
		keyToNote[name] = n;
		noteToKey[n] = name;
	}

	bindIt(rootNote);
	synthInit();
});
