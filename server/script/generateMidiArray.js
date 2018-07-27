const MidiWriter = require('midi-writer-js');
const createRandomMelody = require('./createRandomMelody');
const {numToNote} = require('./noteUtilities');

/*eslint-disable complexity*/
// called when 'generate' is clicked
function generateMidiArray({
  tonality = 'diatonic',
  pitchRange = '0 127',
  midiLength = 10,
  intervalJump = 7,
  rhythmValues = 4,
  midiQuantity = 2
} = {}) {
  let results = [];
  for (let i = 0; i < midiQuantity; i++) {
    let midiCodeArray = createRandomMelody({ tonality, pitchRange, midiLength, intervalJump });
    let pitchNamesWithOctave = midiCodeArray.map(num => numToNote(num));
    let midiFile = createMidiFile(midiCodeArray, rhythmValues);
    results.push({
      midiCodeArray, pitchNamesWithOctave, midiFile
    });
  }
  return results;
}

function createMidiFile(midiCodeArray, rhythmValues) {
  let track = new MidiWriter.Track();
  let noteArray = [];
  for (let j = 0; j < midiCodeArray.length; j++) {
    let pitch = [midiCodeArray[j]];
    let duration = rhythmValues || 2;
    let note = new MidiWriter.NoteEvent({ pitch, duration });
    noteArray.push(note);
  }
  track.addEvent(noteArray);
  let write = new MidiWriter.Writer([track]);
  let file = write.dataUri();
  return file;
}

// let tonalityOptions = document.getElementById('tonalityOptions');
// let midiRange = document.getElementById('midiRange');
// let midiLength = document.getElementById('midiLength');
// let midiJump = document.getElementById('midiJump');
// let lengthValues = document.getElementById('lengthValues');
// let midiQTY = document.getElementById('midiQTY');
// let generate = document.getElementById('generate');
// let results = document.getElementById('results');

// generate.addEventListener('click', () => createMidi());

module.exports = {
  generateMidiArray
};

