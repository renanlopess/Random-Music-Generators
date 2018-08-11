import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Select } from 'semantic-ui-react';
import MelodyResult from './MelodyResult';
import { getMelodies } from '../../store/melodies';
import { generateMidiArray } from '../../../server/script/generateMidiArray';

const propTypes = {
  getMelodies: PropTypes.func.isRequired
};

const INITIAL_FORM_VALUES = {
  tonality: 'diatonic',
  pitchRange: 'G3 G5',
  intervalJump: 7,
  rhythmValues: 4,
  midiLength: 10,
  midiQuantity: 2
};

const tonalityOptions = [
  { key: 'diatonic', text: 'Diatonic', value: 'diatonic' },
  { key: 'chromatic', text: 'Chromatic', value: 'chromatic' }
];

const lengthValueOptions = [
  { key: 1, text: 'Whole Note (4 beats)', value: 1 },
  { key: 2, text: 'Half Note (2 beats)', value: 2 },
  { key: 4, text: 'Quarter Note (1 beat)', value: 4 },
  { key: 6, text: 'Quarter Note Triplet (2/3 beat)', value: 6 },
  { key: 8, text: 'Eighth Note (1/2 beat)', value: 8 },
  { key: 12, text: 'Eighth note Triplet (1/3 beat)', value: 12 },
  { key: 16, text: 'Sixteenth Note (1/4 beat)', value: 16 },
  { key: 24, text: 'Sixteenth Note Triplet (1/6 beat)', value: 24 },
  { key: 32, text: 'Thirty-second Note (1/8 beat)', value: 32 },
  { key: 64, text: 'Sixty-fourth Note (1/16 beat)', value: 64 }
];

export class Melody extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_FORM_VALUES };
  }

  handleChange = (evt, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const midiArray = generateMidiArray(this.state);
    this.props.getMelodies(midiArray);
  };

  render() {
    // const { email } = this.props;
    // console.log('melody props', this.props, this.state);
    const {
      tonality,
      pitchRange,
      intervalJump,
      rhythmValues,
      midiLength,
      midiQuantity
    } = this.state;

    return (
      <div className="melody-main-wrapper">
        <Form onSubmit={this.handleSubmit} className="melody-main-form">
          <Form.Group>
            <Form.Field
              control={Select}
              label="Tonality Options"
              options={tonalityOptions}
              name="tonality"
              value={tonality}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Select}
              label="Note Durations"
              options={lengthValueOptions}
              name="rhythmValues"
              value={rhythmValues}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Note Range"
              name="pitchRange"
              placeholder="G3 G5"
              value={pitchRange}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Max Jump"
              name="intervalJump"
              value={intervalJump}
              placeholder="Min: 0, Max: 127"
              onChange={this.handleChange}
            />
            <Form.Input
              type="number"
              label="No of Notes"
              name="midiLength"
              value={midiLength}
              placeholder="Min: 1, Max: 50"
              min={1}
              max={50}
              onChange={this.handleChange}
            />
            <Form.Input
              type="number"
              label="No of Melodies"
              name="midiQuantity"
              value={midiQuantity}
              placeholder="Min: 1, Max: 20"
              min={1}
              max={20}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button color="purple" content="Submit" className="button-main-submit" aria-label="Submit" />
        </Form>
        <MelodyResult />
      </div>
    );
  }
}

Melody.propTypes = propTypes;

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

export default connect(
  mapState,
  mapDispatch
)(Melody);

/*
      <strong>state:</strong>
      <pre>{JSON.stringify(this.state, null, 2)}</pre>
      <pre>{JSON.stringify(this.props, null, 2)}</pre>

*/
