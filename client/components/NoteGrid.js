import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Melody from './Melody';
import PreviewMelody from './PreviewMelody';
import { Table } from 'semantic-ui-react';

/**
 * COMPONENT
 */
export const NoteGrid = props => {
  const midiData = props.melody;
  const rows = 2;
  // const cols = 3;
  const active = '2-0';
  // const map = { 0: 2, 1: 1, 2: 0 };
  const melody = midiData.pitchNamesWithOctave;

  const buildTable = (rows, arr) => {
    const cells = [];
    for (let i = 0; i < rows; i++) {
      cells.push(
        <Table.Row key={i}>
          {arr.map((item, j) => {
            let cls = `${j}-${i}`;
            if (cls === active) {
              cls += ' active';
            }
            return (
              <Table.Cell key={`${j}-${i}`} className={cls}>
                {j}-{i}
              </Table.Cell>
            );
          })}
        </Table.Row>
      );
    }
    return cells;
  };

  return (
    <div>
    <Table celled>
      <Table.Body>{buildTable(rows, melody)}</Table.Body>
    </Table>
    <PreviewMelody />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // email: state.user.email
    melody: state.melody
  };
};

export default connect(mapState)(NoteGrid);
