import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
// import $ from 'jquery'

import User from './user.svg';

export default class SellerDetailModal extends Component {

  // componentWillMount(){
  //   this.calculateGP()
  // }
    constructor(props){
        super(props)
    }
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
        More About  <small>{this.props.get_detail_farmer['1']} {this.props.get_detail_farmer['2']} </small>   
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <center>
                <img 
                className="img-responsive" 
                src={User} 
                alt="website logo" 
                width="300" 
                height="200"
                />
           <h3> {this.props.get_detail_farmer['1']} {this.props.get_detail_farmer['2']}</h3>
          <h4> {this.props.get_detail_farmer['3']}</h4>
          <h4>Wallet:</h4> {this.props.get_detail_farmer['7']}
          
        </center>
        <hr  style={{
            color: '#000000',
            backgroundColor: '#000000',
            height: .5,
            borderColor : '#000000'
        }} />
        <h5>Description:</h5>
        {this.props.get_detail_farmer['5']}
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        );
    }
}
