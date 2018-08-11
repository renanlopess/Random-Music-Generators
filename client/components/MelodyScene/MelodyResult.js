import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon } from 'semantic-ui-react';
import { selectMelody, removeMelody } from '../../store/melody';
import { MelodyModal } from './';

/**
 * COMPONENT
 */

export class MelodyResult extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // modalOpen: false,
  //     // modalId: null
  //   };
  // }

  /*eslint-disable class-methods-use-this*/
  createTableCells(arr) {
    return arr.map((num, i) => {
      return (
        <Table.Cell key={i} className="result-table-cell">
          {num}
        </Table.Cell>
      );
    });
  }

  render() {
    // console.log('melody result props', this.props)
    if (!this.props.melodies) {
      return <div>Getting melodies...</div>;
    }
    if (!this.props.melodies.length) {
      return (
        <div>
          <h6 style={{ margin: '25px' }}>Results will display here.</h6>
        </div>
      );
    }

    return (
      <div id="result-wrapper">
        {this.props.melodies.map((midiDataObject, i) => {
          return (
            <div key={i} className="result-single">
              <Table definition unstackable>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell style={{ width: '92px' }} className="result-table-title">
                      Pitch
                    </Table.Cell>
                    {this.createTableCells(midiDataObject.pitchNamesWithOctave)}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="result-table-title">MIDI Code</Table.Cell>
                    {this.createTableCells(midiDataObject.midiCodeArray)}
                  </Table.Row>
                </Table.Body>
              </Table>
              <MelodyModal midiDataObject={midiDataObject} />

              <a className="download" title="Download" href={midiDataObject.midiFile}>
                <Button icon labelPosition="left" color="grey" aria-label="Download" >
                  <Icon name="download" />
                  DOWNLOAD
                </Button>
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    melodies: state.melodies
  };
};

const mapDispatch = dispatch => {
  return {
    selectMelody(melody) {
      return dispatch(selectMelody(melody));
    },
    removeMelody() {
      return dispatch(removeMelody());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(MelodyResult);
