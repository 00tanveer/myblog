import React from "react";
import history from '../../history';
import ReactQuill from "react-quill";
import axios from "axios";

import styled from "styled-components";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/Input";

const Input = styled.input``;
const StyledInput = Input.withComponent(Button);

let Inline = ReactQuill.Quill.import("blots/inline");
class SyntaxBlot extends Inline {
  static create(value) {
    let node = super.create();
    node.setAttribute("src", value.url);
    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute("alt"),
      url: node.getAttribute("src")
    };
  }
}

SyntaxBlot.blotName = "em";
SyntaxBlot.tagName = "strong";
ReactQuill.Quill.register("formats/em", SyntaxBlot);
const CustomToolbar = props => (
  <div id="toolbar">
    <select className="ql-font" defaultValue={""} onChange={e => e.persist()} />
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <select className="ql-size" defaultValue={""} onChange={e => e.persist()}>
      <option value="small" />
      <option value="normal" />
      <option value="large" />
      <option value="huge" />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <select className="ql-background" />
    <button className="ql-blockquote" />
    <button className="ql-code-block" />
    <select className="ql-align" />
    <button className="ql-image" />
    <button className="ql-link" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-strike" />
  </div>
);

const QuillContainer = styled.div`
  .quill {
    > .ql-container {
      .ql-editor {
        .ql-syntax {
          background-color: #2f4f4f !important;
          border: 1px solid grey !important;
        }
      }
    }
  }
`;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: "",
      mountedEditor: false,
      blogId: "",
			tags: [],
			selectedTags: [],
      title: ""
    }; // You can also pass a Quill Delta here
    //console.log(props.match.path);
    this.quillRef = null;
    this.reactQuillRef = null;
    this.handleChange = this.handleChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
    this.syntaxButtonHandler = this.syntaxButtonHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.attachQuillRefs = this.attachQuillRefs.bind(this);
    this.login = this.login.bind(this);
  }

  //AUTH
  login() {
    this.props.auth.login();
  }

  //LIFECYCLE HOOKS
  componentDidMount() {
    this.attachQuillRefs();
    
    axios.get("/blogs/blogs/tags").then(res => {
      let tags = [];
      tags = res.data.data.map(tag => {
        return tag.name;
      });
      this.setState(
        {
          tags: tags
        },
        () => {
					axios.get("/blogs/blogs").then(res => {
						console.log(res.data.data);
						if (res.data.data.length !== 0) {
							this.quillRef.setContents(res.data.data[0].delta_ops);
							this.setState(
								{
									blogId: res.data.data[0]._id,
									title: res.data.data[0].title,
									selectedTags: res.data.data[0].tags
								},
								() => {
									console.log(this.state.selectedTags);
									console.log(this.quillRef.root.innerHTML);
								}
							);
						}
					});
				}
      );
    });
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }
  //////////////////
  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    // Skip if Quill reference is defined:
    if (this.quillRef != null) return;

    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  };

  handleChange(html) {
    //console.log(html);
    //this.setState({ editorHtml: html });
    //console.log(this.quillRef.getContents().ops);

    let blog = {
      id: this.state.blogId,
			title: this.state.title,
			tags: this.state.selectedTags,
      body: "",
      delta_ops: this.quillRef.getContents().ops
    };
    //console.log(blog);
    axios.put("/blogs/blogs", { blog }).then(res => {
      //console.log(res.data);
      this.setState({ editorHtml: html });
    });
  }

  onTitleChange(e) {
    //console.log(e.target.value);
    let title = e.target.value;
    let blog = {
      id: this.state.blogId,
			title: title,
			tags: this.state.selectedTags,
      delta_ops: this.quillRef.getContents().ops
    };
    axios.put("/blogs/blogs", { blog }).then(res => {
      //console.log(res.data);
      this.setState({ title: title });
    });
	}
	
	handleInputChange(e) {
		//console.log(e.target.name);
		let tag = e.target.name;
		let selectedTags;
		if (this.state.selectedTags.indexOf(tag) === -1) {
			selectedTags = this.state.selectedTags.concat(tag);
		} else {
			selectedTags = this.state.selectedTags;
			let indexToRemove = selectedTags.indexOf(tag);
			selectedTags.splice(indexToRemove, 1);
		}
		//console.log(selectedTags);
		let blog = {
			id: this.state.blogId,
			title: this.state.title,
			tags: selectedTags,
			delta_ops: this.quillRef.getContents().ops
		}
		axios.put('/blogs/blogs', {blog}).then(res => {
			this.setState({selectedTags: selectedTags}, () => console.log(this.state.selectedTags));
		})
	}

  imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        this.saveToServer(file);
      } else {
        console.warn("You can only upload images.");
      }
    };
  }

  saveToServer(file) {
    const data = new FormData();

    data.append("file", file);
    data.append("filename", file.name);
    // for (var key of data.entries()) {
    //     console.log(key[0] + ', ' + key[1]);
    // }
    fetch("/blogs/blogs/uploadPicture", {
      method: "POST",
      body: data
    }).then(response => {
      response.json().then(body => {
        //this.setState({ imageURL: `http://localhost:8000/${body.file}` });
        //console.log(body);
        this.insertToEditor(body.url);
        //insertToEditor(body.file);
      });
    });
  }

  insertToEditor(url) {
    // push image url to rich editor.
    //console.log(url);
    const range = this.quillRef.getSelection();
    //console.log(range);
    this.quillRef.insertEmbed(range.index, "image", url);
    this.quillRef.insertEmbed(range.index + 1, "code", "dsfsdf");
  }

  syntaxButtonHandler() {
    console.log("herere");
    let range = this.quillRef.getSelection();
    console.log(range);
    if (range) {
      this.quillRef.format("em", true);
      //this.quillRef.insertText(range.index, 'hahahaha', 'bold', false);
    }
  }

  saveHandler() {
    console.log("save clicked");
		console.log(this.quillRef.getSelection());
		let blog = {
			id: this.state.blogId,
			date: Date.now(),
			title: this.state.title,
			tags: this.state.selectedTags,
			delta_ops: this.quillRef.getContents().ops
    }
    console.log(blog);
		axios.put('/blogs/blogs', {blog}).then(res => {
			console.log(res.data);
			history.replace('/fashion');
		})
  }

  render() {
    const modules = {
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: this.imageHandler
        }
      },
      clipboard: {
        matchVisual: false
      }
    };
    let Tags;
    if (this.state.tags.length > 0) {
      Tags = <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 40 }}>
        {this.state.tags.map(tag => {
          console.log(tag);
          return (
            <label key={tag} style={{ color: 'white', fontSize: '2rem', margin: 5}}>
              <input style={{margin: 5}} name={tag} checked={this.state.selectedTags.indexOf(tag) > -1} value={tag} type="checkbox" onChange={this.handleInputChange} />
              {tag}
            </label>
          );
        })}
      </div>
    }
    return (
      <div className="container">
        <div className="text-editor">
          <CustomToolbar syntaxButtonHandler={this.syntaxButtonHandler} />
          &nbsp;
          <h1 style={{ marginTop: 40, color: "white", textAlign: "center" }}>
            Blog Title
          </h1>
          <FormInput
            placeholder="Article Title"
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <h1 style={{ marginTop: 40, color: "white", textAlign: "center" }}>
            Blog Body
          </h1>
          <ReactQuill
            ref={el => {
              this.reactQuillRef = el;
            }}
            onChange={this.handleChange}
            modules={modules}
            formats={Editor.formats}
            defaultValue={this.state.editorHtml}
          />
          <h1 style={{ marginTop: 40, color: "white", textAlign: "center" }}>
            Article Tags
          </h1>
          {Tags}
          <StyledInput label="Save" clickHandler={this.saveHandler} />
          &npsp;
        </div>
      </div>
    );
  }
}

Editor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      image: Editor.prototype.imageHandler
    }
  },
  clipboard: {
    matchVisual: false
  }
};

// Editor.modules.toolbar = [
//     ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
//     ['blockquote', 'code-block'],                    // blocks
//     [{ 'header': 1 }, { 'header': 2 }],              // custom button values
//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // lists
//     [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
//     [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
//     [{ 'direction': 'rtl' }],                        // text direction
//     [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
//     [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
//     [{ 'font': [] }],                                // font family
//     [{ 'align': [] }],                               // text align
//     ['clean'],                                       // remove formatting
// ]

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "align",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "background"
];

export default Editor;
