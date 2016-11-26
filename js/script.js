var	osc = T("sin");
var	env = T("adsr", {a:100,d:250,s:0.6,r:500}, T("sin")).on("ended", function() {
	  this.pause();
	}).bang();

function freqToMidi(freq) {
return 69 + 12 * Math.log2((freq/440));
}

function midiToFreq(mNote) {
	return Math.pow(2, (mNote - 69)/12) * 440;
}

function synthInit() {
	oscenv = T("OscGen", {osc:osc, env:env, mul:0.15}).play();
	velocity = 99;
}


function playNote(note) {

	oscenv.noteOn(note, velocity);
}

function stopNote(note) {
	oscenv.noteOff(note);
}