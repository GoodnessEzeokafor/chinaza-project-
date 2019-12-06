import React, { Component } from 'react';
import SellerDetailModal from './SingleSellerProfileModal';

export default class Sellers extends Component {

	constructor(props){
		super(props)
		this.state = {
            single_result:'',
			addModalShow: false
		}	
    }
    
    async getSingleFarmer(uint_id){
		const get_single_farmer = await this.props.productDapp.methods.getSingleSeller(uint_id).call()
		return get_single_farmer
	}


    render() {
        let addModalClose =() => this.setState({addModalShow:false})
        return (
      <div>
      <h2>Registered Farmers</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Name of Business</th>
              <th>Business Address</th>
              <th>Wallet Address</th>
              <th>View Profile</th>
              <th>Edit Profile</th>
            </tr>
          </thead>
          <tbody>

            {this.props.sellers.map((seller, key) => {
                return(
                    <tr key={key}>
            <td>{seller.id}</td>
              <td>{seller.first_name}</td>
                <td>{seller.last_name}</td>
                <td>{seller.name_of_business}</td>
              <td>
                {seller.business_address}
              </td>
              <td>
                  {seller.seller_address}
              </td>
             <td>
             <button id={seller.id}
						data-target="#exampleModal"
						onClick={async (event) => {
							// // const id = {result.id}
							// alert(`Hello World ${result.id}`)
							// this.getSingleResult()
							const id= parseInt(event.target.id)
							console.log(typeof id)
							const single_result = await  this.getSingleFarmer(id)
							this.setState({single_result})
							this.setState({addModalShow:true})
							event.persist();
						}}
						className="btn btn-primary">
						View 
					</button>
            </td>

            <td>
             <button id={seller.id}
						data-target="#exampleModal"
						// onClick={async (event) => {
						// 	// // const id = {result.id}
						// 	// alert(`Hello World ${result.id}`)
						// 	// this.getSingleResult()
						// 	const id= parseInt(event.target.id)
						// 	console.log(typeof id)
						// 	const single_result = await  this.getSingleFarmer(id)
						// 	this.setState({single_result})
						// 	this.setState({addModalShow:true})
						// 	event.persist();
						// }}
						className="btn btn-success">
						Edit 
					</button>
            </td>
            
            </tr>
                );
            })}  
          </tbody>
        </table>
      </div>
      <SellerDetailModal 
				get_detail_farmer={this.state.single_result}
				show={this.state.addModalShow}
				onHide={addModalClose}
            /> 
      </div>
        );
    }
}