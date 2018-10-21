import React from "react";
import styled from "styled-components";
import Plx from "react-plx";
import theme from "../../../styles/theme";

import Underline from "../../../components/ui/Underline";
import Button from "../../../components/ui/Button";

const StyledBox = styled.div`
  padding: 0 40px;
  .container {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    color: white;
    background-color: ${theme.maroon};
    //height: 80vh;
    max-width: 650px;
    margin: 100px 0 100px 0;
    padding: 20px 0 30px 0;
    /* display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center; */
    .i1 {
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translate(-50%, 0);
      text-align: center;
      font-family: "Great Vibes", cursive;
      font-size: 6rem;
      z-index: 3000;
    }
    .i2 {
      width: 75%;
      position: relative;
      top: 45px;
      left: 50%;
      transform: translate(-50%, 0);
      //margin: 0 30px;
      text-align: center;
      line-height: 1.6;
      font-family: "Raleway", sans-serif;
      font-size: 2rem;
    }
    form {
      width: 40vw;
      //height: 30vh;
      position: relative;
      //top: 40vh;
      margin-top: 75px;
      left: 50%;
      transform: translate(-50%, 0);
      /* display: flex;
      flex-direction: column;
      justify-content: space-around; */
      .row {
        margin-bottom: 20px;
        input {
          display: block;
          width: 100%;
          padding: 10px;
          font-size: 18px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: none;
          transition: all 200ms ease-in;
          border-style: solid;
          border-width: 0 0 0 0;
          border-color: white;
          //transition: border-width 300ms ease-in;
          &:focus {
            outline: none;
            //border-width: 0 0 2px 0;
          }

          &:focus + div {
            width: 100%;
          }
        }
      }

      button {
        margin: 25px auto 10px auto;
        font-size: 1.6rem;
        letter-spacing: 0.1em;
      }
    }
  }
`;

const exampleData = [
  {
    start: "self",
    end: "70vh",
    //startOffset: 200,
    duration: 150,
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: "scale"
      },
      {
        startValue: 0,
        endValue: 1,
        property: "opacity"
      }
    ]
  },
  {
    start: ".filler",
    startOffset: 200,
    duration: 350,
    properties: [
      {
        startValue: 1,
        endValue: 0,
        property: "opacity"
      }
    ]
  }
];

class Box extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledBox>
        <Plx className="example" parallaxData={exampleData}>
          <div className="container">
            <p className="i1">Subscribe</p>
            <p className="i2">
              Hey everyone! Don't want to miss any of my stories? Sign up via
              email to receive updates about my latest and greatest!
            </p>
            <form>
              <div className="row">
                <input className="name" type="text" placeholder="YOUR NAME" />
                <Underline />
              </div>
              <div className="row">
                <input
                  className="email"
                  type="email"
                  placeholder="YOUR EMAIL"
                />
                <Underline />
              </div>
              <Button label="SIGN ME UP" />
            </form>
          </div>
        </Plx>
      </StyledBox>
    );
  }
}

export default Box;
