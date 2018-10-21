import React from "react";
import axios from 'axios';
import _ from 'lodash';
import Header from '../../components/ui/header/Header';
import Footer from '../../components/ui/footer/Footer';
import Card from '../../components/ui/blog_card/Card';
import Button from '../../components/ui/Button';

class Fashion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {}
    }
  }

  componentDidMount() {
    axios.get('/blogs/blogs').then(res => {
      if (res.data.data.length !== 0) {
        this.setState({
          blog: res.data.data[0]
        }, () => console.log(this.state.blog))
      }
    })
  }

  render() {
    console.log('here in fashion');
    console.log(this.state.blog);
    return (
      <div className="fashion_container" style={{marginBottom: 80}}>
        <Header />
        <Footer />
        {
          !_.isEmpty(this.state.blog) ? <Card blog={this.state.blog}/> : null
        }
        {/* <Card /> */}
        <Button label="MORE" />
      </div>
    );
  }
}

export default Fashion;
