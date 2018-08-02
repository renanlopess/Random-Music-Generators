const BandJS = require('../../lib/band.min');

const createRhythmTrack = (timeSig, rhythmString) => {
  // parse timeSig and rhythmString
  const [topTime, bottomTime] = timeSig.split('/');
  const rhythmArray = rhythmString.split(' ');

  const conductor = new BandJS('equalTemperament', 'fractions');
  conductor.setTimeSignature(+topTime, +bottomTime);
  conductor.setTempo(60);
  const piano = conductor.createInstrument('square', 'oscillators');
  const drum = conductor.createInstrument('white', 'noises');
  const highTime = conductor.createInstrument('sine', 'oscillators');
  piano.setVolume(10);
  highTime.setVolume(8);
  drum.setVolume(4);

  const tie = false;

  rhythmArray.forEach(rhythm => {
    piano.note(rhythm, 'C4, C5', tie);
  });

  piano.repeat(1);

  for (let i = 0; i < +topTime; i++) {
    if (i === 0) {
      highTime.note('1/16', 'C7, G7, C8');
      drum.note('1/16');
    } else {
      highTime.note('1/16', 'C7');
      drum.rest('1/16');
    }
    highTime.rest('3/16');
    drum.rest('3/16');
  }

  highTime.repeat(1);
  drum.repeat(1);

  const player = conductor.finish();
  return player;
};

module.exports = createRhythmTrack;

// to use:
// player.play()
