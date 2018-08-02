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
  '1/2': 0.5,
  '1/4': 0.25,
  '3/4': 0.75,
  '4/4': 1,
  '5/4': 1.25,
  '6/4': 1.5,
  '7/4': 7 / 4,
  '9/4': 9 / 4,
  '11/4': 11 / 4,
  '12/4': 3,
  '13/4': 13 / 4,
  '15/4': 15 / 4,
  '1/6': 1 / 6,
  '1/8': 1 / 8,
  '3/8': 3 / 8,
  '1/12': 1 / 12,
  '1/16': 1 / 16,
  '3/16': 3 / 16,
  '1/24': 1 / 24,
  '5/24': 5 / 24,
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
  '15/4',
]);

// 8 - duple8. 16 - duple16. 8t - triplet8. 16t - triple16. mixed - mixed.
const RHYTHM_OPTIONS = {
  8: {
    name: '8th Note',
    values: [
    '1/2',
    '1/4',
    '3/4',
    '1/8',
    '3/8',
  ]},
  16: {
    name: '16th Note',
    values: [
    '1/2',
    '1/4',
    '3/4',
    '1/8',
    '3/8',
    '1/16',
    '3/16',
  ]},
  '8t': {
    name: '8th Note Triplet',
    values: [
    '1/2',
    '1/4',
    '3/4',
    '1/6',
    '1/12',
  ]},
  '16t': {
    name: '16th Note Triplet',
    values: [
    '1/2',
    '1/4',
    '1/8',
    '3/8',
    '1/12',
    '1/24',
    '3/4',
    '1/6',
    '5/24',
  ]},
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
  ]}
};

// Random choice of element from array
function randomChoice(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

// MAIN
function createRhythms(timeSigString, rhythmTypeString) {
  const timeSigValue = RHYTHM_MAP[timeSigString];
  const rhythmTypeSelection = RHYTHM_OPTIONS[rhythmTypeString];
  const noteValues = rhythmTypeSelection.values;

  validateRhythmInputs(timeSigString, rhythmTypeString);
  // this creates an array (list) of up to 200 rhythms, length > 5
  // or prevent timeout
  const now = Date.now();
  const timeout = 500;
  // const rhythmArray = [];
  const rhythmSet = new Set();
  while (Date.now() < now + timeout) {
    if (rhythmSet.size >= 200) {
      break;
    }
    const curRhythm = getRandomRhythmMeasure(noteValues, timeSigString, timeSigValue);
    if (curRhythm.length > 5) {
      rhythmSet.add(curRhythm);// ignores duplicates
    }
  }
  return Array.from(rhythmSet);
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
    const randomNoteValue = RHYTHM_MAP[randomNoteStr];
    if (isBoringRhythm(timeSigString, randomNoteStr)) {
      continue;
    }
    noteArray.push(randomNoteStr);
    measureCalculation += randomNoteValue;
    if ((timeSigValue - measureCalculation) === 0) // Perfect rhythm, fits in measure.
    {
      return noteArray.join(' ');
    }
    if ((timeSigValue - measureCalculation) < 0) // Imperfect rhythm, over the barline.
    {
      return '';
    }
  }
}

function getRhythmHeading(rhythmArrayLength, rhythmTypeSelection, timeSigString) {
  return `${rhythmArrayLength} Measures of Random ${RHYTHM_OPTIONS[rhythmTypeSelection].name} Rhythms in ${timeSigString}`
}

function getRhythmDisplay(rhythmArray, rhythmTypeSelection, timeSigString) {
  // converts array to string output
  const rhythmArrayLength = rhythmArray.length
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
