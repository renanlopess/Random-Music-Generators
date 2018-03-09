const { createMidi, downloadLink } = require('../script/createMidi');
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
  createMidi('diatonic', 'midiRange', 10, 7, 4, 10);
}

function testCreateMidi2() {
  console.log('this should be a file');
  console.log(createMidi('chromatic', '', '10', '7','4', '10'));
}

function testCreateMidi3() {
  console.log('this should be a file, creates defaults');
  console.log(createMidi());
}

function testDownload() {
  console.log('this should be a link')
  console.log(downloadLink(createMidi('chromatic', '', '10', '7','4', '10')))
}

function runTests() {
  // testNotes1();

  // testCreateMidi1();
  // testCreateMidi2();
  testCreateMidi3();

  testDownload()
}

runTests();
