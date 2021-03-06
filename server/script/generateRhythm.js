/* eslint-disable camelcase */

/*
<select id="rhythmTypes">
  <option value="1">8ths</option>
  <option value="2">16ths</option>
  <option value="3" selected>8th Triplets</option>
  <option value="4">16th Triplets</option>
  <option value="5">Mixed</option>
</select>

id: timeSig
  <option value="1">3/4</option>
  <option value="2">4/4</option>
  <option value="3">5/4</option>
  <option value="4">6/4</option>
  <option value="5" selected>7/4</option>
  <option value="6">9/4</option>
  <option value="7">11/4</option>
  <option value="8">12/4</option>
  <option value="9">13/4</option>
  <option value="10">15/4</option>
*/

// ===================
// 3. RANDOM RHYTHMS
// ===================

const RHYTHM_MAP = {
  '1/2': { value: 0.5, midiwriter: 2},
  '1/4': { value: 0.25, midiwriter: 4},
  '3/4': { value: 0.75, midiwriter: 'd2'},
  '4/4': { value: 1, midiwriter: 1},
  '5/4': { value: 1.25, midiwriter: [1, 4]},
  '6/4': { value: 1.5, midiwriter: [1, 2]},
  '7/4': { value: 7 / 4, midiwriter: [1, 'd2']},
  '9/4': { value: 9 / 4, midiwriter: [1, 1, 4]},
  '11/4': { value: 11 / 4, midiwriter: [1, 1, 'd2']},
  '12/4': { value: 3, midiwriter: [1, 1, 1]},
  '13/4': { value: 13 / 4, midiwriter: [1, 1, 1, 4]},
  '15/4': { value: 15 / 4, midiwriter: [1, 1, 1, 'd2']},
  '1/6': { value: 1 / 6, midiwriter: '4t'},
  '1/8': { value: 1 / 8, midiwriter: 8},
  '3/8': { value: 3 / 8, midiwriter: 'd4'},
  '1/12': { value: 1 / 12, midiwriter: '8t'},
  '1/16': { value: 1 / 16, midiwriter: 16},
  '3/16': { value: 3 / 16, midiwriter: 'd8'},
  '1/24': { value: 1 / 24, midiwriter: '16t'},
  '5/24': { value: 5 / 24, midiwriter: [8, '8t']},
  '1/32': { value: 1 / 32, midiwriter: 32},
  '1/64': { value: 1 / 64, midiwriter: 64},
};

const TIME_SIGNATURE_OPTIONS = new Set([
  '3/4',
  '4/4',
  '5/4',
  '6/4',
  '7/4',
  '9/4',
  '11/4',
  '12/4',
  '13/4',
  '15/4'
]);

// 8 - duple8. 16 - duple16. 8t - triplet8. 16t - triple16. mixed - mixed.
const RHYTHM_OPTIONS = {
  8: {
    name: '8th Note',
    values: ['1/2', '1/4', '3/4', '1/8', '3/8']
  },
  16: {
    name: '16th Note',
    values: ['1/2', '1/4', '3/4', '1/8', '3/8', '1/16', '3/16']
  },
  '8t': {
    name: '8th Note Triplet',
    values: ['1/2', '1/4', '3/4', '1/6', '1/12']
  },
  '16t': {
    name: '16th Note Triplet',
    values: ['1/2', '1/4', '1/8', '3/8', '1/12', '1/24', '3/4', '1/6', '5/24']
  },
  mixed: {
    name: 'Mixed',
    values: [
      '1/2',
      '1/4',
      '1/8',
      '3/8',
      '1/12',
      '1/16',
      '1/24',
      '3/4',
      '1/6',
      '3/16',
      '5/24'
    ]
  }
};

// Random choice of element from array
function randomChoice(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

// MAIN
function createRhythms(timeSigString, rhythmTypeString) {
  const timeSigValue = RHYTHM_MAP[timeSigString].value;
  const rhythmTypeSelection = RHYTHM_OPTIONS[rhythmTypeString];
  const noteValues = rhythmTypeSelection.values;

  validateRhythmInputs(timeSigString, rhythmTypeString);
  // this creates an array (list) of up to 200 rhythms, length > 5
  // or prevent timeout
  const now = Date.now();
  const timeout = 500;
  // const rhythmArray = [];
  const rhythmSet = new Set(); //for validation only
  const rhythmArray = [];
  while (Date.now() < now + timeout) {
    if (rhythmSet.size >= 200) {
      break;
    }
    const curRhythm = getRandomRhythmMeasure(noteValues, timeSigString, timeSigValue);
    // console.log({curRhythm, rhythmSet, rhythmArray});
    if (curRhythm.length > 1) {
      const curRhythmString = curRhythm.join(' ');
      // console.log({curRhythmString});
      if (!rhythmSet.has(curRhythmString)) {
        rhythmSet.add(curRhythmString); // ignores duplicates
        rhythmArray.push(curRhythm);
      }
    }
  }
  // return Array.from(rhythmSet);
  return rhythmArray;
}

function getRandomRhythmMeasure(noteValues, timeSigString, timeSigValue) {
  /*
    noteValues: array of rhythm value strings
    timeSigValue: valid time signature (between 3/4 and 15/4 - calculated)

    return string of rhythms, ie: '1/4 1/8 1/8 1/4'
  */
  const noteArray = [];
  let measureCalculation = 0;
  while (timeSigValue - measureCalculation > 0) {
    const randomNoteStr = randomChoice(noteValues); // gets a string
    const randomNoteValue = RHYTHM_MAP[randomNoteStr].value;
    if (isBoringRhythm(timeSigString, randomNoteStr)) {
      continue;
    }
    noteArray.push(randomNoteStr);
    measureCalculation += randomNoteValue;
    if (timeSigValue - measureCalculation === 0) {
      // Perfect rhythm, fits in measure.
      return noteArray;
    }
    if (timeSigValue - measureCalculation < 0) {
      // Imperfect rhythm, over the barline.
      return [];
    }
  }
}

function getRhythmHeading(rhythmArrayLength, rhythmTypeSelection, timeSigString) {
  return `${rhythmArrayLength} Measures of Random ${
    RHYTHM_OPTIONS[rhythmTypeSelection].name
  } Rhythms in ${timeSigString}`;
}

function getRhythmDisplay(rhythmArray, rhythmTypeSelection, timeSigString) {
  // converts array to string output
  const rhythmArrayLength = rhythmArray.length;
  return `${getRhythmHeading(rhythmArrayLength, rhythmTypeSelection, timeSigString)}
Guide to rhythmic values: 1/2 = half note. 1/4 = quarter note. 3/4 = dotted half note. 1/8 = eighth note. 3/8 = dotted quarter note. 1/16 = sixteenth note. 3/16 = dotted 8th note. 1/6 = quarter note triplet (2 tied 8th note triplets). 1/12 = 8th note triplet. 1/24 = 16th note triplet. 5/24 = 8th note tied to an 8th note triplet.
${rhythmArray.join('\n')}`;
}

function validateRhythmInputs(timeSigString, rhythmTypeString) {
  const validTimeSig = TIME_SIGNATURE_OPTIONS.has(timeSigString);
  const validRhythmType = RHYTHM_OPTIONS[rhythmTypeString];
  if (!validTimeSig || !validRhythmType) {
    throw new Error(`Expected ${timeSigString} and ${rhythmTypeString} to be valid.`);
  }
}

function isBoringRhythm(timeSigString, randomNoteStr) {
  const boringRhythmMap = {
    '3/4': new Set(['3/4', '1/2'])
  };
  const timeSigFound = boringRhythmMap[timeSigString];
  if (timeSigFound && timeSigFound.has(randomNoteStr)) {
    return true;
  }
  return false;
}

module.exports = {
  createRhythms,
  getRandomRhythmMeasure,
  getRhythmHeading,
  getRhythmDisplay,
  RHYTHM_OPTIONS,
  RHYTHM_MAP,
  TIME_SIGNATURE_OPTIONS,
  validateRhythmInputs,
  isBoringRhythm
};
