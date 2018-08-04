import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Select, Button, Icon } from 'semantic-ui-react';
// import MelodyResult from './MelodyResult';
import { getMelodies } from '../../store/melodies';
// import { generateMidiArray } from '../../../server/script/generateMidiArray';
import InfoPopup from './InfoPopup';
import RhythmResult from './RhythmResult';
import {
  RHYTHM_OPTIONS,
  TIME_SIGNATURE_OPTIONS,
  createRhythms,
  getRhythmHeading
} from '../../../server/script/generateRhythm';

// import player from './doremifa_react';
import createRhythmTrack from './bandjsRhythmTrack';

const testMeasure = '3/8 1/8 1/12 1/24 3/8 1/8 1/24 3/8 5/24';
// const testMeasure = '1/16 1/16 1/16 3/16 3/8 1/4';
const testTimeSig = '7/4';

const INITIAL_FORM_VALUES = {
  rhythmType: '8',
  timeSig: '3/4'
};

const rhythmTypeOptions = Object.keys(RHYTHM_OPTIONS).map(item => {
  const rhythmValueObject = RHYTHM_OPTIONS[item];
  return { key: item, text: rhythmValueObject.name, value: item };
});

const timeSigOptions = Array.from(TIME_SIGNATURE_OPTIONS).map(item => {
  return { key: item, text: item, value: item };
});

export class Rhythm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_FORM_VALUES,
      submittedTimeSig: '',
      submittedRhythmType: '',
      submittedRhythmArray: []
    };
    this.player = null;
  }

  handleChange = (evt, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { timeSig, rhythmType } = this.state;
    const rhythmArray = createRhythms(timeSig, rhythmType);
    // console.log(rhythmArray)
    this.setState({
      submittedRhythmArray: rhythmArray,
      submittedTimeSig: timeSig,
      submittedRhythmType: rhythmType
    });
  };

  playRhythm = rhythmString => {
    // console.log('rhythm player', this.player);
    this.stopPlayer();
    const { timeSig } = this.state;
    this.player = createRhythmTrack(timeSig, rhythmString);
    setTimeout(() => {
      // this.loopPlayer();
      this.player.play();
    }, 250);
  };

  pausePlayer = () => {
    if (this.player) {
      this.player.pause();
    }
  };

  stopPlayer = () => {
    if (this.player) {
      this.player.stop();
    }
  };

  loopPlayer = () => {
    if (this.player) {
      this.player.loop(true);
    }
  };

  render() {
    // const { email } = this.props;
    // console.log('melody props', this.props, this.state);
    // console.log('rhythm props', this.props, this.state, this.player);
    const {
      rhythmType,
      timeSig,
      submittedRhythmType,
      submittedTimeSig,
      submittedRhythmArray
    } = this.state;

    return (
      <div className="rhythm-container">
        <Form onSubmit={this.handleSubmit} className="rhythm-main-form">
          <Form.Group>
            <Form.Field
              control={Select}
              label="Time Signature"
              options={timeSigOptions}
              name="timeSig"
              value={timeSig}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Select}
              label="Rhythm Type"
              options={rhythmTypeOptions}
              name="rhythmType"
              value={rhythmType}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button color="purple" content="Submit" id="main-submit" />
        </Form>
        {submittedRhythmArray.length && (
          <div className="rhythm-output">
            <h1>
              {getRhythmHeading(
                submittedRhythmArray.length,
                submittedRhythmType,
                submittedTimeSig
              )}
              <InfoPopup />
            </h1>
            <div>
              <ol>
                {submittedRhythmArray.map((rhythm, i) => {
                  return (
                    <li key={i}>
                      <RhythmResult rhythmMeasure={rhythm} />
                      {this.player && this.player.playing ? (
                        <Button
                          icon
                          labelPosition="left"
                          color="blue"
                          onClick={() => {
                            this.stopPlayer();
                          }}
                        >
                          <Icon name="stop" />
                        </Button>
                      ) : (
                        <Button
                          icon
                          labelPosition="left"
                          color="blue"
                          onClick={() => {
                            this.playRhythm(rhythm);
                          }}
                        >
                          <Icon name="play" />
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user,
    melodies: state.melodies
  };
};

const mapDispatch = {
  getMelodies
};

export default connect(mapState, mapDispatch)(Rhythm);

/*
      <strong>state:</strong>
      <pre>{JSON.stringify(this.state, null, 2)}</pre>
      <pre>{JSON.stringify(this.props, null, 2)}</pre>

*/
