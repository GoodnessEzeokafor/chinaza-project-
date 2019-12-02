import React, { Component } from 'react';

export default class AddProduct extends Component {
    render() {
        return (

            <div className="mt-5">
                <h3>
                    Add Product
                </h3>
                <form>
                <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Product Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="product_name" 
                            placeholder="Product Name"
                        />
                    </div>
                      
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Product Description</label>
                        <textarea 
                                className="form-control" 
                                id="product_description" 
                                rows="3"
                                ></textarea>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Product Price</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="product_price" 
                            placeholder="Product Price"
                        />
                    </div>
                    <div className="form-group">
                    <div className="custom-file">
                        <input 
                            type="file" 
                            className="custom-file-input" 
                            id="uploadImage"
                        />
                        <label className="custom-file-label" htmlFor="customFile">Upload Image</label>
                    </div>
                    </div>
                    </form>
                    <button type="submit" className="btn btn-primary">Add Product</button>
            </div>

        );
    }
}