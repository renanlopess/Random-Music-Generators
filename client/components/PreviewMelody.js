import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon, Modal } from 'semantic-ui-react';
import Tone from 'Tone';

/**
 * COMPONENT
 */

export class PreviewMelody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rhythm: '8n',
      tempo: 80,
      synth: new Tone.Synth().toMaster(),
      sequence: null,
      playing: false
    };
  }

  componentDidMount() {
    // console.log('cdm')
    this.togglePlay(this.props.melody);
  }
  componentWillUnmount() {
    // console.log('c will unmount')
    this.togglePlay();
  }

  togglePlay(midiData) {
    // console.log('toggleplay params: midiData', midiData);
    const melodyArray = midiData ? midiData.pitchNamesWithOctave : [];
    if (!melodyArray.length) {
      this.state.synth.triggerRelease();
      if (this.state.sequence) {
        this.state.sequence.stop();
      }
      Tone.Transport.stop();
      this.setState(
        {
          sequence: null,
          playing: false
        },
        () => {
          console.log('modal closed, state:', this.state);
        }
      );
      // synth.volume.value = -80;
      return;
    }
    // SEQUENCE - have to trigger release on modal close or stop
    var synth = this.state.synth;
    synth.volume.value = -6;

    //pass in an array of events
    let seq = new Tone.Sequence(
      function(time, event) {
        //the events will be given to the callback with the time they occur
        synth.triggerAttackRelease(event, this.state.rhythm);
      },
      melodyArray,
      this.state.rhythm
    );
    //start the seq at the beginning of the Transport's timeline
    seq.start(0);

    //loop the seq 3 times (true for infinite)
    seq.loop = 2;
    this.setState({ sequence: seq, playing: true, synth }, () => {
      // seq.loopEnd = '1m';//leave this off
      Tone.Transport.bpm.value = this.state.tempo;
      Tone.Transport.start('+0.1');
      console.log('modal open, state:', this.state);
    });
    // var seq = new Tone.Sequence(
    //   function(time, event) {
    //     //the events will be given to the callback with the time they occur
    //     synth.triggerAttackRelease(event, this.state.rhythm);
    //   },
    //   melodyArray,
    //   this.state.rhythm
    // );
  }

  render() {
    const { rhythm, tempo, synth, sequence, transport, playing } = this.state;
    // console.log('preview state/props:', this.state, this.props);
    return <div />;
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    melody: state.melody
  };
};

export default connect(mapState)(PreviewMelody);

/*
{createNoteNumbers(midiDataObject)}
{createPitchNames(midiDataObject)}
*/
