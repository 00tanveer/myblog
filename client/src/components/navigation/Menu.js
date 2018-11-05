import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../styles/theme";
class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      take: "",
      checked: false
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    let update_height = window.innerHeight;
    let update_width = window.innerWidth;
    this.setState({ height: update_height, width: update_width }, () => {
      if (update_height >= update_width) {
        this.setState({ take: "height" });
      } else {
        this.setState({ take: "width" });
      }
    });
  }

  componentDidMount() {
    //console.log(window.innerWidth);
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  returnHeightOrWidth() {
    return this.state.take === "height" ? this.state.height : this.state.width;
  }

  render() {
    //console.log(window.innerWidth);

    // const theme = {
    //   main: "white"
    // };

    const StyledLol = styled.div`
      > .navigation {
        > .checkbox {
          display: none;
        }

        > .button {
          display: block;
          position: relative;
          //background-color: yellow;
          //background-color: ${props => props.theme.main};
          background-color: ${props => props.theme.maroon};
          height: 4.5rem;
          width: 4.5rem;
          //position: fixed;
          //top: 3vh;
          //left: calc(${this.state.height}px / 27);
          border-radius: 50%;
          z-index: 2000;
          box-shadow: 0 4px 4rem rgba(${props => props.theme.maroon}, 0.1);
          text-align: center;
          cursor: pointer;

          > span {
            //margin-right: .5rem;
            display: inline-block;
          }

          > .icon {
            position: relative;
            margin-top: 2.15rem;

            &,
            &:before,
            &:after {
              width: 2rem;
              height: 1px;
              background-color: ${props => props.theme.white};
              display: inline-block;
            }

            &:before,
            &:after {
              content: "";
              position: absolute;
              left: 0;
              transition: all 0.8s;
            }

            &:before {
              top: -0.8rem;
            }
            &:after {
              top: 0.8rem;
            }
          }
        }

        > .background {
            position: absolute;
            top: 0;
            left: 0;
            height: 4.5rem;
            width: 4.55rem;
            border-radius: 50%;
            //position: fixed;
            /* top: 3rem;
            left: 3rem; */
            /* background-image: linear-gradient(
              to bottom right,
              black 75%,
              ${props => props.theme.main} 25%
            ); */
            background-color: black;
            z-index: 1000;
            transition: transform 0.4s cubic-bezier(.01,.69,.83,.67);
          }

        > .navi {
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1500;
          pointer-events: none;
          opacity: 0;
          width: 0;
          //transition: all 0.1s;
          transition: all 0.4s cubic-bezier(.01,.69,.83,.67);

          > .list_ {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            list-style: none;
            text-align: center;
            //width: 100%;

            > .item {
              margin: 1rem;

              > .link_ {
                &,
                &:visited {
                  display: inline-block;
                  font-size: 3.3rem;
                  font-family: "Raleway", sans-serif;
                  letter-spacing: .1em;
                  font-weight: 100;
                  padding: 1rem 2rem;
                  width: 33rem;
                  color: ${props => props.theme.white};
                  text-shadow: 0 0 3px ${props => props.theme.white};
                  text-decoration: none;
                  text-transform: uppercase;
                  background-image: linear-gradient(
                    110deg,
                    transparent 0%,
                    transparent 50%,
                    ${props => props.theme.maroon} 50%
                  );
                  clip-path: polygon(10% 0%, 100% 0, 90% 100%, 0% 100%);
                  background-size: 240%;
                  transition: all 0.4s;
                }
                &:hover,
                &:active {
                  background-position: 100%;
                  color: ${props => props.theme.white};
                  transform: translateX(1rem);
                  font-weight: 300;
                }

                > span {
                  margin-right: 1.5rem;
                  display: inline-block;
                }
              }
            }
          }
        }

        > .checkbox:checked ~ .background {
          //transform: scale(53);
          transform: scale(calc(${props => props.heightOrWidth} / 17));
          //zoom: 5;
        }
        /* > .checkbox:checked ~ .button {
                    width: 4rem;
                    height: 4rem;
                } */
        > .checkbox:checked ~ .navi {
          opacity: 1;
          width: 100%;
          pointer-events: all;
        }
        > .button:hover > .icon:before {
          //top: -1rem;
          top: calc(-2rem + 1rem);
        }

        > .button:hover > .icon::after {
          top: 1rem;
        }

        > .checkbox:checked + .button > .icon {
          background-color: transparent;
        }
        > .checkbox:checked + .button > .icon:before {
          top: 0;
          transform: rotate(135deg) scale(10,1);
          /* transform: scale(4); */
        }
        > .checkbox:checked + .button > .icon:after {
          top: 0;
          transform: rotate(-90deg) scale(calc(${this.state.height} / 10), 1);
        }
      }
    `;
    //background-image: linear-gradient(110deg, transparent 0%, transparent 60%, yellow 40%);

    return (
      <ThemeProvider theme={theme}>
        <StyledLol heightOrWidth={this.returnHeightOrWidth()}>
          <div className="navigation">
            <input type="checkbox" className="checkbox" id="navi-toggle" />
            <label htmlFor="navi-toggle" className="button">
              <span className="icon">&nbsp;</span>
            </label>

            <div className="background">&nbsp;</div>
            <nav className="navi">
              <ul className="list_">
                <li className="item">
                  <Link to="/about" className="link_">
                    About Me
                  </Link>
                </li>
                <li className="item">
                  <Link to="/fashion" className="link_">
                    Fashion
                  </Link>
                </li>
                <li className="item">
                  <Link to="/beauty" className="link_">
                    Beauty
                  </Link>
                </li>
                <li className="item">
                  <Link to="/art" className="link_">
                    Art
                  </Link>
                </li>
                <li className="item">
                  <Link to="/books" className="link_">
                    Books
                  </Link>
                </li>
                <li className="item">
                  <Link to="/lifestyle" className="link_">
                    Lifestyle
                  </Link>
                </li>
                <li className="item">
                  <Link to="/contact" className="link_">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </StyledLol>
      </ThemeProvider>
    );
  }
}

export default Menu;
