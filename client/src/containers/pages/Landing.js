import React from "react";
import Header from "../../components/ui/header/Header";
import Footer from "../../components/ui/footer/Footer";
import Carousel from "../../components/ui/carousel/Carousel";
import Box from "../../components/ui/boxes/SubscriptionBox";

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
  }

  render() {
    return (
      <div className="landing_container">
        <Header />
        <Carousel slides={slides} />
        <Box />
        <div
          className="filler"
          // style={{ backgroundColor: "black", height: "100vh", width: "100vw" }}
        >
        </div>
        <Footer />
      </div>
    );
  }
}

export default Landing;
