import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const StyledContainer = styled.div`
	display: ${props => props.display ? 'flex' : 'none'};
	position: fixed;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	left: 0;
	top: 0;
	background-color: rgb(0,0,0); /* Fallback color */
	background-color: rgba(0,0,0,0.4);
	opacity: 0.9;
	margin: 0;
	z-index: 4000;
`;

const Box = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -60%);
	width: 50%;
	height: 35%;
	color: white;
	background-color: black;
	z-index: 7000;
	p {
		text-align: center;
		font-size: 2.4rem;
		margin: 40px;
	}
	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		button {
			margin: 20px;
			width: 100px;
		}
	}
`;

const Prompt = (props) => {
	return(
		<StyledContainer display={props.display}>
			<Box>
				<p>Are you sure you want to delete this article?</p>
				<div className="buttons">
					<Button label="Yes" />
					<Button clickHandler={props.clickHandler} label="No" />
				</div>
			</Box>
		</StyledContainer>
	);
}

export default Prompt;