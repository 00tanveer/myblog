import React from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';

const TextInput = (props) => (
    <input 
        type={props.type} 
        name={props.name}
        placeholder={props.placeholder}
        value={props.content}
        onChange={props.onChangeHandler}/>
);

const Input = styled.input``;
const StyledInput = Input.withComponent(Button);

const StyledForm = styled.div`
    > .formcontainer {
        position: absolute;;
        left: 50%;
        transform: translateX(-50%) translateY(70%);
        >form {
            > .row{
                margin-bottom: 3rem;
                > input {
                    height: 4rem;
                    border-style: solid;
                    border-radius: 2px;
                    padding: 1rem;
                }   
            }
            > .button-row {
                display: flex;
                flex-direction: row;
                justify-content: center;
                > * {
                    flex: 1;
                    margin: 1rem;

                    &:hover {
                        transform: translateY(-.2rem);
                    }
                }
            }
        }
    }
`;

function Form (props){
    return(
        <StyledForm>
            <div className='formcontainer'>
                <form onSubmit={props.handleSubmit}>
                    <div className='row'>
                        <TextInput 
                            name='username'
                            type='text'
                            placeholder='Insert username'
                            onChangeHandler={props.usernameHandler}
                            content={props.username}/>
                    </div>
                    <div className='row'>
                        <TextInput 
                            name='password'
                            type='password'
                            placeholder='Insert password'
                            onChangeHandler={props.passwordHandler}
                            content={props.password}/>
                    </div>
                    <div className='button-row'>
                        <StyledInput 
                            type='submit' 
                            label={props.mode}
                        />
                    </div>
                </form>
            </div>
        </StyledForm>
    );
}

export default Form;