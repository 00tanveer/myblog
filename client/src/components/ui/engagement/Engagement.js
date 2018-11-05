import React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const StyledContainer = styled.div`
	margin: 20px 20% 20px 20%;
	button {
		color: white;
		cursor: pointer;
		margin: 10px;
		padding: 5px 9px;
		background-color: ${theme.maroon};
		border: 1px solid ${theme.white};
		border-radius: 10px;
		transition: all 200ms ease-in;
		&:hover {
			background-color: ${theme.black};
			color: ${theme.white};
			transform: scale(1.1);
		}
	}
`;

const Engagement = () => {
	return(
		<StyledContainer>
			<button>Like</button>
			<span>•</span>
			<button>Comment</button>
			<span>•</span>
			<button><i className="fab fa-facebook"/> Share</button>
		</StyledContainer>
	);
}

export default Engagement;