var tempos = {
    "slow": 0.5,
    "medium": 0.75,
    "fast": 1
}

/* the frequency of each note is base * x**(y) where base is the frequency of middle C,
x is the twelfth root of 2, and y is the digit specified in this dictionary,
which corresponds to the number of half notes above middle C that the note is*/
var notes = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "A": 10,
    "b": 11,
}

// defines the duration of each note in seconds. Can be altered by changing the tempo
var note_lengths = {
    "1": 0.125,
    "2": 0.250,
    "3": 0.375,
    "4": 0.500,
    "5": 0.750,
    "6": 1.000
};


function playSong() {

    // var AudioContext = window.AudioContext || window.webkitAudioContext;
    // var audioCtx = new AudioContext();
    // gainNode = audioCtx.createGain();
    // osc = audioCtx.createOscillator();
    // osc.connect(gainNode);
    // gainNode.connect(audioCtx.destination);
    // osc.type = "sine";

    // // set frequency and gain
    // osc.frequency.value = 440;
    // gainNode.gain.value = 1.0;
    // gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 1);
    // gainNode.gain.setValueAtTime(1, audioCtx.currentTime + 1.04);
    // gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 3);

    // // start and connect
    // osc.start();

    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    gainNode = audioCtx.createGain();
    oscillator = audioCtx.createOscillator();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = "sine";
    oscillator.start();

    var string = document.getElementById("code").value;
    string = string.replace(/\s/g, "");
    var split_string = string.split(/,/);

    const multiplier = tempos[document.getElementById("tempo").value.toLowerCase()];
    const base = 261.626 // frequency of middle C
    const y = Math.pow(2, 1 / 12) // frequency multiplier between 2 half notes
    var i;
    var time_elapsed = 0;

    for (i = 0; i < split_string.length - 1; i++) {
        let input = split_string[i];
        let num_asterisks = input.match(/\*/g) ? input.match(/\*/g).length : 0;
        let note_duration = note_lengths[input[input.length - 1]] / multiplier;

        let note = notes[input[input.length - 2]];
        let power = 12 * num_asterisks + note
        let frequency = base * Math.pow(y, power);

        oscillator.frequency.setValueAtTime(frequency, time_elapsed);
        time_elapsed += note_duration;

        // reduces poppoing somewhat
        gainNode.gain.exponentialRampToValueAtTime(0.5, time_elapsed-0.05);
        gainNode.gain.exponentialRampToValueAtTime(1, time_elapsed);
    }

    oscillator.stop(time_elapsed);
}





