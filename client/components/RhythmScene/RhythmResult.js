import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash.uniqueid';
import { Table } from 'semantic-ui-react';

const defaultProps = {};

const propTypes = {
  rhythmMeasure: PropTypes.array.isRequired,
  num: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

const RhythmResult = props => {
  const { rhythmMeasure, num, children } = props;
  return (
    <Table basic="very" collapsing unstackable>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{num}.</Table.Cell>
          {rhythmMeasure.map(rhythm => (
            <Table.Cell key={uniqueId('rhythmMeasure')}>{rhythm}</Table.Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>{children}</Table.Cell>
          {rhythmMeasure.map(rhythm => {
            const [top, bottom] = rhythm.split('/');
            return (
              <Table.Cell key={uniqueId('rhythmMeasureImg')}>
                <img src={`img/rhythm/rhythm-${top}-${bottom}.png`} />
              </Table.Cell>
            );
          })}
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

RhythmResult.defaultProps = defaultProps;

RhythmResult.propTypes = propTypes;

export default RhythmResult;
