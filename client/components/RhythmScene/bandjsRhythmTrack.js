const BandJS = require('../../lib/band.min');

const createRhythmTrack = (timeSig, rhythmArray, tempo) => {
  // parse timeSig and rhythmString. validate tempo
  const [topTime, bottomTime] = timeSig.split('/');
  tempo = +tempo > 280 ? 280 : +tempo;
  tempo = tempo < 45 ? 45 : tempo;

  const conductor = new BandJS('equalTemperament', 'fractions');
  conductor.setTimeSignature(+topTime, +bottomTime);
  conductor.setTempo(tempo);

  /**
   * 'sin', 'square', 'sawtooth', 'triangle'
   */
  const piano = conductor.createInstrument('sawtooth', 'oscillators');
  const drum = conductor.createInstrument('brown', 'noises');
  const highTime = conductor.createInstrument('sine', 'oscillators');
  piano.setVolume(20);
  highTime.setVolume(5);
  drum.setVolume(50);

  const tie = false;

  rhythmArray.forEach(rhythm => {
    piano.note(rhythm, 'C3, C4', tie);
  });

  piano.repeat(1);

  for (let i = 0; i < +topTime; i++) {
    if (i === 0) {
      highTime.note('1/16', 'C8');
      drum.note('1/16');
    } else {
      // highTime.note('1/16', 'C7');
      highTime.rest('1/16');
      // drum.rest('1/16');
      drum.note('1/16');
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
