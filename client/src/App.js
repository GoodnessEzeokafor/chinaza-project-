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
import AddProduct from './AddProduct'
import ProductList from "./ProductList"


// React Feather Icons
import { FilePlus ,Home,UserPlus  } from 'react-feather';


export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
        {/* Nav Bar */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
          <input 
              className="form-control form-control-dark w-100" 
              type="text" 
              placeholder="Search" 
              aria-label="Search"
              />
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="#">Sign out</a>
            </li>
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
                          Dashboard <span className="sr-only">(current)</span>
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
                      <li className="nav-item">
                          <Link className="nav-link" to="/product/list">
                          <span className="mr-2">
                                   
                              <FilePlus 
                                size='20' 
                              />   
                          </span>
                            Products
                          </Link>
                      </li>
                      </ul>
                  </div>
                  </nav>
                  <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <Switch>
                          <Route path="/seller">
                              <Seller />
                          </Route>
                          <Route path="/product/add">
                              <AddProduct />
                          </Route>
                          <Route path="/product/list">
                              <ProductList />
                          </Route>
                          
                          <Route path="/">
                              <Dashboard />
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