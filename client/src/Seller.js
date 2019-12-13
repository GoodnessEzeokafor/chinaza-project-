import React, { Component } from 'react';
import SellerCreatedModal from "./SellerCreatedModal"

export default class Seller extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading:this.props.loading,
            addModalShow: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props.account)
    }
    //form handling
    handleSubmit(event){
        console.log("Form Submitted!!!")
        console.log(typeof this.first_name)
        try {
    
        this.setState({loading:true})
        this.props.productDapp.methods.createSellerProfile(
            this.first_name.value,
            this.last_name.value,
            this.name_of_business.value,
            this.email_address.value,
            this.description_of_business.value,
            this.business_address.value
        )
        .send({from:this.props.account})
        .once('receipt',(receipt) => {
            this.setState({loading:false})
            console.log(receipt)
        })
        this.first_name.value = ""
        this.last_name.value =""
        this.name_of_business.value=""
        this.email_address.value = ""
        this.description_of_business.value=""
        this.business_address.value=""
        
        } catch (error){
            console.log(error)
        }
        this.setState({addModalShow:true})
        event.preventDefault();
        event.stopPropagation();
    }
    render() {
        let addModalClose =() => this.setState({addModalShow:false})
        return (
            <div className="mt-5">
                <h3>
                    Create Account
                </h3>
                <form 
                    onSubmit={this.handleSubmit}>
                <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">First Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="first_name" 
                            placeholder="First Name"
                            ref={(input) => {this.first_name = input}}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Last Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="last_name" 
                            placeholder="Last Name"
                            ref = {(input) => {this.last_name = input}}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Name of Business</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name_of_business" 
                            placeholder="Name of Business"
                            ref ={(input) => {this.name_of_business = input}}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Business Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email_address" 
                            placeholder="name@example.com"
                            ref={(input) => {this.email_address = input}}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Business Description</label>
                        <textarea 
                                className="form-control" 
                                id="description_of_business" 
                                rows="3"
                                ref={(input) =>{this.description_of_business = input}}
                                ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Businss address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="business_address" 
                            placeholder="business address"
                            ref={(input) => {this.business_address = input}}
                        />
                    </div>
                    <button type="submit"  className="btn btn-primary">Create An Account</button>
                    </form>
                    <SellerCreatedModal 
                        show={this.state.addModalShow}
                        onHide={addModalClose}
            /> 
            </div>
        );
    }
}