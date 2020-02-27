import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../css/navbar.css"

class Navbar extends Component {
    state = {
      test: "test"
    };
  
    render() {
      console.log("updated app");
      return (
        <div className="Navbar-container">
          <NavbarBtn to="/">Home</NavbarBtn>
          <NavbarBtn to="/addCard">Add Card</NavbarBtn>
        </div>
      );
    }
  }
  
  class NavbarBtn extends Component {
    state = {};
  
    render() {
      console.log("navbar btn");
      console.log("this.children", this.props);
      
  
      return <Link to={this.props.to}><div className="Navbar-btn">{this.props.children}</div></Link>;
    }
  }

  export default Navbar