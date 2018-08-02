const { getRandomIntInclusive, pitchMap } = require('./noteUtilities');

/*eslint-disable complexity*/
// Arguments all optional
// Returns melody as array of midi codes. ex. [0, 30, 127]
function createRandomMelody({
  tonality = 'diatonic', // diatonic or chromatic.
  pitchRange = '0 127', // Any range string. Space as seperators.
  midiLength = 10, // How many notes
  intervalJump = 12 // Biggest difference between notes
} = {}) {
  // If no object passed all defaults used

  // Error checking
  tonality = tonality.toLowerCase();
  if (tonality !== 'diatonic' && tonality !== 'chromatic') {
    console.log('Invalid tonality passed. You are getting Diatonic');
    tonality = 'diatonic';
  }

  midiLength = Math.floor(Number(midiLength));

  if (!Number(midiLength) || midiLength < 1) {
    console.log('Invalid midiLength. You are getting 10 notes.');
    midiLength = 10;
  }

  pitchRange = getMidiRange(pitchRange); // returns range object with min and max properties
  // End Error Checking

  let diatonicScaleSteps = [0, 2, 4, 5, 7, 9, 11];
  let result = [];
  let lastNote = getRandomIntInclusive(pitchRange.min, pitchRange.max); // So we can decide about repetition. Unused atm.
  let currentNote = lastNote;

  // Helper Functions
  // Does remainder of note / 12 indicate that its a whole note?
  function isInScale() {
    if (tonality !== 'diatonic') {
      return true;
    } // We dont care
    return diatonicScaleSteps.includes(Math.floor(currentNote % 12)); // We do care
  }

  // To allow easy range checking
  function currentNoteInRange() {
    return currentNote >= pitchRange.min && currentNote <= pitchRange.max;
  }
  while (result.length < midiLength) {
    let curMin =
      currentNote - intervalJump < 0 ? 0 : currentNote - intervalJump; //    0 is hard min
    let curMax =
      currentNote + intervalJump > 127 ? 127 : currentNote + intervalJump; //  127 is hard max

    // Roll until we get a number in range
    // If tonality is diatonic it also rolls until its a whole note number.
    do {
      currentNote = getRandomIntInclusive(curMin, curMax);
    } while (!currentNoteInRange() || !isInScale());

    lastNote = currentNote;
    result.push(currentNote);
  }

  return result;
}

// Takes string. Works out Range. Can mix and match formats and orders
// "30 40", "C0 50", "C-1 10", "G3 G5", "G3 79", "30 10", "30 40 C5" all valid
function getMidiRange(pitchRange = '') {
  if (typeof pitchRange !== 'string' || pitchRange === '') {
    return { min: 0, max: 127 }; // No (or invalid) input
  }
  let inputs = pitchRange
    .split(' ') // Split input on spaces
    .map(input => {
      // Map inputs to note numbers
      if (Number.isInteger(Number(input))) {
        // If input is a whole number
        return Number(input);
      } else {
        // Note String
        let note = input.match(/(?:(?!\d|-).)*/gi)[0].toUpperCase(); // Grab Note part. Thank you https://regex101.com
        let octave = Number(input.match(/[-]*\d/g)); // Grab number from string. Potentially negative
        if (pitchMap[note]) {
          // Passed in note exists
          return pitchMap[note] + 12 * (octave + 1); // Return note number
        } else {
          console.log('Invalid Range Value Passed - ', input);
          return 'Invalid';
        }
      }
    })
    .filter(input => input !== 'Invalid'); // Throw away any invalid input

  return { min: Math.min(...inputs), max: Math.max(...inputs) };
}

module.exports = createRandomMelody;
