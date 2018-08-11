const MidiWriter = require('midi-writer-js');
const createRandomMelody = require('./createRandomMelody');
const { numToNote } = require('./noteUtilities');
const { RHYTHM_MAP } = require('./generateRhythm');

// called when 'generate' is clicked
/**
 * @param {} configuration for random melody
 * returns an array of objects:
 * {
 *  midiCodeArray: array
 *  pitchNamesWithOctave: array
 *  midiFile: binary
 * }
 */
function generateMidiArray({
  tonality = 'diatonic', // 'diatonic' or 'chromatic'
  pitchRange = '0 127', // 2 space separated numbers
  midiLength = 10, // number of notes (limited)
  intervalJump = 7, // maximum distance between notes
  rhythmValues = 4, // see MidiWriter map
  midiQuantity = 2 // number of midis
} = {}) {
  const results = [];
  for (let i = 0; i < midiQuantity; i++) {
    const midiCodeArray = createRandomMelody({
      tonality,
      pitchRange,
      midiLength,
      intervalJump
    });
    const pitchNamesWithOctave = midiCodeArray.map(num => numToNote(num));
    const midiFile = createMidiFile(midiCodeArray, rhythmValues);
    results.push({
      midiCodeArray,
      pitchNamesWithOctave,
      midiFile
    });
  }
  return results;
}

/*
Melody:
  midiCodeArray - determines length
  rhythmValues - only one value
*/
function createMidiFile(midiCodeArray, rhythmValues) {
  const track = new MidiWriter.Track();
  const noteArray = [];
  for (let i = 0; i < midiCodeArray.length; i++) {
    const pitch = [midiCodeArray[i]];
    const duration = rhythmValues || 2;
    const note = new MidiWriter.NoteEvent({ pitch, duration });
    noteArray.push(note);
  }
  track.addEvent(noteArray);
  const write = new MidiWriter.Writer([track]);
  const file = write.dataUri();
  return file;
}

/*
Rhythm:
  rhythmMeasureArray - determines length and rhythm values
  (only one pitch needed)
  tempo
  timeSig
*/
function createRhythmMidiFile(rhythmMeasureArray, tempo, timeSig) {
  const [ numerator, denominator ] = timeSig.split('/');
  const track = new MidiWriter.Track();
  track.setTempo(tempo);
  track.setTimeSignature(numerator, denominator);
  const noteArray = [];
  for (let i = 0; i < rhythmMeasureArray.length; i++) {
    const pitch = ['C4'];
    // const duration = 2;
    const duration = RHYTHM_MAP[rhythmMeasureArray[i]].midiwriter;
    const note = new MidiWriter.NoteEvent({ pitch, duration });
    noteArray.push(note);
  }
  track.addEvent(noteArray);
  const write = new MidiWriter.Writer([track]);
  const file = write.dataUri();
  return file;
}

module.exports = {
  generateMidiArray,
  createRhythmMidiFile
};
