function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const pitchArray = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const pitchMap = pitchArray.reduce((pMap, pitch, idx) => {
  pMap[pitch] = idx;
  return pMap;
}, {});

// pitchMap:
// {
//   C: 0,
//   'C#': 1,
//   Db: 1,
//   D: 2,
//   'D#': 3,
//   Eb: 3,
//   E: 4,
//   F: 5,
//   'F#': 6,
//   Gb: 6,
//   G: 7,
//   'G#': 8,
//   Ab: 8,
//   A: 9,
//   'A#': 10,
//   Bb: 10,
//   B: 11
// }

function numToNote(midiNum) {
  return pitchArray[Math.floor(midiNum % 12)] + (Math.floor(midiNum / 12) - 1);
}

module.exports = {
  getRandomIntInclusive,
  numToNote,
  pitchArray,
  pitchMap
};

