/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InfoPopup, {data, renderData} from '../components/RhythmScene/InfoPopup';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('InfoPopup', () => {
  // let userHome;

  // beforeEach(() => {
  //   userHome = shallow(<InfoPopup />);
  // });

  // it('renders the email in an h3', () => {
  //   expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com');
  // });

  it('renders data correctly', () => {
    // console.log(data);
    // const dataRender = shallow(renderData(data));
    // const h3 = dataRender.find('h3 > div').at(0).text();
    // expect(text.includes('1/2 = half note.')).to.equal(true);
    const wrapper = shallow(<InfoPopup />);
    const h2 = wrapper.find('h2').text();
    expect(h2).to.equal('Guide to rhythmic values');
    console.log(wrapper.find('Grid.Column'));
  });

});
