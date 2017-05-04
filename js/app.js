//slider outputs
function updateOutput(val, target, param) {
	$(target).text(val);
	currentSettings.envsettings[param] = Number(val);
	synthInit();
}
function updateOutput2(val, target, param) {
	$(target).text(val);
	currentSettings.env2settings[param] = Number(val);
	synthInit();
}
function updateFilter(val, target, param) {
	$(target).text(val);
	currentSettings.filtersettings[param] = Number(val);
	synthInit();
}

function updateOct2(val, target){
	$(target).text(val);
}

//filter pass selector
function filterSelect(value) {
	currentSettings.filtersettings.hilo = value;
	synthInit();
}

$(document).ready(function(){
	var rootNote = 58;
	var keys = ["z", "x", "c", "v", "b", "n", "m", "s", "d", "f", "g", "h", "j", "w", "e", "r", "t", "y", "u", "i"];

	//binds a certain key to a note, adding event listeners, then adds some CSS abrakebabra!
	function bindIt(rootNote) {
		var keyFunctions = [];
		function keybindFunction(i) {
			var key = document.getElementById(i);
			var note = rootNote + i;
			var ts = "#" + i;
			var nd = document.getElementById("note-display");
			key.addEventListener('touchstart', function(e){
				synth.noteOn(note);
				osc2env.noteOn(note + (currentSettings.octave * 12), currentSettings.env2settings.v);
			  $(ts).addClass("button-primary");
			  $(nd).text(noteToKey[note]);
				e.preventDefault();
			});
			key.addEventListener('touchend', function(e){
				synth.noteOff(note);
				osc2env.noteOff(note + (currentSettings.octave * 12));
			  $(ts).removeClass("button-primary");
				e.preventDefault();
			});

			keyboardJS.bind(keys[i], function(e) {
				//stops a key hold triggering the note over and over
				e.preventRepeat();

				synth.noteOn(note);
				osc2env.noteOn(note + (currentSettings.octave * 12),  currentSettings.env2settings.v);
			  $(ts).addClass("button-primary");
			  $(nd).text(noteToKey[note]);
			}, function(e) {
			  $(ts).removeClass("button-primary");
				synth.noteOff(note);
				osc2env.noteOff(note + (currentSettings.octave * 12));
			});
		};
		//loop over the key object
		for (var i = 0; i < 20; i++) {
			keyFunctions[i] = keybindFunction(i);
		}
	}


	//initial animation
	function hello() {
		$("#note-display").slideDown(600);
		$("#menu-switch").slideDown(600);
	}

	keyboardJS.bind('', function(e){
		hello();
	});
	document.getElementById("main").addEventListener('touchstart', function(e){
		hello();
	});

	$("#menu-switch").on("click", function() {
		$("#options").slideToggle(600);
	});

	//key changes

	function shifter(el) {
		keyboardJS.reset();
		bindIt(rootNote);
		$(el).animate({
			opacity: 0.5
		}, 250, function(){
			$(el).animate({
				opacity: 1
			}, 250);
		});
	}
	$("#oct-down").on("click", function() {
		if (rootNote > 32) {
			rootNote -= 12;
			var element = "#" + this.id;
			shifter(element);
		}
	});

	$("#oct-up").on("click", function() {
		if (rootNote <= 77) {
			rootNote += 12;
			var element = "#" + this.id;
			shifter(element);
		}
	});

	$("#note-down").on("click", function() {
		if (rootNote > 21) {
			rootNote -= 1;
			var element = "#" + this.id;
			shifter(element);
		}
	});

	$("#note-up").on("click", function() {
		if (rootNote < 89) {
			rootNote += 1;
			var element = "#" + this.id;
			shifter(element);
		}
	});

	$("#fd-oct-2").on("input", function() {
		value = $(this).val();
		currentSettings.octave = value;
		$("#oct-out-2").text(value);
		bindIt();
	});

	//waveform selectors
	var selectors = ["#sin-sel", "#tri-sel", "#saw-sel", "#pulse-sel"];
	var selectors2 = ["#sin-sel-2", "#tri-sel-2", "#saw-sel-2", "#pulse-sel-2"];
	var waveforms = ["sin", "tri", "saw", "pulse"];
	var waveFunctions = [];
	var waveFunctions2 = [];

	function waveSelector(i){
		$(selectors[i]).on("click", function() {
		currentSettings.osc1 = waveforms[i];
		console.log(currentSettings.osc1);
		synthInit();
		$(".wave-sel").removeClass("button-primary");
		$(selectors[i]).addClass("button-primary");
		});
	}

	function waveSelector2(i){
		$(selectors2[i]).on("click", function() {
		currentSettings.osc2 = waveforms[i];
		synthInit();
		$(".wave-sel-2").removeClass("button-primary");
		$(selectors2[i]).addClass("button-primary");
		});
	}

	for (var i = 0; i < selectors.length; i++) {
		waveFunctions[i] = waveSelector(i);
		waveFunctions2[i] = waveSelector2(i);
	}

	//preset selector
	$("#preset-sel").on("input", function(){
		presetSelect(this.value);
	});

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
	//inital key and touch binding
	bindIt(rootNote);

	synthInit();
});
