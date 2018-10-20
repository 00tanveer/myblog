import React from "react";
import Header from "../../components/ui/header/Header";
import _ from "lodash";
import Footer from "../../components/ui/footer/Footer";
import Carousel from "../../components/ui/carousel/Carousel";
import Box from "../../components/ui/subscription_box/Box";
import Card from "../../components/ui/blog_card/Card";

var slides = [
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?fit=crop&fm=jpg&h=825&q=80&w=1325",
  "https://images.unsplash.com/photo-1445251836269-d158eaa028a6?fit=crop&fm=jpg&h=825&q=80&w=1325",
  "https://images.unsplash.com/photo-1443926818681-717d074a57af?fit=crop&fm=jpg&h=825&q=80&w=1325"
];

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true
    };
    // this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // window.addEventListener('scroll', _.debounce(() => {
    //   let el = document.getElementById('root');
    //   console.log(el);
    //   let minPixel = el.offsetTop;
    //   console.log(minPixel);
    // }, 300));
  }
  //AUTH
  // logout() {
  //     this.props.auth.logout();
  //     this.setState({ authenticated: false });
  // }

  render() {
    //const { isAuthenticated } = this.props.auth;
    //console.log(isAuthenticated());
    return (
      <div className="landing_container">
        <Header />
        {/* <H3>Visit this link from time to time. You'll see updates here. :)</H3> */}
        <Carousel slides={slides} />
        <Box />
        <div
          className="filler"
          // style={{ backgroundColor: "black", height: "100vh", width: "100vw" }}
        >
          {/* <Card /> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Landing;
