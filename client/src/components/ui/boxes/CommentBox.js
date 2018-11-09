import React from "react";
import styled from "styled-components";
import axios from 'axios';
import theme from "../../../styles/theme";

import Underline from "../Underline";
import Button from "../Button";

const StyledBox = styled.div`
  //padding: 0 40px;
  margin: 0 auto;
  .container {
    min-width: 400px;
    //position: relative;
    //left: 50%;
    //transform: translateX(-50%);
    //display: block;
    color: white;
    background-color: ${theme.maroon};
    //height: 80vh;
    max-width: 800px;
    //margin: 180px 0 100px 0;
    margin-top: 80px;
    padding: 20px 40px 30px 40px;
    /* display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center; */
    .i1 {
      position: relative;
      //top: -40px;
      left: 50%;
      transform: translate(-50%, 0);
      text-align: center;
      font-family: "Great Vibes", cursive;
      font-size: 4rem;
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
      //width: 40vw;
      //height: 30vh;
      position: relative;
      //top: 40vh;
      margin-top: 30px;
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
          }

          &:focus + div {
            width: 100%;
          }
        }
				textarea {
					display: block;
					width: 100%;
					height: 200px;
					padding: 10px;
					font-size: 18px;
					transition: all 200ms ease-in;
					border-style: solid;
					border-width: 0 0 0 0;
					&:focus {
						outline: none;
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

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
			email: '',
			comment: ''
    }
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
		this.emailChangeHandler = this.emailChangeHandler.bind(this);
		this.subjectChangeHandler = this.subjectChangeHandler.bind(this);
		this.commentChangeHandler = this.commentChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nameChangeHandler(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }
  emailChangeHandler(e) {
    let email = e.target.value;
    this.setState({ email: email })
	}
	subjectChangeHandler(e) {
		let subject = e.target.value;
		this.setState({ subject: subject });
	}
	commentChangeHandler(e) {
		let comment = e.target.value;
		this.setState({ comment: comment });
	}
  handleSubmit(e) {
    e.preventDefault();
    console.log('submit button clicked');
    let commenter = {
      name: this.state.name.toLowerCase(),
			email: this.state.email,
			comment: this.state.comment
    }
		if (this.state.name === '' ||
				this.state.comment === '') {
      alert('Fill up all fields');
    } else {
      axios.post(`/blogs/comments/${this.props.blog._id}`, { commenter }).then(res => {
        this.setState({
          name: '',
					email: '',
					comment: ''
        }, () => {
					window.location.reload();
				})
      })
    }
  }

  render() {
    return (
      <StyledBox>
				<div className="container">
            <p className="i1">Join the conversation</p>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <input
                  className="name"
                  type="text"
                  value={this.state.name}
                  placeholder="YOUR NAME"
                  onChange={this.nameChangeHandler}
                />
                <Underline />
              </div>
              <div className="row">
                <input
                  className="email"
                  type="email"
                  value={this.state.email}
                  placeholder="YOUR EMAIL"
                  onChange={this.emailChangeHandler}
                />
                <Underline />
              </div>
							<div className="row">
								<textarea
									className="comment"
									value={this.state.comment}
									placeholder="YOUR COMMENT"
									onChange={this.commentChangeHandler}
								/>
							</div>
              <Button label="POST COMMENT" />
            </form>
          </div>
      </StyledBox>
    );
  }
}

export default Box;
