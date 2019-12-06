import React, { Component } from 'react';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host:'ipfs.infura.io',port:5001,'protocol':'https'})


// captureFile =(event) => {
//     event.preventDefault()
//     // console.log("file captured....")
//     // console.log(event.target.files[0])
//     const file = event.target.files[0]
//     const reader = new window.FileReader()
//     reader.readAsArrayBuffer(file)
//     reader.onloadend = () =>{
//       // console.log("buffer", this.state.buffer)
//       // console.log("buffer", Buffer(reader.result))
//       this.setState({
//         buffer:Buffer(reader.result)
//       })
//     }
//   }
//   onSubmit = (event) => {
//     event.preventDefault()
//     console.log("Submitted....")
//     ipfs.add(this.state.buffer,(error, result)=>{
//       // do stuff here
//       console.log("Ipfs Result",result)
//       if(error){
//         console.error("Error>>>", error)
//         return
//       }
//     })
//   }
  

export default class AddProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading:this.props.loading,
            buffer:null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props.account)
    }
        //form handling
        captureFile =(event) => {
             event.preventDefault()
            const file = this.upload_image.files[0]
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadend = () =>{
                console.log("buffer", this.state.buffer)
                console.log("buffer", Buffer(reader.result))
                this.setState({
                    buffer:Buffer(reader.result)
                })
            }
        }
        async  handleSubmit(event){
            console.log("Form Submitted!!!")
            // console.log(typeof this.first_name)
            try {
                console.log("Events")
                this.setState({loading:true})
                ipfs.add(this.state.buffer,(error, result)=>{
                    // do stuff here
                    console.log("Ipfs Result",result)
                    // return result['0'].hash
                    result.forEach(async (file) => {
                        console.log("successfully stored", file.hash)
                        this.props.productDapp.methods.createProduct(
                            this.product_name.value,
                            this.product_description.value,
                            window.web3.utils.toWei(this.product_price.value.toString(),'Ether'),
                           file.hash
                        )
                        .send({from:this.props.account})
                        .once('receipt', (receipt) => {
                            this.setState({
                                loading:false
                            })
                            console.log(receipt);
                        })
                    });
                    if(error){
                        console.error("Error>>>", error)
                        return
                    }
                })
                
            } catch (error){
                console.log(error)
            }
            event.preventDefault();
            event.stopPropagation();
        }
    render() {
        return (

            <div className="mt-5">
                <h3>
                    Add Product
                </h3>
                <form
                     onSubmit={this.handleSubmit}>
                <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Product Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="product_name" 
                            placeholder="Product Name"
                            ref={(input) => this.product_name = input}
                            required
                        />
                    </div>
                      
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Product Description</label>
                        <textarea 
                                className="form-control" 
                                id="product_description" 
                                rows="3"
                                ref={(input)=> this.product_description =input}
                                required
                                ></textarea>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Product Price</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="product_price" 
                            placeholder="Product Price"
                            ref = {(input) => this.product_price = input}
                            required
                        />
                    </div>
                    <div className="form-group">
                    <div className="custom-file">
                        <input 
                            type="file" 
                            className="custom-file-input" 
                            id="uploadImage"
                            ref = {(input)=> this.upload_image = input}
                            onChange={this.captureFile}
                            required
                        />
                        <label className="custom-file-label" htmlFor="customFile">Upload Image</label>
                    </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                    </form>
            </div>

        );
    }
}