const MidiWriter = require('midi-writer-js');
const getRandomMelody = require('./getRandomMelody');

/*eslint-disable complexity*/
// called when 'generate' is clicked
function createMidi({
  tonality = 'diatonic',
  midiRange = null,
  midiLength = 10,
  midiJump = 7,
  lengthValues = 4,
  midiQTY = 1
} = {}) {
  // let result = '';

  let melodies = +midiQTY || 1;
  for (let i = 0; i < melodies; i++) {
    let type = tonality;
    let range = midiRange || '';
    let length = midiLength || 10;
    let jump = midiJump || 12;
    let randomNotes = getRandomMelody({ type, range, length, jump });

    let track = new MidiWriter.Track();

    let noteArray = [];

    for (let j = 0; j < randomNotes.length; j++) {
      let pitch = [randomNotes[j]];
      let duration = lengthValues.value || 2;
      let note = new MidiWriter.NoteEvent({ pitch, duration });
      noteArray.push(note);
    }

    track.addEvent(noteArray);

    let write = new MidiWriter.Writer([track]);
    let file = write.dataUri();
    return file;

    // result += `<div style="position: relative" class="resultRow">`;
    // result += `${randomNotes.map(m => `<span>${m}</span>`).join(' ')}`;
    // result += `<br>`;
    // result += `${randomNotes
    //   .map(m => `<span>${numToNote(m)}</span>`)
    //   .join(' ')}`;

    // result += `<a class="download" title="Download" href="${file}">
    //                 <i class="fa fa-music fa-lg" aria-hidden="true"></i>
    //               </a>`;

    // result += `</div>`;
  }

  // results.innerHTML = result;
}

function downloadLink(url) {
  return `<a class="download" title="Download" href="${url}">
          <i class="fa fa-music fa-lg" aria-hidden="true"></i>
          </a>`;
}

// let tonalityOptions = document.getElementById('tonalityOptions');
// let midiRange = document.getElementById('midiRange');
// let midiLength = document.getElementById('midiLength');
// let midiJump = document.getElementById('midiJump');
// let lengthValues = document.getElementById('lengthValues');
// let midiQTY = document.getElementById('midiQTY');
// let generate = document.getElementById('generate');
// let results = document.getElementById('results');

// generate.addEventListener('click', () => createMidi());

module.exports = {
  createMidi,
  downloadLink
};

