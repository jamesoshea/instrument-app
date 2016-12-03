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
function updateNoise(val, target) {
	$(target).text(val);
	currentSettings.noisevol = Number(val);
	synthInit();
}

function updateOct2(val, target){
	$(target).text(val);
}

$(document).ready(function(){
	var diff = 0;
	var rootNote = 58;
	var keys = ["z", "x", "c", "v", "b", "n", "m", "s", "d", "f", "g", "h", "j", "w", "e", "r", "t", "y", "u", "i"];

	//binds a certain key to a note, plays it, then adds some CSS abrakebabra!
	function bindIt(rootNote) {
		var keyFunctions = [];
		function keybindFunction(i) {
				keyboardJS.bind(keys[i], function(e) {
					//stops a key hold triggering the note over and over
					e.preventRepeat();
					var note = rootNote + i;
					oscenv.noteOn(note, velocity1);
					osc2env.noteOn(note + diff, velocity2);
					var ts = "#" + i;
				  $(ts).addClass("button-primary");
				  $("#note-display").text(noteToKey[note]);
				}, function(e) {
					var ts = "#" + i;
				  $(ts).removeClass("button-primary");
					var note = rootNote + i;
					oscenv.noteOff(note);
					osc2env.noteOff(note + diff);
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

	$("#fd-oct-2").on("input", function() {
		value = $(this).val();
		diff = value * 12;
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
		currentSettings.osc1 = T(waveforms[i]);
		currentSettings.name1 = waveforms[i];
		synthInit();
		$(".wave-sel").removeClass("button-primary");
		$(selectors[i]).addClass("button-primary");
		});
	}

	function waveSelector2(i){
		$(selectors2[i]).on("click", function() {
		currentSettings.osc2 = T(waveforms[i]);
		currentSettings.name2 = waveforms[i];

		synthInit();
		console.log(currentSettings.name2);
		$(".wave-sel-2").removeClass("button-primary");
		$(selectors2[i]).addClass("button-primary");
		});
	}

	for (var i = 0; i < selectors.length; i++) {
		waveFunctions[i] = waveSelector(i);
		waveFunctions2[i] = waveSelector2(i);
	}

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

	bindIt(rootNote);
	synthInit();	
});
