import React, { Component } from 'react';
import "./dashboard_css.css"

export default class Dashboard extends Component {
    render() {
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
              <th>Price</th>
              <th>Buy</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Lorem</td>
              <td>ipsum</td>
              <td>$100</td>
              <td>

                <button 
                  type="button" 
                  className="btn btn-primary btn-sm">Buy Product</button>
              </td>
              <td>
              <button 
                type="button" 
                className="btn btn-success btn-sm">Edit Product</button>
              </td>
              <td>
              <button type="submit" className="btn btn-danger btn-sm">
                Delete Product
              </button>

              </td>
              
            </tr>
          </tbody>
        </table>
      </div>
            </div> 
        );
    }
}