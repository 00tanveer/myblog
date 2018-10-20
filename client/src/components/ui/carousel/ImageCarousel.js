import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CarouselContainer = styled.div`
  display: flex;
  margin: 0 0 20px 20px;
  transition: ${props => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${props => {
    if (!props.sliding) return "translateX(calc(-80% - 20px))";
    if (props.direction === "prev")
      return "translateX(calc(2 * (-80% - 20px)))";
    return "translateX(0%)";
  }};
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CarouselSlot = styled.div`
  flex: 1 0 100%;
  flex-basis: 80%;
  margin-right: 20px;
  order: ${props => props.order};
`;

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      direction: "next",
      sliding: false
    };
  }

  getOrder(itemIndex) {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;

    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position);
    }

    return itemIndex - position;
  }

  nextSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length || 1;

    this.doSliding("next", position === numItems - 1 ? 0 : position + 1);
  };

  prevSlide = () => {
    const { position } = this.state;
    const { children } = this.props;
    const numItems = children.length;

    this.doSliding("prev", position === 0 ? numItems - 1 : position - 1);
  };

  doSliding = (direction, position) => {
    this.setState({
      sliding: true,
      direction,
      position
    });

    setTimeout(() => {
      this.setState({
        sliding: false
      });
    }, 50);
  };
  render() {
    const { title, children } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        <Wrapper>
          <CarouselContainer>
            {children.map((child, index) => {
              <CarouselSlot key={index} order={this.getOrder(index)}>
                {child}
              </CarouselSlot>;
            })}
          </CarouselContainer>
        </Wrapper>
      </div>
    );
  }
}

Carousel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default Carousel;
