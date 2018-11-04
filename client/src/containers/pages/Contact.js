import React from 'react';
import styled from 'styled-components';
import Header from '../../components/ui/header/Header';
import Footer from '../../components/ui/footer/Footer';
import Box from '../../components/ui/boxes/ContactBox';

const StyledContainer = styled.div`

`;

class Contact extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<StyledContainer>
				<Header />
				<Box />
				<Footer />
			</StyledContainer>
		);
	}
}

export default Contact;