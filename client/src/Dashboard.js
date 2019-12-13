import React, { Component } from 'react';
import "./dashboard_css.css"
import BoughtProductModal from "./BoughtProductModal"

export default class Dashboard extends Component {
  constructor(props){
		super(props)
		this.state = {
            single_result:'',
            addModalShow: false,
            loading:false
            
		}	
  }
    render() {
      let addModalClose =() => this.setState({addModalShow:false})
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>

      <h2>Section title</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Image</th>
              <th>Product Title</th>
              <th>Farmer Wallet Address</th>
              <th>Price</th>
              <th>Buy</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product, key) => {
              return(
                <tr key={key}>
            <td>{product.id}</td>
              <td>
                <img 
                  src={`https://ipfs.io/ipfs/${product.upload_image}/`}  
                  alt={product.product_name}
                  width="100"
                  height="100" 
                  />
              </td>
              <td>{product.product_name}</td>
            <td>{product.seller}</td>
              <td>{window.web3.utils.fromWei(product.product_price.toString(),'Ether')} ETH</td>
                <td>
                  <button 
                    type="button" 
                    id={product.id}
                    value={product.product_price}
                    className="btn btn-primary btn-sm"
                    onClick = {(event) => {
                      const id = event.target.id;
                      this.props.productDapp.methods.buyProduct(id).send({from: this.props.account,value:event.target.value})
                        .once('receipt', (receipt)=> {
                          this.setState({ loading: false})
                        })
                      this.setState({addModalShow:true})
                      event.persist();
                    }}
                    >Buy Product</button>
                </td>
                <td>
                <button 
                  type="button" 
                  className="btn btn-success btn-sm">Edit Product</button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <BoughtProductModal 
				show={this.state.addModalShow}
				onHide={addModalClose}
            /> 
            </div> 
        );
    }
}