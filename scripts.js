var tempos = {
    "slow": 0.375,
    "medium": 0.75,
    "fast": 1.5
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

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();
    var oscillator = audioCtx.createOscillator()
    oscillator.connect(audioCtx.destination);
    oscillator.start()

    var string = document.getElementById("code").value;
    string = string.replace(/\s/g, "");
    var split_string = string.split(/,/);

    const multiplier = tempos[document.getElementById("tempo").value.toLowerCase()];
    const base = 261.626 // frequency of middle C
    const y = Math.pow(2, 1 / 12) // frequency multiplier between 2 half notes
    var i;
    var time_elapsed = 0;
    var time_elapsed = 0;

    for (i = 0; i < split_string.length - 1; i++) {
        console.log(i);
        let input = split_string[i];
        let num_asterisks = input.match(/\*/g) ? input.match(/\*/g).length : 0;
        let note_duration = note_lengths[input[input.length - 1]] / multiplier;

        let note = notes[input[input.length - 2]];
        let power = 12 * num_asterisks + note
        let frequency = base * Math.pow(y, power);

        oscillator.frequency.setValueAtTime(frequency, time_elapsed);
        time_elapsed += note_duration;
    }

    oscillator.stop(time_elapsed);
}





