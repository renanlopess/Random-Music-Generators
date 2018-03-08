import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Select } from 'semantic-ui-react';

/**
 * COMPONENT
 */

export class Melody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: { name: '', email: '', tonality: 'diatonic' }
    };
  }

  handleChange = (evt, { name, value }) => this.setState({formValues: { [name]: value }})

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, tonality } = this.state;
    alert('submitted');

    // this.setState({ submittedName: name, submittedEmail: email });
  }

  render() {
    // const { email } = this.props;
    const { name, email, tonality } = this.state;
    const tonalityOptions = [
      { key: 'diatonic', text: 'Diatonic', value: 'diatonic' },
      { key: 'chromatic', text: 'Chromatic', value: 'chromatic' },
    ];
    return (
      <div>
        <h1>Random Melody Generator</h1>
        <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input label="name" placeholder="Name" name="name" value={name} onChange={this.handleChange} />
            <Form.Input label="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} />
            <Form.Field control={Select} label="Tonality Options" options={tonalityOptions} placeholder="hey" name="tonality" value={tonality} onChange={this.handleChange} />
            <Form.Button content="Submit" />
          </Form.Group>
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

/*
        <div>
          <label htmlFor="tonalityOptions">Tonality</label>
          <select id="tonalityOptions">
            <option value="diatonic" selected>
              Diatonic
            </option>
            <option value="chromatic">Chromatic</option>
          </select>
          <label htmlFor="midiRange">
            <a href="refTable.html" target="_blank">
              Note Range
            </a>
          </label>
          <input id="midiRange" placeholder="G3 G5" value="G3 G5" />

          <label htmlFor="midiJump">Max Jump</label>
          <input type="number" id="midiJump" placeholder="12" value="12" />

          <label htmlFor="lengthValues">
            Note Durations
            <select id="lengthValues">
              <option value="1">Whole Note (4 beats)</option>
              <option value="2">Half Note (2 beats)</option>
              <option value="4" selected>
                Quarter Note (1 beat)
              </option>
              <option value="6">Quarter Note Triplet (2/3 beat)</option>
              <option value="8">Eighth Note (1/2 beat)</option>
              <option value="12">Eighth Note Triplet (1/3 beat)</option>
              <option value="16">Sixteenth Note (1/4 beat)</option>
              <option value="24">Sixteenth Note Triplet (1/6 beat)</option>
              <option value="32">Thirty-second Note (1/8 beat)</option>
              <option value="64">Sixty-fourth Note (1/16 beat)</option>
            </select>
          </label>
          <label htmlFor="midiLength">No of Notes</label>
          <input type="number" id="midiLength" placeholder="10" value="10" />
          <label htmlFor="midiQTY">No of Melodies</label>
          <input type="number" id="midiQTY" placeholder="10" value="10" />
          <br />
          <input type="button" id="generate" value="Generate" />

          <div id="results">RESULTS</div>
        </div>

*/
