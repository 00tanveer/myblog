import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Header from '../../components/ui/header/Header';
import Footer from '../../components/ui/footer/Footer';

const StyledContainer = styled.div`
	margin-bottom: 80px;
	color: white;
`;

const Title = styled.p`
	font-size: 6rem;
	text-align: center;
	margin-top: 140px;;
`;

const Meta = styled.div`
	font-size: 1.7rem;
	text-align: center;
	font-family: cursive;
	margin-top: 15px;
`;

const Body = styled.div`
	.quill {
		.ql-container {
			border: none;
		}
	}
`;

class Article extends React.Component {
	constructor(props) {
		super(props);
		const {match} = this.props;
		let blogId = match.params.title.split('-');
		blogId = blogId[blogId.length - 1];
		this.state = {
			title: match.params.title,
			blogId: blogId,
			blog: {},
			//quill states
			editorHtml: ''
		}
		this.quillRef = null;
		this.reactQuillRef = null;
		this.attachQuillRefs = this.attachQuillRefs.bind(this);
	}

	componentDidMount() {
		axios.get(`/blogs/${this.state.blogId}`).then(res => {
			console.log(res.data.data.docs[0]);
			this.setState({blog: res.data.data.docs[0]});
			this.quillRef.setContents(res.data.data.docs[0].delta_ops);
			this.quillRef.disable();
		});
	}

	componentDidUpdate() {
		this.attachQuillRefs();
	}

	attachQuillRefs = () => {
		if (typeof this.reactQuillRef.getEditor !== 'function') return;
		if (this.quillRef != null) return;

		const quillRef = this.reactQuillRef.getEditor();
		if (quillRef != null) this.quillRef = quillRef;
	};

	render() {

		let date = new Date(this.state.blog.date);
    let day = date.getDate();
    let year = date.getFullYear();
    let locale = "en-us";
    let month = date.toLocaleString(locale, { month: "long" });
		date = month + ' ' + day + ', ' + year;
		
		//convert delta ops to html
    let deltaOps = this.state.blog.delta_ops;
    let cfg = {};
    let converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
		let html = converter.convert();
		const ArticleBody = ReactHtmlParser(html);
		console.log(ArticleBody);
		//quill config
		const modules = {
			toolbar : false
		}
		return(
			<StyledContainer>
				<Header />
				<Title>{this.state.blog.title}</Title>
				{/* {ArticleBody} */}
				<Meta><span>{date}</span></Meta>
				<Body>
					<ReactQuill 
						ref={el => {
							this.reactQuillRef = el;
						}}
						modules={modules}
						defaultValue={this.state.editorHtml}
					/>
				</Body>
				<Footer />
			</StyledContainer>
		);
	}
}

export default Article;