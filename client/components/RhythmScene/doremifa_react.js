const BandJS = require('../../lib/band.min');

const conductor = new BandJS('equalTemperament', 'fractions');

conductor.setTimeSignature(4, 4);

conductor.setTempo(120);

const piano = conductor.createInstrument('triangle');

piano.note('1/4', 'C4');
piano.note('1/4', 'D4');
piano.note('1/4', 'E4');
piano.note('1/2', 'G4');
piano.note('3/4', 'F4');

piano.repeat(1);

const player = conductor.finish();

// player.play();

module.exports = player;

/*
const exampleSongJson = {
  timeSignature: [4, 4],
  tempo: 100,
  instruments: {
      rightHand: {
          name: 'square',
          pack: 'oscillators'
      },
      leftHand: {
          name: 'sawtooth',
          pack: 'oscillators'
      }
  },
  notes: {
      // Shorthand notation
      rightHand: [
          'quarter|E5, F#4|tie',
          'quarter|rest',
          'quarter|E5, F#4',
          'quarter|rest'
      ],
      // More verbose notation
      leftHand: [
          {
              type: 'note',
              pitch: 'D3',
              rhythm: 'quarter'
          }
      ]
  }
}
*/
