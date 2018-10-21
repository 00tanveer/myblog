import React from "react";
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import AuthService from '../../utils/AuthService';
import Header from '../../components/ui/header/Header';
import Footer from '../../components/ui/footer/Footer';
import Card from '../../components/ui/blog_card/Card';
import Button from '../../components/ui/Button';

const auth = new AuthService();

const StyledContainer = styled.div`
  margin-bottom: 80px;
`;

class Fashion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: []
    }
  }

  componentDidMount() {
    axios.get('/blogs/blogs').then(res => {
      if (res.data.data.length !== 0) {
        this.setState({
          blogs: res.data.data
        }, () => console.log(this.state.blogs))
      }
    })
  }

  render() {
    console.log('here in fashion');
    console.log(this.state.blogs);
    console.log(auth.loggedIn());
    return (
      <StyledContainer>
        <Header />
        <Footer />
        {/* {
          !_.isEmpty(this.state.blog) ? <Card blog={this.state.blog}/> : null
        } */}
        {/* <Card /> */}
        <Button label="MORE" />
        {
          auth.loggedIn() ? 
          <div className="post-button">
            <Button className="post-button" label="POST" />
          </div> : null
        }
        {/* <div className="post-button">
          <Button className="post-button" label="POST" />
        </div> */}
      </StyledContainer>
    );
  }
}

export default Fashion;
