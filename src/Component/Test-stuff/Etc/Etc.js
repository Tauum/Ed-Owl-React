import React, { Component } from "react";
import Test from '../Test';
import Cards from '../Cards';
import 'bootstrap/dist/css/bootstrap.min.css';
 
class Etc extends Component {
  render() {
    return (
      <div>
        <h2>ETC</h2>
      <Test/>
      <Cards/>
      </div>
    );
  }
}
 
export default Etc;