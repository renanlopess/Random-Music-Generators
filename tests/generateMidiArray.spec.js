const { generateMidiArray, getDownloadLink } = require('../script/generateMidiArray');
const {numToNote} = require('../script/noteUtilities');

// const  = main;

function testName(name) {
  console.log('\n***', name, '***\n');
}

function createNotesFromNums(low, high) {
  let results = [];
  for (let i = low; i <= high; i++) {
    results.push(numToNote(i));
  }
  return results;
}

const notes1 = createNotesFromNums(0, 127);

function testNotes1() {
  testName('testNotes1, test all notes');
  notes1.forEach((note, i) => {
    console.log(i, 'note:', note);
  });
}

function testCreateMidi1() {
  console.log('this should log an error:');
  generateMidiArray('diatonic', 'midiRange', 10, 7, 4, 10);
}

function testCreateMidi2() {
  console.log('this should be a file, quanitty 3');
  // {
  //   tonality = 'diatonic',
  //   pitchRange = '0 127',
  //   midiLength = 10,
  //   intervalJump = 7,
  //   rhythmValues = 4,
  //   midiQuantity = 2
  // }
  const data = generateMidiArray({midiQuantity: 3});
  console.log('\n',data,'\n');
  console.log('length should be 3:', data.length);
}

function testCreateMidi3() {
  console.log('this should be a file, creates defaults');
  console.log(generateMidiArray({}));
}

function testDownload() {
  console.log('this should be a link');
  console.log(getDownloadLink(generateMidiArray('chromatic', '', '10', '7', '4', '10')));
}

function runTests() {
  // testNotes1();

  // testCreateMidi1();
  testCreateMidi2();
  // testCreateMidi3();

  // testDownload()
}

runTests();
