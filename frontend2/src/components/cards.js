import React, { Component } from "react";
import "../css/cards.css";
import {URL} from "../constants.js"

class CardsContainer extends Component {
  state = {};

  componentDidMount() {
    console.log("CARDS CONTAINER MOUNTED");
    this.props.refreshCards();
  }
  renderAllCards() {
    return this.props.cardsArr.map(cardObj => (
      <Card cardObj={cardObj} key={cardObj.id}></Card>
    ));
  }
  render() {
    return <div className="Cards-container">{this.renderAllCards()}</div>;
  }
}

class Card extends Component {
  state = {
    totalStars: 5,
    isHovered: false,
    inCart: false
  };
  componentDidMount(){
    console.log('MOUNTED CARD')
    console.log('this.props', this.props)
  }
  renderAllStars() {
    let ret = [];
    let renderStar = (isFull, key) => {
      return (
        <img
          src="/assets/other/starSvg.svg"
          style={{ opacity: isFull ? 1 : 0.3 }}
          key={key}
        ></img>
      );
    };
    let isFull = false;
    for (let i = 0; i < this.state.totalStars; i++) {
      if (i < this.props.cardObj.numStars) {
        isFull = true;
      } else {
        isFull = false;
      }
      ret.push(renderStar(isFull, i));
    }

    return ret;
  }

  addToCart = () => {
    console.log("ADDING CARD TO CART");
    this.setState({ inCart: true });
  };
  removeFromCart = () => {
    console.log("REMOVING CARD FROM CART");
    this.setState({ inCart: false });
  };

  render() {
    return (
      <div
        className="Card-container"
        onMouseEnter={() => {
          this.setState({ isHovered: true });
        }}
        onMouseLeave={() => {
          this.setState({ isHovered: false });
        }}
      >
        <div className="pane1">
          <CardOverlay
            isHovered={this.state.isHovered}
            inCart={this.state.inCart}
            addToCart={this.addToCart}
            removeFromCart={this.removeFromCart}
          ></CardOverlay>
          {this.state.inCart?<InCartIcon></InCartIcon>:null}

          <img src={URL.POSTER_DOMAIN+this.props.cardObj.id+".png"}></img>
          {/* <img src={this.props.cardObj.posterSrc}></img> */}
          {/* <img src={"/assets/cardImages/blue-flower.png"}></img> */}
        </div>
        <hr></hr>
        <div className="pane2">
          <div className="name">{this.props.cardObj.name}</div>
          <div className="price">${this.props.cardObj.price}</div>
          <div className="Stars-container">{this.renderAllStars()}</div>
        </div>
      </div>
    );
  }
}

class CardOverlay extends Component {
  componentDidUpdate() {}

  renderAddToCartBtn = () => {
    return (
      <div className="button" onClick={this.props.addToCart}>
        Add To Cart
      </div>
    );
  };

  renderRemoveFromCartBtn = () => {
    return (
      <div className="button" onClick={this.props.removeFromCart}>
        Remove From Cart
      </div>
    );
  };
  render() {
    return (
      <div
        className="overlay"
        style={{ opacity: this.props.isHovered ? 0.7 : 0 }}
      >
        {!this.props.inCart
          ? this.renderAddToCartBtn()
          : this.renderRemoveFromCartBtn()}
      </div>
    );
  }
}

function InCartIcon(props) {
  return (
    <div className="In-Cart-Icon">
      <div>In Cart</div>
    </div>
  );
}
export default CardsContainer;
