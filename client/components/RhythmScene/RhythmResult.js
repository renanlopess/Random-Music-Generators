import React from 'react';
import { Table } from 'semantic-ui-react';

const RhythmResult = props => {
  let { rhythmMeasure } = props;
  rhythmMeasure = rhythmMeasure.split(' ');
  return (
    <Table basic="very" collapsing unstackable>
      <Table.Body>
        <Table.Row>
          {rhythmMeasure.map(rhythm => <Table.Cell>{rhythm}</Table.Cell>)}
        </Table.Row>
        <Table.Row>
          {rhythmMeasure.map(rhythm => {
            const [top, bottom] = rhythm.split('/');
            return (
              <Table.Cell>
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
