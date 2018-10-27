import React from 'react';
import withAuth from '../../components/HOC/withAuth';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/ui/blog_card/Card';

const StyledContainer = styled.div`

`;

const Title = styled.p`
	color: white;
	font-size: 3.5rem;
  font-family: "Great Vibes", cursive;
  font-weight: 300;
	margin-top: 20px;
	margin-bottom: 20px;
  text-shadow: 0 0 3px white;
  text-align: center;
  letter-spacing: 1rem;
	cursor: pointer;
`;

const SideBar = styled.div`
	position: fixed;
	left: 0;
	height: 100%;
	width: 25vw;
	background-color: rgb(8,8,8);
	.row {
		color: grey;
		text-align: center;
		font-size: 2rem;
		font-family: 'Raleway';
		padding: 10px;
		cursor: pointer;
		&:hover {
			color: white;
		}
	}
	#drafts {
		color: ${props => props.selected === 'drafts' ? 'pink' : 'grey'}
	}
	#posted {
		color: ${props => props.selected === 'posted' ? 'pink' : 'grey'}
	}
	.divider {
		position: relative;
		right: 50%;
		transform: translateX(75%);
		width: 80%;
		height: 1px;
		background-color: grey;
		text-align: center;
	}
`;

const MainPanel = styled.div`
	width: 75vw;
	float: right;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	select {
		height: 30px;
		width: 100px;
	}
`;

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'drafts',
			genre: 'fashion',
			blogs: [],
		}
		this.rowClickHandler = this.rowClickHandler.bind(this);
		this.selectOnChangeHandler = this.selectOnChangeHandler.bind(this);
	}

	componentDidMount() {
		axios.get(`/blogs/all/${this.state.genre}?posted=${this.state.selected==='posted'}`).then(res => {
			if (res.data.data.length !==0) {
				this.setState({
					blogs: res.data.data
				})
			}
		})
	}

	rowClickHandler() {
		if (this.state.selected === 'drafts') {
			this.setState({ selected: 'posted'}, () => {
				axios.get(`/blogs/all/${this.state.genre}?posted=${this.state.selected==='posted'}`).then(res => {
					console.log('yo');
					this.setState({
						blogs: res.data.data
					})
				})
			});
		} else {
			this.setState({ selected: 'drafts' }, () => {
				axios.get(`/blogs/all/${this.state.genre}?posted=${this.state.selected==='posted'}`).then(res => {
					console.log('yoyo');
					this.setState({
						blogs: res.data.data
					})
				})
			});
		}
	}

	selectOnChangeHandler(e) {
		this.setState({genre: e.target.value}, () => {
			axios.get(`/blogs/all/${this.state.genre}?posted=${this.state.selected==='posted'}`).then(res => {
				this.setState({
					blogs: res.data.data
				})
			})
		})
	}

	render() {
		return(
			<StyledContainer>
				<Link style={{ textDecoration: 'none'}} to="/" >
					<Title>City of Troy</Title>
				</Link>
				<SideBar selected={this.state.selected}>
					<div onClick={this.rowClickHandler} className="row" id="drafts">Drafts</div>
					<div className="divider"></div>
					<div onClick={this.rowClickHandler} className="row" id="posted">Posted</div>
				</SideBar>
				<MainPanel>
					<select onChange={this.selectOnChangeHandler} defaultValue="fashion">
						<option value="fashion">Fashion</option>
						<option value="beauty">Beauty</option>
						<option value="art">Art</option>
						<option value="books">Books</option>
						<option value="lifestyle">Lifestyle</option>
					</select>
					{
						this.state.blogs.length !== 0
						?
						this.state.blogs.map(blog => {
							return <Card key={blog._id} blog={blog} />
						})
						:
						null
					}
				</MainPanel>
			</StyledContainer>
		);
	}
}

export default withAuth(Admin);