import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react';
import PreviewMelody from './PreviewMelody';
import { selectMelody, removeMelody } from '../store/melody';

/**
 * COMPONENT
 */

export class MelodyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  handleOpen = midiDataObject => {
    Promise.resolve(this.props.selectMelody(midiDataObject)).then(() => {
      this.setState({ modalOpen: true });
    });
  };

  handleClose = () => {
    this.setState({ modalOpen: false }, () => {
      this.props.removeMelody();
    });
  };

  render() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        trigger={
          <Button
            icon
            labelPosition="left"
            color="blue"
            onClick={() => this.handleOpen(this.props.midiDataObject)}
          >
            <Icon name="play" />
            PREVIEW
          </Button>
        }
        closeIcon
      >
        <Modal.Content>
          <PreviewMelody />
        </Modal.Content>
      </Modal>
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

export default connect(mapState, mapDispatch)(MelodyModal);
