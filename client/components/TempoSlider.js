import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Table, Button, Icon, Modal } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import { changeTempo } from '../store/melody';

/**
 * COMPONENT
 */

export class TempoSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tempo: this.props.melody.tempo
    };
  }

  render() {
    // const { rhythm, synth, sequence, transport, playing } = this.state;
    // console.log('preview state/props:', this.state, this.props);

    const settings = {
      start: 2,
      min: 0,
      max: 10,
      step: 1
    };

    return (
      <div>
        <span className="tempo-label">Tempo:</span>
        <Slider
          color="purple"
          inverted={true}
          style={{width: '50%', margin: '0 auto'}}
          settings={{
            start: 105,
            min: 45,
            max: 280,
            step: 5,
            onChange: value => {
              // console.log('value:', value)
              this.props.changeTempo(+value);
              // this.setState({
              //   tempo: value
              // });
            }
          }}
        />
      </div>
    );
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

const mapDispatch = dispatch => {
  return {
    changeTempo(tempo) {
      dispatch(changeTempo(tempo));
    }
  };
};

export default connect(mapState, mapDispatch)(TempoSlider);
