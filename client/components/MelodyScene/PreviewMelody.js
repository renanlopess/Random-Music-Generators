import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Table, Button, Icon, Modal } from 'semantic-ui-react';
import Tone from 'Tone';
import NoteGrid from './NoteGrid';
import TempoSlider from './TempoSlider';

const propTypes = {
  melody: PropTypes.object.isRequired
};

export class PreviewMelody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rhythm: '8n',
      synth: new Tone.Synth().toMaster(),
      sequence: null,
      playing: false,
      progress: -1
    };
  }

  componentDidMount() {
    var synth = this.state.synth;
    synth.volume.value = -6;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ synth }, () => {
      this.togglePlay(this.props.melody);
    });
  }
  componentWillUnmount() {
    this.togglePlay();
  }

  togglePlay = midiData => {
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
          playing: false,
          progress: -1
        },
        () => {
          console.log('modal closed, state:', this.state);
        }
      );
      // synth.volume.value = -80;
      return;
    }
    //pass in an array of events
    this.setState({
      sequence: new Tone.Sequence(
        (time, event) => {
          //the events will be given to the callback with the time they occur
          this.state.synth.triggerAttackRelease(event, this.state.rhythm);
          if (this.state.sequence) {
            this.setState({ progress: this.state.sequence.progress });
            Tone.Transport.bpm.value = this.props.melody.tempo;
          }
        },
        melodyArray,
        this.state.rhythm
      )
    });
    this.setState(
      (prevState, props) => {
        let sequence = prevState.sequence;
        // sequence.loop = 2;
        return { sequence, playing: true };
      },
      () => {
        // seq.loopEnd = '1m';//leave this off
        this.state.sequence.start(0);
        Tone.Transport.start('+0.1');
        console.log('modal open, state:', this.state);
      }
    );
  };

  render() {
    const { sequence, progress } = this.state;
    const { melody } = this.props;
    return (
      <div className="melody-preview-modal">
        {sequence && (
          <label className="melody-preview-modal-progress-label">
            Progress: {progress}
          </label>
        )}

        <NoteGrid progress={progress} />
        <label className="melody-preview-modal-tempo-label">Tempo: {melody.tempo}</label>
        <TempoSlider globalState value={melody.tempo} />
      </div>
    );
  }
}

PreviewMelody.propTypes = propTypes;
// PreviewMelody.defaultProps = defaultProps;

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    melody: state.melody
  };
};

export default connect(mapState)(PreviewMelody);
