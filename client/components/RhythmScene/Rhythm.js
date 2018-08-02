import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Select } from 'semantic-ui-react';
// import MelodyResult from './MelodyResult';
import { getMelodies } from '../../store/melodies';
// import { generateMidiArray } from '../../../server/script/generateMidiArray';
import InfoPopup from './InfoPopup';
import { RHYTHM_OPTIONS, TIME_SIGNATURE_OPTIONS, createRhythms, getRhythmHeading } from '../../../server/script/generateRhythm';

// import player from './doremifa_react';
import createRhythmTrack from './bandjsRhythmTrack';

const testMeasure = '3/8 1/8 1/12 1/24 3/8 1/8 1/24 3/8 5/24';
// const testMeasure = '1/16 1/16 1/16 3/16 3/8 1/4';
const testTimeSig = '7/4';

const INITIAL_FORM_VALUES = {
  rhythmType: 'mixed',
  timeSig: '7/4'
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
    this.state = { ...INITIAL_FORM_VALUES, submitted: false, rhythmArray: [], playing: null };
  }

  handleChange = (evt, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { timeSig, rhythmType } = this.state;
    const rhythmArray = createRhythms(timeSig, rhythmType);
    // console.log(rhythmArray)
    this.setState({ submitted: true, rhythmArray });
  }

  playRhythm = (rhythmString) => {
    const { timeSig, playing } = this.state;
    if (playing) {
      playing.stop();// why isn't it stopping?
    }
    const player = createRhythmTrack(timeSig, rhythmString);
    this.setState({playing: player});
    player.play();
  }

  render() {
    // const { email } = this.props;
    // console.log('melody props', this.props, this.state);
    const { rhythmType, timeSig, submitted, rhythmArray } = this.state;

    return (
      <div className="rhythm-container">
        <Form onSubmit={this.handleSubmit} className="rhythm-main-form">
          <Form.Group>
            <Form.Field control={Select} label="Time Signature" options={timeSigOptions} name="timeSig" value={timeSig} onChange={this.handleChange} />
            <Form.Field control={Select} label="Rhythm Type" options={rhythmTypeOptions} name="rhythmType" value={rhythmType} onChange={this.handleChange} />
          </Form.Group>
          <Form.Button color="purple" content="Submit" id="main-submit" />
        </Form>
        {
          submitted && (
            <div>
              <h1>
                {getRhythmHeading(rhythmArray.length, rhythmType, timeSig)}
                <InfoPopup />
              </h1>
              <ol>
                {rhythmArray.map((rhythm, i) => <li key={i}>{rhythm}<span onClick={() => {this.playRhythm(rhythm);}}>~~PLAY~~</span></li>)}
              </ol>
            </div>
          )
        }
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
