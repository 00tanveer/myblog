import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import styled from 'styled-components';

const CarouselContainer = styled.div`
	.carousel {
		width: 100vw;
		height: 84vh;
		margin-top: 70px;
		overflow: hidden;

		&__slide {
			width: 100%;
			height: 100%;
			div {
				//position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-size: cover;
			}
		}
	}
	.rotate-appear {
		filter: grayscale(100%);
		transition: all 500ms ease-in-out;
	}
	.rotate-appear {
		&.rotate-appear-active {
			filter: grayscale(10);
		}
	}
	.rotate-enter {
		filter: hue-rotate(-320deg);
		opacity: .01;
	}
	.rotate-enter {
		&.rotate-enter-active {
			filter: hue-rotate(0deg);
			opacity: 1;
			transition: all 500ms ease-in-out;
		}
	}

	.rotate-leave {
		filter: hue-rotate(0deg);
		opacity: 1;
		transform: scale(1)
	}

	.rotate-leave {
		&.rotate-leave-active {
			filter: hue-rotate(320deg);
			opacity: .01;
			//transform: scale(1.5);
			transform-origin: center;
			transition: all 500ms ease-in-out;
		}
	}
`;

class Carousel extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			transition: 'rotate',
			appearTransition: true,
			counter: 0,
			secondsElapsed: 0
		};

		this.prevSlide = this.prevSlide.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
	}

	componentDidMount() {
		this.timeId = setInterval(
			() => this.tick(),
			1000
		);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tick() {
		let seconds = this.state.secondsElapsed + 1;
		if (seconds === 4) {
			this.nextSlide();
			this.setState({
				secondsElapsed: 0
			})
		} else {
			this.setState({
				secondsElapsed: seconds
			});
		}
	}
	prevSlide() {
		var prevSlide = this.state.counter - 1 < 0 ?
			this.props.slides.length - 1 : this.state.counter -1;
		this.setState({
			counter: prevSlide
		});
	}

	nextSlide() {
		var nextSlide = this.state.counter + 1 < this.props.slides.length ? 
			this.state.counter + 1 : 0;
		this.setState({
			counter: nextSlide
		});
	}

	render() {
		// console.log('hererere');
		// console.log(this.props.slides);
		var style = {
			backgroundImage: 'url(' + this.props.slides[this.state.counter]  + ')',
			backgroundPosition: 'center',
			backgroundSize: 'cover'
		}
		return(
			<CarouselContainer>
				<div className="carousel">
					<div className="carousel__prev" onClick={this.prevSlide}>◀︎</div>
					<div className="carousel__next" onClick={this.nextSlide}>▶︎</div>
					<CSSTransitionGroup 
						transitionName={this.state.transition} 
						transitionEnterTimeout={1000} 
						transitionLeaveTimeout={1000} 
						component="div" 
						className="carousel__slide" 
						transitionAppear={this.state.appearTransition} 
						transitionAppearTimeout={1000}>
						<div style={style} key={this.state.counter}></div>
					</CSSTransitionGroup>
				</div>
			</CarouselContainer>
		);
	}
}

export default Carousel;