import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Table, Button, Icon, Modal } from 'semantic-ui-react';
// import { Slider } from 'react-semantic-ui-range';
import Slider from 'react-rangeslider';
import { changeTempo } from '../../store/melody';

const propTypes = {
  changeTempo: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func,
  globalState: PropTypes.bool,
  settings: PropTypes.object
};

const defaultProps = {
  handleChange: () => {},
  globalState: false,
  settings: {}
};

const defaultSettings = {
    min: 45,
    max: 280,
    step: 5,
    tooltip: true
  };

export class TempoSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tempo: props.melody.tempo
      // value: 50
    };
  }

  handleChange = value => {
    if (this.props.globalState) {
      this.props.changeTempo(value);
    } else {
      this.props.handleChange(value);
    }
    // this.setState({
    //   value: value
    // });
  };

  render() {
    // const { rhythm, synth, sequence, transport, playing } = this.state;
    // console.log('preview state/props:', this.state, this.props);
    // console.log('TEMPO SLIDER', this.props);
    const { settings, value } = this.props;
    return (
        <Slider
          {...defaultSettings}
          {...settings}
          value={value}
          // onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          // onChangeComplete={this.handleChangeComplete}
        />
    );
  }
}

TempoSlider.propTypes = propTypes;
TempoSlider.defaultProps = defaultProps;

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    melody: state.melody
  };
};

const mapDispatch = { changeTempo };

export default connect(
  mapState,
  mapDispatch
)(TempoSlider);

/*
        <Slider
          color="purple"
          inverted
          className="tempo-slider"
          style={{ width: '50%' }}
          settings={{
            ...settings,
            onChange: value => {
              // console.log('value:', value)
              this.props.changeTempo(+value);
              // this.setState({
              //   tempo: value
              // });
            }
          }}
        />
*/
