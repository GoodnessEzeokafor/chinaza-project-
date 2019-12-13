import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';


export default class SellerCreatedModal extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            <h3>Message</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <center>
          <h4> THANKS FOR USING OUR PLATFORM</h4>
          
        </center>
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        );
    }
}