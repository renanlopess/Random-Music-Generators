import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Select, Button } from 'semantic-ui-react';

/**
 * COMPONENT
 */

export class Melody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: { tonality: 'diatonic', midiRange: 'G3 G5', midiJump: 7, lengthValues: 4, midiLength: 10, midiQTY: 10 }
    };
  }

  handleChange = (evt, { name, value }) => {
    const {formValues} = this.state;
    formValues[name] = value;
    this.setState({formValues});
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { tonality, midiRange, midiJump, lengthValues, midiLength, midiQTY } = this.state.formValues;
    alert('submitted');

    // this.setState({ submittedName: name, submittedEmail: email });
  }

  render() {
    // const { email } = this.props;
    const { tonality, midiRange, midiJump, lengthValues, midiLength, midiQTY } = this.state.formValues;
    const tonalityOptions = [
      { key: 'diatonic', text: 'Diatonic', value: 'diatonic' },
      { key: 'chromatic', text: 'Chromatic', value: 'chromatic' },
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
    return (
      <div>
        <h1>Random Melody Generator</h1>
        <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
          <Form.Field control={Select} label="Tonality Options" options={tonalityOptions} defaultValue="diatonic" name="tonality" value={tonality} onChange={this.handleChange} />          
          <Form.Field size="tiny" control={Select} label="Note Durations" options={lengthValueOptions} defaultValue="Quarter Note (1 beat)" name="lengthValues" value={lengthValues} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group>
          <Form.Input label="Note Range" name="midiRange" placeholder="G3 G5" value={midiRange} onChange={this.handleChange}/>
          <Form.Input label="Max Jump" name="midiJump" value={midiJump} placeholder="Min: 0, Max: 127" onChange={this.handleChange}/>
          <Form.Input type="number" label="No of Notes" name="midiLength" value={midiLength} placeholder="Min: 1, Max: 50" min={1} max= {50} onChange={this.handleChange}/>
          <Form.Input type="number" label="No of Melodies" name="midiQTY" value={midiQTY} placeholder="Min: 1, Max: 20" min={1} max= {20} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Button content="Submit" />
        </Form>
        <strong>state:</strong>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>

      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(Melody);
