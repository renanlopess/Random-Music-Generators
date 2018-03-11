import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon, Modal } from 'semantic-ui-react';
import Tone from 'Tone';
import NoteGrid from './NoteGrid';
import { selectMelody, removeMelody } from '../store/melody';

// import testMusical from '../../script/testMusical';
/**
 * COMPONENT
 */

export class MelodyResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalId: null
    };
  }
  handleOpen = (midiDataObject, modalId) => {
    this.setState({ modalOpen: true, modalId }, () => {
      this.props.selectMelody(midiDataObject);
    });
  };

  handleClose = () => {
    this.setState({ modalOpen: false, modalId: null }, () => {
      this.props.removeMelody();
    });
  }

  createTableCells(arr) {
    return arr.map((num, i) => {
      return <Table.Cell key={i}>{num}</Table.Cell>;
    });
  }

  playExampleTone = () => {
    console.log('clicked');
    // playTone();
  };

  render() {
    const noteNumbers = [23, 24, 25];
    const pitches = ['C', 'C#', 'D'];
    // console.log('PROPS/State in melodyResult:', this.props, this.state);

    if (!this.props.melodies.length) {
      return (
        <div>
          <h3>No results to display.</h3>
        </div>
      );
    }

    return (
      <div style={{ width: '900px', overflowX: 'scroll' }}>
        {this.props.melodies.map((midiDataObject, i) => {
          return (
            <div key={i}>
              <Table definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Pitch</Table.Cell>
                    {this.createTableCells(midiDataObject.pitchNamesWithOctave)}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>MIDI Code</Table.Cell>
                    {this.createTableCells(midiDataObject.midiCodeArray)}
                  </Table.Row>
                </Table.Body>
              </Table>
              <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                trigger={
                  <Button
                    icon
                    labelPosition="left"
                    color="blue"
                    onClick={() => this.handleOpen(midiDataObject, i)}
                  >
                    <Icon name="play" />
                    PREVIEW
                  </Button>
                }
                closeIcon
              >
              {
                this.state.modalId === i &&
                <Modal.Content>
                <NoteGrid />
                </Modal.Content>
              }
                </Modal>

              <a
                className="download"
                title="Download"
                href={midiDataObject.midiFile}
              >
                <Button icon labelPosition="left" color="grey">
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

export default connect(mapState, mapDispatch)(MelodyResult);

/*
{createNoteNumbers(midiDataObject)}
{createPitchNames(midiDataObject)}
*/
