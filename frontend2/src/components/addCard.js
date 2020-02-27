import React, { Component } from "react";
import "../css/addCardForm.css";
import OurFetchRequests from "../fetchRequests";

class AddCardForm extends Component {
  state = {
    cardName: "",
    price: 0,
    rating: 1,
    message: "",
    textColor:"black"
  };

  componentDidMount() {
    console.log("ADD CARD FORM MOUNTED");
    console.log("this.props", this.props);
  }

  inputOnChange = e => {
    console.log("e", e.target.value);

    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = async e => {
    e.preventDefault();
    console.log("SUBMITTED ADD CARD");
    console.log("e", e);
    console.log("this.state", this.state);

    //CHECK THAT FILE IS A PNG
    if (!this.isPngFile()) {
      this.setState({ message: "File must be png" ,textColor:"red"});
      return;
    } else {
      let response = await OurFetchRequests.cards.addCard(
        this.state.cardName,
        this.state.price,
        this.state.rating,
        ""
      );

      console.log("unparsedResponse", response);
      if (response.code == 200) {
        this.setState({ message: "Successfully added card" ,textColor:"black"});
      } else {
        this.setState({ message: "Error occured while adding card" ,textColor:"red"});
      }
    }

  };

  isPngFile = () => {
    console.log('CHECKING IF IS PNG FILE')
    let fileName = document.getElementById("image-file").files[0].name;
    let nameArr = fileName.split(".");
    let hasOnlyOnePeriod = nameArr.length == 2;

    let isPng =
      nameArr[nameArr.length - 1] == "png" &&
      document.getElementById("image-file").files[0].type.split("/")[1] ==
        "png";
    if (isPng && hasOnlyOnePeriod) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div className="add-card-form">
        <h2>Add a Card</h2>
        <form
          onSubmit={this.onSubmit}
          // id="uploadForm"
          // encType="multipart/form-data"
          // action="/add-new-card"
          // method="post"
        >
          <InputElem
            required
            prettyName={"Card Name"}
            inputName={"cardName"}
            placeholder={"Card Name"}
            onChange={this.inputOnChange}
            value={this.state.cardName}
            pattern="^[a-zA-Z]+$"
            title="only letters"
          ></InputElem>
          <InputElem
            required
            prettyName={"Price"}
            inputName={"price"}
            placeholder={"Price"}
            onChange={this.inputOnChange}
            value={this.state.price}
            pattern={"^[0-9]+$"}
            title="Only Numbers"
          ></InputElem>
          <InputElem
            required={true}
            prettyName={"Rating"}
            inputName={"rating"}
            placeholder={"An integer between 1 and 5"}
            onChange={this.inputOnChange}
            value={this.state.rating}
            pattern={"^[1-5]"}
            title="A number between 1 and 5 inclusive"
          ></InputElem>
          <h5>Upload a picture of the card. Only png files are accepted</h5>
          <input type="file" name="card-photo" id="image-file" required />
          <input type="submit" type="submit" value="Upload Image"></input>
        </form>
        {this.state.message ? <div style={{color:this.state.textColor}}>{this.state.message}</div> : null}
      </div>
    );
  }
}

class InputElem extends Component {
  render() {
    return (
      <div className="input-elem">
        <h5>{this.props.prettyName}</h5>
        <input
          required={this.props.required}
          placeholder={this.props.placeholder}
          name={this.props.inputName}
          onChange={this.props.onChange}
          value={this.props.value}
          pattern={this.props.pattern}
          title={this.props.title}
        ></input>
      </div>
    );
  }
}

export default AddCardForm;
