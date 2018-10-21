import React from 'react';
import Form from '../../components/forms/Form';
import AuthService from '../../utils/AuthService';

class RegisterOrLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.Auth = new AuthService();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentWillMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/');
        }
    }
    handleFormSubmit(e) {
        e.preventDefault();

        if (this.props.mode === 'Login') {
            this.Auth.login(this.state.username, this.state.password)
                .then(res => {
                    console.log('Logged in');
                    this.props.history.replace('/');
                })
                .catch(err => {
                    alert(err);
                })
        } else {
            this.Auth.register(this.state.username, this.state.password)
                .then(res => {
                    console.log('Registered');
                    this.props.history.replace('/');
                })
                .catch(err => {
                    alert(err);
                })
        }
        
    }

    handleUserName(e) {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({username: e.target.value}, () => {
            //console.log(this.state);
        })
    }

    handlePassword(e) {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({password: e.target.value}, () => {
            //console.log(this.state);
        })
    }
    render() {
        return (
            <Form 
                mode={this.props.mode}
                usernameHandler = {this.handleUserName}
                passwordHandler = {this.handlePassword}
                handleSubmit = {this.handleFormSubmit} />
        );
    }
}

export default RegisterOrLogin;