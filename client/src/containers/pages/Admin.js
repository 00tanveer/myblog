import React from 'react';
import withAuth from '../../components/HOC/withAuth';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.p`
	color: white;
	font-size: 3.5rem;
  font-family: "Great Vibes", cursive;
  font-weight: 300;
	margin-top: 20px;
  text-shadow: 0 0 3px white;
  text-align: center;
  letter-spacing: 1rem;
	cursor: pointer;
`;

const StyledContainer = styled.div`

`;

class Admin extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<StyledContainer>
				<Link style={{ textDecoration: 'none'}} to="/" >
					<Title>City of Troy</Title>
				</Link>
			</StyledContainer>
		);
	}
}

export default withAuth(Admin);