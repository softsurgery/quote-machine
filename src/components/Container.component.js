import React from "react";
import { random } from "../data/quotes";
import Fade from "react-reveal/Fade";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Press the button to start...",
      author: "",
      color: "black",
      show: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTwitterPost = this.handleTwitterPost.bind(this);
  }

  handleSubmit(event) {
    this.setState({ show: false });
    random().then((newQuote) => {
      this.setState({ color: newQuote.color });
      this.setState({ text: newQuote.text });
      this.setState({ author: newQuote.author });
      setTimeout(() => {
        this.setState({ show: true });
      }, "600");
    });
  }

  handleTwitterPost = (event) => {
    const text = this.state.text.replace(/ /g, "%20");
    window.open(
      "https://www.twitter.com/intent/tweet?text=" +
        text +
        "%0A - " +
        this.state.author,
      "_blank"
    );
  };

  render() {
    const transition = {
      transition: "all 3s ease",
      WebkitTransition: "all 3s ease",
      MozTransition: "all 3s ease",
    };

    const generateStyle = (color) => {
      return {
        backgroundColor: color,
        textAlign: "center",
        width: "100%",
        height: "1000vh",
      };
    };

    const generateStyleFont = (color, fontSize) => {
      return {
        color: color,
        fontSize: fontSize,
        fontStyle: "italic",
      };
    };

    const generateStyleButton = (color, fontSize) => {
      return {
        backgroundColor: color,
      };
    };

    return (
      <div>
        <div style={{ ...generateStyle(this.state.color), ...transition }}>
          <div className="center content">
            <div className="container">
              <div className="row">
                <div className="col">
                  <Fade opposite when={this.state.show}>
                    <p
                      className="font-quote"
                      style={{
                        ...generateStyleFont(this.state.color, "22px"),
                        ...transition,
                      }}
                    >
                      {" "}
                      <i
                        className={this.state.text ? "fa fa-quote-left" : ""}
                      ></i>{" "}
                      {this.state.text}
                    </p>
                  </Fade>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Fade opposite when={this.state.show}>
                  <p
                    className="font-quote"
                    style={{
                      ...generateStyleFont(this.state.color, "17px"),
                      ...transition,
                    }}
                  >
                    {this.state.author ? "-": ""}{this.state.author}
                  </p>
                </Fade>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button
                  onClick={this.handleSubmit}
                  className="accept"
                  style={{
                    ...generateStyleButton(this.state.color, "12px"),
                    ...transition,
                  }}
                >
                  New Quote
                </button>
                <div className="col">
                  <button
                    onClick={this.state.author ? this.handleTwitterPost : ""}
                    className="twitter"
                    style={{
                      ...generateStyleButton(this.state.color, "23px"),
                      ...transition,
                    }}
                  >
                    <i className={this.state.text ? "fa fa-twitter" : ""}></i>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Container;