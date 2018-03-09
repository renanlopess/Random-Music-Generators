import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

/**
 * COMPONENT
 */

export const MelodyResult = (props) => {
  const noteNumbers = [23, 24, 25];
  const pitches = ['C', 'C#', 'D'];
  console.log('MELODIES:', props.melodies);

  return (
    <Table definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell>MIDI Note Number</Table.Cell>
          {
            noteNumbers.map((num, i) => {
              return <Table.Cell key={i}>{num}</Table.Cell>;
            })
          }
        </Table.Row>
        <Table.Row>
          <Table.Cell>Pitch</Table.Cell>
          {
            pitches.map((num, i) => {
              return <Table.Cell key={i}>{num}</Table.Cell>;
            })
          }
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    melodies: state.melodies
  };
};

export default connect(mapState)(MelodyResult);
