import Tone from 'Tone';

const rhythm = '4n';
const tempo = 160;

export default function togglePlay(modalOpen, midiDataObj) {
  const melodyArray = midiDataObj ? midiDataObj.pitchNamesWithOctave : [];
  // SEQUENCE - have to trigger release on modal close or stop
  var synth = new Tone.Synth().toMaster();
  synth.volume.value = -6;

  //pass in an array of events
  var part = new Tone.Sequence(
    function(time, event) {
      //the events will be given to the callback with the time they occur
      synth.triggerAttackRelease(event);
    },
    melodyArray,
    rhythm
  );
  if (modalOpen) {
    //start the part at the beginning of the Transport's timeline
    part.start(0);

    //loop the part 3 times (true for infinite)
    part.loop = 2;
    // part.loopEnd = '1m';//leave this off

    Tone.Transport.bpm.value = tempo;
    Tone.Transport.start('+0.1');
  } else {
    synth.triggerRelease();
    Tone.Transport.stop();
    // part.stop();
    // synth.volume.value = -80;
  }
}
