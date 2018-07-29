/* global describe beforeEach it */

// import {expect} from 'chai';
const { expect } = require('chai');
// import React from 'react';
// import enzyme, {shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
const { createRhythms, randomRhythmMeasure, getRhythmDisplay, RHYTHM_MAP, TIME_SIGNATURE_OPTIONS } = require('../client/components/RhythmScene/generateRhythm');

// const adapter = new Adapter();
// enzyme.configure({adapter});

const TIME_SIGNATURE_ARRAY = Array.from(TIME_SIGNATURE_OPTIONS);

const doRhythmTests = (timeSigString, rhythmTypeString) => {
  console.log(timeSigString, rhythmTypeString);
  for (let i = 0; i < 5; i++) {
    const rhythms = createRhythms(timeSigString, rhythmTypeString);
    console.log(rhythms.length, rhythms.slice(0, 2));
    expect(rhythms.length > 0).to.equal(true);
  }
};
describe('generateRhythm', () => {
  // beforeEach(() => {
  //   userHome = shallow(<UserHome email={'cody@email.com'} />);
  // });

  /*
  it('gets the timeout rhythms for createRhythms', () => {
    // this test takes a while to run
    TIME_SIGNATURE_ARRAY.forEach(timeSig => {
      doRhythmTests(timeSig, 8);
    });
  }).timeout(0);
  */

  it('createRhythms is good', () => {
    const rhythms = createRhythms('3/4', '8');// only 13
    console.log(rhythms.length, rhythms);
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
});
