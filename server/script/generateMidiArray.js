const MidiWriter = require('midi-writer-js');
const createRandomMelody = require('./createRandomMelody');
const {numToNote} = require('./noteUtilities');

// called when 'generate' is clicked
function generateMidiArray({
  tonality = 'diatonic',
  pitchRange = '0 127',
  midiLength = 10,
  intervalJump = 7,
  rhythmValues = 4,
  midiQuantity = 2
} = {}) {
  const results = [];
  for (let i = 0; i < midiQuantity; i++) {
    const midiCodeArray = createRandomMelody({ tonality, pitchRange, midiLength, intervalJump });
    const pitchNamesWithOctave = midiCodeArray.map(num => numToNote(num));
    const midiFile = createMidiFile(midiCodeArray, rhythmValues);
    results.push({
      midiCodeArray, pitchNamesWithOctave, midiFile
    });
  }
  return results;
}

function createMidiFile(midiCodeArray, rhythmValues) {
  const track = new MidiWriter.Track();
  const noteArray = [];
  for (let j = 0; j < midiCodeArray.length; j++) {
    const pitch = [midiCodeArray[j]];
    const duration = rhythmValues || 2;
    const note = new MidiWriter.NoteEvent({ pitch, duration });
    noteArray.push(note);
  }
  track.addEvent(noteArray);
  const write = new MidiWriter.Writer([track]);
  const file = write.dataUri();
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

