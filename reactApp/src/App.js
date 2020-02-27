import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import CardsContainer from "./components/cards";
import AddCardForm from "./components/addCard";
import OurFetchRequests from "./fetchRequests/index";

class App extends Component {
  state = {
    cardsArr: []
  };
  componentDidMount() {
    this.getAllCards()
  }

  getAllCards = async () => {
    let allCardsArr = await OurFetchRequests.cards.getAllCards();
    this.setState({ cardsArr: allCardsArr });
  };
  
  render() {
    return (
      <Router>
        <div>
          <Navbar></Navbar>


          <div className="main">
            <Switch>
              <Route path="/addCard">
                <AddCardForm></AddCardForm>
              </Route>
              <Route path="/">
                <CardsContainer
                  cardsArr={this.state.cardsArr}
                  refreshCards={async () => {
                    let allCardsArr = await OurFetchRequests.cards.getAllCards();
                    this.setState({ cardsArr: allCardsArr });
                  }}
                ></CardsContainer>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
