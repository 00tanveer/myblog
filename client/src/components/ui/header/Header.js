import React from 'react';
import Menu from '../../navigation/Menu';
import SearchBar from '../search_bar/SearchBar';

import styled from 'styled-components';

const Title = styled.p`
  //position: relative;
  //top: 50%;
  //left: 50%;
  //transform: translate(-50%, 50%);
  color: white;
  font-family: "Great Vibes", cursive;
  font-weight: 300;
  text-shadow: 0 0 3px white;
  text-align: center;
  letter-spacing: 1rem;
`;

const StyledHeader = styled.div`
  position: fixed;
  z-index: 4000;
  top: 0;
  width: 100%;
  background-color: black;
  display: grid;
  grid-template-columns: 70px 1fr 1fr 150px;  
  grid-template-areas: 'menu title title search_bar';
  padding: 20px 0 0 20px;
  .menu {
    grid-area: menu;
  }
  .title {
    grid-area: title;
    display: flex;
    justify-content: center;
    align-content: center;
    p {
      margin: 0 auto;
      font-size: 2rem;
    }
  }
  .search_bar {
    grid-area: search_bar;
    padding: 9px;
  }
  @media (min-width: 500px) {
    .title {
      p {
        font-size: 3.5rem;
      }
    }
  }
`;

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<StyledHeader>
				<div className="title"><Title>City of Troy</Title></div>
				<div className="menu"><Menu/></div>
				<div className="search_bar"><SearchBar /></div>
			</StyledHeader>
		);
	}
}

export default Header;