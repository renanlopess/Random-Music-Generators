import React from 'react';
import { Icon, Popup, Grid } from 'semantic-ui-react';

export const data = '1/2 = half note. 1/4 = quarter note. 3/4 = dotted half note. 1/8 = eighth note. 3/8 = dotted quarter note. 1/16 = sixteenth note. 3/16 = dotted 8th note. 1/6 = quarter note triplet (2 tied 8th note triplets). 1/12 = 8th note triplet. 1/24 = 16th note triplet. 5/24 = 8th note tied to an 8th note triplet'.split('. ');

export const renderData = (dataArray) => {
  return dataArray.map(dataItem => {
    const [ dataKey, dataValue ] = dataItem.split(' = ');
    return (<Grid.Column key={dataKey}>{dataKey} = {dataValue}.
      </Grid.Column>);
    });
};

const InfoPopup = () => (
  <span className="rhythm-info-popup">
    <Popup
      trigger={<Icon circular name="info" />}
      wide="very"
      on={['hover', 'click']}
      position="bottom right"
      // on="click"
    >
    <h2>Guide to rhythmic values</h2>
    <Grid stackable columns={3}>
      {renderData(data)}
    </Grid>
    </Popup>
  </span>
);

export default InfoPopup;
