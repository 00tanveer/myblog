import React from "react";
import history from '../../history';
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
    this.postButtonHandler = this.postButtonHandler.bind(this);
  }

  componentDidMount() {
    axios.get('/blogs/all').then(res => {
      if (res.data.data.length !== 0) {
        this.setState({
          blogs: res.data.data
        }, () => console.log(this.state.blogs))
      }
    })
  }

  postButtonHandler() {
    axios.post('/blogs/create').then(res => {
      console.log(res.data);
      let blogId = res.data.data._id;
      history.replace(`/fashion/post/${blogId.toString()}`);
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
              <Button className="post-button" clickHandler={this.postButtonHandler} label="POST" />
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
