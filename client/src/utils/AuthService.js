import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthService {
    // Initializing import variables
    constructor(domain) {
        //this.domain = domain || 'http://localhost:4001'; // API server domain
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(username, password) {
        return axios.post('/auth/login', {
            username: username,
            password: password
        }).then(res => {
            //console.log(res.data.token);
            this.setToken(res.data.token);
            return Promise.resolve(res);
        })
    }

    register(username, password) {
        return axios.post('/auth/register', {
            username: username,
            password: password
        }).then(res => {
            //console.log('herere');
            this.setToken(res.data.token);
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from localStorage
        console.log(token);
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() /1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }
}