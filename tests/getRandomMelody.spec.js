const getRandomMelody = require('../script/getRandomMelody');

function testName(name) {
  console.log('\n***', name, '***\n');
}

function generateSomeMelodies(num, config) {
  let melodies = [];
  for (let i = 0; i < num; i++) {
    melodies.push(getRandomMelody(config));
  }
  return melodies;
}

const mel1 = generateSomeMelodies(3, {});
const mel2 = generateSomeMelodies(3, {
  type: 'chromatic',
  range: '0 127',
  length: '12',
  jump: '7'
});
const mel3 = generateSomeMelodies(3, {range: '90 100'});

function testMel1() {
  testName('testMel1, test default length / inputs');
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
  // testMel1();
  // testMel2();
  testMel3();
}

runTests();
