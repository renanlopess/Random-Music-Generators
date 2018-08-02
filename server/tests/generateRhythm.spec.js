/* global describe beforeEach it */

// import {expect} from 'chai';
const { expect } = require('chai');
// import React from 'react';
// import enzyme, {shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
const { createRhythms, getRandomRhythmMeasure, getRhythmDisplay, RHYTHM_MAP, TIME_SIGNATURE_OPTIONS, validateRhythmInputs, isBoringRhythm } = require('../script/generateRhythm');

// const adapter = new Adapter();
// enzyme.configure({adapter});

const TIME_SIGNATURE_ARRAY = Array.from(TIME_SIGNATURE_OPTIONS);

const doRhythmTests = (timeSigString, rhythmTypeString) => {
  // console.log(timeSigString, rhythmTypeString);
  for (let i = 0; i < 5; i++) {
    const rhythms = createRhythms(timeSigString, rhythmTypeString);
    // console.log(rhythms.length, rhythms.slice(0, 2));
    expect(rhythms.length > 0).to.equal(true);
  }
};

const doMeasureTests = (rhythmChoices, timeSigString, timeSigValue) => {
  const rhythmChoicesSet = new Set(rhythmChoices);
  const randMeasure = getRandomRhythmMeasure(rhythmChoices, timeSigString, timeSigValue);
  expect(typeof randMeasure === 'string').to.equal(true);
  expect(randMeasure.length > 2).to.equal(true);
  randMeasure.split(' ').forEach(note => {
    expect(rhythmChoicesSet.has(note)).to.equal(true);
  });
};

describe('generateRhythm', () => {
  // beforeEach(() => {
  //   userHome = shallow(<UserHome email={'cody@email.com'} />);
  // });

  it('gets all the rhythms for createRhythms before timeout', () => {
    // this test takes a while to run
    const rhythms34 = createRhythms('3/4', '8');// 24
    // console.log(rhythms.length, rhythms);
    expect(rhythms34.length).to.equal(24);
    const rhythms44 = createRhythms('4/4', '8');// 113
    // console.log(rhythms.length, rhythms);
    expect(rhythms44.length).to.be.within(112, 113);
    TIME_SIGNATURE_ARRAY.forEach(timeSig => {
      // doRhythmTests(timeSig, 8);
    });
  }).timeout(0);

  it('createRhythms is good', () => {
    doRhythmTests('4/4', '16');
    doRhythmTests('5/4', '8t');
    doRhythmTests('6/4', '16t');
    doRhythmTests('7/4', 'mixed');
    doRhythmTests('12/4', 'mixed');
  });

  it('does the RHYTHM MAP right', () => {
    const keys = Object.keys(RHYTHM_MAP);
    keys.forEach(rhythm => {
      // eslint-disable-next-line no-eval
      expect(eval(rhythm)).to.equal(RHYTHM_MAP[rhythm]);
    });
  });

  it('does isBoringRhythm right', () => {
    expect(isBoringRhythm('3/4', '3/4')).to.equal(true);
    expect(isBoringRhythm('3/4', '1/2')).to.equal(true);
    expect(isBoringRhythm('3/4', '1/4')).to.equal(false);
    expect(isBoringRhythm('4/4', '1/4')).to.equal(false);
    expect(isBoringRhythm('4/4', '3/4')).to.equal(false);
  });

  it('does validateInputs right', () => {
    expect(validateRhythmInputs('4/4', '16')).to.equal(undefined);
    expect(validateRhythmInputs('5/4', '8t')).to.equal(undefined);
    expect(validateRhythmInputs('6/4', '16t')).to.equal(undefined);
    expect(validateRhythmInputs('7/4', 'mixed')).to.equal(undefined);
    expect(validateRhythmInputs('12/4', 'mixed')).to.equal(undefined);
    expect(() => validateRhythmInputs('3/4', '9')).to.throw();
    expect(() => validateRhythmInputs('8/4', '8t')).to.throw();
    expect(() => validateRhythmInputs('10/4', 'mixed')).to.throw();
    expect(() => validateRhythmInputs('5/4', 'MIXED')).to.throw();
    expect(() => validateRhythmInputs('6/8', '8')).to.throw();
  });

  it('does randomRhythmMeasure right', () => {
    const toTest = [
      {
        rhythmChoices: ['1/2', '1/4'],
        timeSigString: '3/4',
        timeSigValue: 3 / 4
      }
    ];
    toTest.forEach(item => {
      doMeasureTests(item.rhythmChoices, item.timeSigString, item.timeSigValue);
    });
  });
  it('does getRhythmDisplay right', () => {
    const toTest = [
      {
        rhythmType: '16',
        timeSigString: '4/4',
        message: '10 Measures of Random 16th Note Rhythms in 4/4'
      },
      {
        rhythmType: '16t',
        timeSigString: '4/4',
        message: '10 Measures of Random 16th Note Triplet Rhythms in 4/4'
      },
      {
        rhythmType: 'mixed',
        timeSigString: '5/4',
        message: '10 Measures of Random Mixed Rhythms in 5/4'
      }
    ];
    toTest.forEach(item => {
      const rhythmArray = createRhythms(item.timeSigString, item.rhythmType);
      const display = getRhythmDisplay(rhythmArray.slice(0, 10), item.rhythmType, item.timeSigString);
      // console.log(display)
      expect(display.includes(item.message)).to.equal(true);
      expect(display.includes(rhythmArray[0])).to.equal(true);
    });
  });
});
