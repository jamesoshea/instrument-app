var envsettings = {
	a:1000,
	d:250,
	s:0.6,
	r:0
}

var	osc = T("sin");

function synthInit() {
	var	env = T("adsr", envsettings, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();
	oscenv = T("OscGen", {osc:osc, env:env, mul:0.15}).play();
	velocity = 127;
	console.log("changed!");
}

	/* note conversions
	--------------------------------------------------- */
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