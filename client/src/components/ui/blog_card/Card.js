import React from "react";
import axios from 'axios';
import history from '../../../history';
import styled from "styled-components";
import theme from '../../../styles/theme';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Button from "../Button";
import Prompt from '../delete_prompt/Prompt';
import AuthService from "../../../utils/AuthService";

const auth = new AuthService();

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 800px;

  color: white;
  font-family: "Raleway";
  text-align: center;
  margin: 50px;
  .card_text {
    > * {
      margin-bottom: 10px;
    }
  }
  .thumbnail {
    max-height: 445px;
    max-width: 445px;
    //margin: 10px;
    margin-bottom: 10px;
    > * {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 600px) {
    flex-direction: row;
    max-width: 1100px;
    max-height: 520px;
    margin: 70px auto;
    .card_text {
      position: relative;
      max-width: 620px;
      height: 100%;
      margin: 0 30px;
      align-content: center;
      padding: 85px 0;
      > * {
        margin-bottom: 20px;
      }
      .controls {
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: white;
        top: 20px;
        font-size: 2rem;
        i {
          margin: 10px;
          cursor: pointer;
          &:hover {
            color: ${theme.maroon}
          }
        }
      }
    }
    .thumbnail {
      /* margin: 0 50px;
      align-content: center; */
      overflow: hidden;
      div {
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
`;
const TitleImage = styled.div`
  //height: 100%;
  img {
    //height: 100%;
    width: 100%;
  }
`;
const Tags = styled.div`
  font-size: 2rem;
  span {
    a {
      text-decoration: none;
      color: white;
      margin-right: 10px;
    }
  }
  //margin-bottom: 10px;
`;
const Title = styled.p`
  font-size: 4rem;
  //margin-bottom: 10px;
`;
const Meta = styled.div`
  font-size: 1.5rem;
  font-family: cursive;
  //margin-bottom: 10px;
`;
const Excerpt = styled.div`
  font-size: 1.5rem;
  line-height: 1.4;
  cursor: pointer;
  p {
    img {
      max-width: 50%;
    }
  }
`;
const ShareBar = styled.span`
  font-size: 2rem;
  > * {
    margin: 0 10px;
    cursor: pointer;
  }
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn(),
      deletePromptDisplay: false
    }
    this.onCardClick = this.onCardClick.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.deleteNegativeHandler = this.deleteNegativeHandler.bind(this);
    this.deletePositiveHandler = this.deletePositiveHandler.bind(this);
  }

  onCardClick() {
    let hyphenatedTitle = this.props.blog.title.split(' ').join('-');
    console.log(hyphenatedTitle);
    history.push(`/fashion/${hyphenatedTitle}-${this.props.blog._id}`);
  }

  editHandler() {
    //alert('wtf');
    history.push(`/${this.props.blog.genre}/post/${this.props.blog._id}`);
  }

  deleteHandler() {
    let value = this.state.deletePromptDisplay;
    this.setState({ deletePromptDisplay: !value });
  }
  deleteNegativeHandler() {
    let value = this.state.deletePromptDisplay;
    this.setState({ deletePromptDisplay: !value });
  }

  deletePositiveHandler() {
    let value = this.state.deletePromptDisplay;
    axios.delete(`/blogs/remove/${this.props.blog._id}`).then(res => {
      console.log(res.data);
      this.setState({ deletePromptDisplay: !value }, () => {
        window.location.reload();
      });
    })
    
  }

  render() {
    //console.log(this.props.blog);
    let date = new Date(this.props.blog.date);
    let day = date.getDate();
    let year = date.getFullYear();
    let locale = "en-us";
    let month = date.toLocaleString(locale, { month: "long" });
    date = month + ' ' + day + ', ' + year;

    //convert delta ops to html
    let deltaOps = this.props.blog.delta_ops;
    let cfg = {};
    let converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
    let html = converter.convert();
    let ExcerptText;
    if (!ReactHtmlParser(html)[0]) {
      ExcerptText = '<Nothing written yet>';
    } else {
      ExcerptText = ReactHtmlParser(html)[0].props.children[0];
      let snipped = ExcerptText.props.children[0].substring(0, 200);
      snipped = snipped + '...';
      ExcerptText.props.children[0] = snipped;
    }
    let titleImageLink;
    ReactHtmlParser(html).map(obj => {
      if (obj.type === 'p') {
        obj.props.children.map(obj2 => {
          if (obj2.type === 'img') {
            titleImageLink = obj2.props.src;
          }
        })
      }
    })
    return (
      <CardContainer>
        <div className="thumbnail">
          <TitleImage>
            <img
              src={
                // "https://scontent-amt2-1.cdninstagram.com/vp/c93ec8e1893cac67160f77e281f32cfa/5C5AD543/t51.2885-15/sh0.08/e35/c0.120.964.964/s640x640/40705774_283833208891041_1724639902372870603_n.jpg"
                titleImageLink
              }
            />
          </TitleImage>
        </div>
        <div className="card_text">
          <Tags>{
            this.props.blog.tags.map((tag) => {
              return(
                <span key={tag}><a href="#">{tag}</a>
                </span>
              )
            })
          }</Tags>
          <Title>{this.props.blog.title}</Title>
          <Meta><span>{date}</span></Meta>
          <Excerpt onClick={this.onCardClick}>
          {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
            {ExcerptText}
          </Excerpt>
          <Button clickHandler={this.onCardClick} label="Read More" />
          <ShareBar>
            <i className="fab fa-facebook" />
            <i className="fab fa-twitter" />
          </ShareBar>
          <div className="controls">
            <i onClick={this.editHandler} className="fa fa-edit"></i>
            <i onClick={this.deleteHandler} className="fa fa-trash"></i>
          </div>
        </div>
        <Prompt 
          display={this.state.deletePromptDisplay} 
          deleteNegative={this.deleteNegativeHandler} 
          deletePositive={this.deletePositiveHandler}/>
      </CardContainer>
    );
  }
}

export default Card;
