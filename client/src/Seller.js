import React, { Component } from 'react';

export default class Seller extends Component {
    render() {
        return (

            <div className="mt-5">
                <h3>
                    Create Account
                </h3>
                <form>
                <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">First Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="First Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Last Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Name of Business</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="business_name" 
                            placeholder="Name of Business"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                        <textarea 
                                className="form-control" 
                                id="exampleFormControlTextarea1" 
                                rows="3"
                                ></textarea>
                    </div>
                    </form>
                    <button type="submit" className="btn btn-primary">Create An Account</button>
            </div>
        );
    }
}