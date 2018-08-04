import React from 'react';
import uniqueId from 'lodash.uniqueid';
import { Table } from 'semantic-ui-react';

const RhythmResult = props => {
  const { rhythmMeasure, num, children } = props;
  // rhythmMeasure = rhythmMeasure.split(' ');
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

export default RhythmResult;
