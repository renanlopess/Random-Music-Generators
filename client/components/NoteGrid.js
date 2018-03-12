import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Melody from './Melody';
import PreviewMelody from './PreviewMelody';
import { Table } from 'semantic-ui-react';
import getRowMap from '../../script/getRowMap';

/**
 * COMPONENT
 */
export const NoteGrid = props => {
  const midiData = props.melody.midiCodeArray;
  const rowMap = getRowMap(midiData);
  const melody = props.melody.pitchNamesWithOctave;
  const len = melody.length;
  const activeIndex = props.progress * len;
  const activeRow = rowMap[midiData[activeIndex]];
  const active = activeIndex + '-' + activeRow;
  // console.log('active stuff:', activeIndex, activeRow, active)
  // console.log('midiData / rowMap:', midiData, rowMap)
  const rows = rowMap.rows;

  const buildTable = (_rows, arr) => {
    const cells = [];
    for (let i = _rows - 1; i >= 0; i--) {
      cells.push(
        <Table.Row key={i}>
          {arr.map((item, j) => {
            let cls = `${j}-${i}`;
            if (cls === active) {
              cls += ' active';
            }
            return (
              <Table.Cell key={`${j}-${i}`} className={cls}>
                { }
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
        <Table.Header>
          <Table.Row>
            {melody.map((note, i) => {
              return (
                <Table.HeaderCell key={i}>
                  {note} ({midiData[i]})
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>{buildTable(rows, melody)}</Table.Body>
      </Table>
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

/*
this was in a cell:

Note: {j + 1} Row: {i + 1}
*/