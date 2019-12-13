// Basic React Imports 
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./dashboard_css.css"

// COMPONENTS
import Dashboard from './Dashboard';
import Seller from './Seller'
import Sellers from './Sellers'
import AddProduct from './AddProduct'


// React Feather Icons
import { FilePlus ,Home,UserPlus  } from 'react-feather';

// web3
import Web3 from 'web3';

//abi
import ProductDapp from './abis/ProductDapp.json'


export default class App extends Component {
  
  // component will mount
  async componentWillMount(){
    await this.loadWeb3() 
    await this.loadBlockchainData()

  }

  async loadWeb3(){
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          const web3 = window.web3
          // // load accounts
          const accounts = await web3.eth.getAccounts() // returns all the account in our wallet 
          console.log(accounts)

          // console.log("Window Ethereum Enabled")
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          
      }
      else {
          alert("Non-Ethereum browser detected. You should consider trying MetaMask!")
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
  });
  }

  //load Blockchain Data
  async loadBlockchainData(){
    // console.log(ProductDapp)
    window.web3 = new Web3(window.ethereum)
    const web3 = window.web3
    // // load accounts
    const accounts = await web3.eth.getAccounts() // returns all the account in our wallet 
    this.setState({'account':accounts[0]})
    // console.log(accounts)

    // // detects the network dynamically 
    const networkId = await web3.eth.net.getId()

    // // get network data
    const networkData = ProductDapp.networks[networkId]
    // console.log("Network Id:",networkId)
    // console.log("Network Data:", networkData)

    if(networkData){
      const productDapp = new web3.eth.Contract(ProductDapp.abi, networkData.address) // loads the smart contract
      // console.log(productDapp)
      this.setState({productDapp}) // updates the state
      // console.log("Contract:", this.state.productDapp)
      const productCount = await productDapp.methods.product_count().call() 
      const sellerCount = await productDapp.methods.seller_count().call()
      this.setState({productCount})

      const productDappName = await productDapp.methods.dapp_name().call()
      this.setState({productDappName})

      // console.log("Product Count:", this.state.productCount)


      // Load Seller
      for(var j=1; j <= sellerCount; j++){
        const seller = await productDapp.methods.sellers(j).call()
        this.setState({
          sellers:[...this.state.sellers, seller]
        })
      }

      // Load Product
      for(var i=1; i <= productCount; i++){
        const product = await productDapp.methods.products(i).call()
        this.setState({
          products:[...this.state.products, product]
        })
      }


    //   this.setState({loading:false})

    //   //logging out
    //   console.log(marketplace)
    //   console.log("Network Id:", networkId)
    //   console.log("Contract Address:", networkData.address)
    //   console.log("Available Products on the blockchain: ", this.state.products)
    }
    else {
      window.alert("Marketplace contract is not deployed to the network")
    }
  }
 
constructor(props){
  super(props)
  this.state={
    account:'',
    message:'',
    products:[],
    sellers:[],
    loading:true
  }
}


  render() {
    return (
      <Router>
      <div>
        {/* Nav Bar */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
            {this.state.productDappName}
          </a>
          <input 
              className="form-control form-control-dark w-100" 
              type="text" 
              placeholder="Search" 
              aria-label="Search"
              />
          <ul className="navbar-nav px-3">
            {/* <li className="nav-item text-nowrap">
              <a className="nav-link" href="#">Sign out</a>
            </li> */}
          </ul>
        </nav>

        <div className="container-fluid">
             <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">                    
                  <div className="sidebar-sticky">
                      <ul className="nav flex-column">
                        {/* Home Link */}
                      <li className="nav-item">
                          <Link className="nav-link active" to="/">
                          <span className="mr-2">
                              <Home 
                              size='20' 
                              // color={getRandomColor()} 
                              />
                          </span>
                          Products <span className="sr-only">(current)</span>
                          </Link>
                      </li>
                      {/* Seller Link */}
                      <li className="nav-item">
                          <Link className="nav-link" to="/seller">
                          <span className="mr-2">
                              <UserPlus 
                                  size='20' 
                              />                  
                          </span>
                          Be A Seller
                          </Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/sellers">
                          <span className="mr-2">
                              <UserPlus 
                                  size='20' 
                              />                  
                          </span>
                          Farmers
                          </Link>
                      </li>
                      
                      {/* Add A Product Link */}
                      <li className="nav-item">
                          <Link className="nav-link" to="/product/add">
                          <span className="mr-2">
                              
                          <FilePlus 
                                size='20' 
                              />            
                          </span>
                          Add A Product
                          </Link>
                      </li>
                      </ul>
                  </div>
                  </nav>
                  <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <Switch>
                          <Route path="/seller">
                              <Seller 
                                loading={this.state.loading}
                                productDapp={this.state.productDapp}
                                message ={this.state.message}
                                account={this.state.account}
                              />
                          </Route>
                          <Route path="/sellers">
                              <Sellers 
                              sellers={this.state.sellers}
                              productDapp={this.state.productDapp}
                              />
                          </Route>
                          
                          <Route path="/product/add">
                              <AddProduct 
                                    loading={this.state.loading}
                                    productDapp={this.state.productDapp}
                                    message ={this.state.message}
                                    account={this.state.account}
                              />
                          </Route>
                    
                          
                          <Route path="/">
                              <Dashboard 
                              productDapp={this.state.productDapp}
                              products={this.state.products}
                              message ={this.state.message}
                              account={this.state.account}
                              />
                          </Route>


                  </Switch>
                  </main>
            </div>
        </div>
    </div>  
    </Router>
    );
  }
}