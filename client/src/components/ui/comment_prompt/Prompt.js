import React from 'react';
import styled from 'styled-components';
import Box from '../boxes/CommentBox';

const StyledContainer = styled.div`
	display: ${props => props.display ? 'flex' : 'none'};
	position: fixed;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	left: 0;
	top: 0;
	background-color: rgb(0,0,0); /* Fallback color */
	background-color: rgba(0,0,0,0.8);
	margin: 0;
	z-index: 4000;
  .wrapper {
    display: flex;
    margin: 0 auto;
  }
`;

class Prompt extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    console.log(node);
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    console.log(event.target);
    console.log(this.wrapperRef); 
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.commentPromptHandler();
    }
  }
	render() {
    return(
      <StyledContainer display={this.props.display}>
        <div className="wrapper" ref={this.setWrapperRef}>
          <Box 
            blog={this.props.blog}/>
        </div>
      </StyledContainer>
    );
  } 
}

export default Prompt;