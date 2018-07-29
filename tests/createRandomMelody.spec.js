const createRandomMelody = require('../server/script/createRandomMelody');

function testName(name) {
  console.log('\n***', name, '***\n');
}

function generateSomeMelodies(num, config) {
  let melodies = [];
  for (let i = 0; i < num; i++) {
    melodies.push(createRandomMelody(config));
  }
  return melodies;
}

const mel1 = generateSomeMelodies(3, {});
const mel2 = generateSomeMelodies(3, {
  tonality: 'chromatic',
  pitchRange: '0 127',
  midiLength: '12',
  intervalJump: '7'
});
const mel3 = generateSomeMelodies(3, {pitchRange: '90 100'});

function testMel1() {
  testName('testMel1, test default length / inputs');
  console.log('mel1', mel1);
  mel1.forEach(melNum => {
    if (melNum.length !== 10) {
      console.error('err: expected length 10 got:', melNum.length);
    } else {
      console.log('length 10 passed!');
    }
    if (melNum < 0 || melNum > 127) {
      console.error('err: melody out of limits 0,127 got:', melNum);
    } else {
      console.log('melody limits passed!');
    }
  });
}

function testMel2() {
  testName('testMel2 - config with strings');
  console.log('mel2', mel2);
  mel2.forEach(melNum => {
    if (melNum.length !== 12) {
      console.error('err: expected length 12 got:', melNum.length);
    } else {
      console.log('length 12 passed!');
    }
    if (melNum < 0 || melNum > 127) {
      console.error('err: melody out of limits 0,127 got:', melNum);
    } else {
      console.log('melody limits passed!');
    }
  });
}

function testMel3() {
  testName('testMel3 - partial config - range between 90 and 100 inclusive');
  console.log('mel3', mel3);
  mel3.forEach(melNum => {
    if (melNum.length !== 10) {
      console.error('err: expected length 10 got:', melNum.length);
    } else {
      console.log('length 10 passed!');
    }
    if (melNum < 90 || melNum > 100) {
      console.error('err: melody out of limits 90,100 got:', melNum);
    } else {
      console.log('melody limits passed!');
    }
  });
}

function runTests() {
  testMel1();
  testMel2();
  testMel3();
}

runTests();
