import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    display: block;
    margin: 0 auto;
    width: 400px;
    height: 40px;
    font-size: 2rem;
    margin-top: 40px;
    padding: 10px;
`
const Input = props => {
    
    return (
			<StyledInput 
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}/>
    );
}

export default Input;