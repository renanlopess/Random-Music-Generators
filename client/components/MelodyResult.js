import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

/**
 * COMPONENT
 */

export const MelodyResult = () => {
  const noteNumbers = [23, 24, 25];
  const pitches = ['C', 'C#', 'D'];

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
    email: state.user.email
  };
};

export default connect(mapState)(MelodyResult);
