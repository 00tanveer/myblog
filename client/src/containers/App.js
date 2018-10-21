import React, { Component } from "react";
import Landing from "./pages/Landing";
import Fashion from "./pages/Fashion";
import Beauty from './pages/Beauty';
import Art from './pages/Art';
import Others from './pages/Others';
import Contact from './pages/Contact';
import Editor from "./RichTextEditor/Editor";

import { Route } from "react-router-dom";

// const screens = {
//   'fashion': {
//     screen: <Fashion {...props}/>
//   },
//   'beauty': {
//     screen: <Beauty {...props}/>
//   },
//   'art': {
//     screen: <Art {...props}/>
//   },
//   'books': {
//     screen: <Books {...props}/>
//   },
//   'others': {
//     screen: <Others {...props}/>
//   },
//   'contact': {
//     screen: <Contact {...props}/>
//   }
// }

class App extends Component {
  
  render() {
    return (
      <div>
        <Route exact strict path="/" render={props => <Landing {...props} />} />
        {/* {
          Object.keys(screens).map((key) => {
            return(
              <Route 
                exact
                strict
                path={`/${key}/`}
                render={props => screens[key]}
              />
            )
          })
        } */}
        <Route
          exact
          strict
          path="/fashion"
          render={props => <Fashion {...props} />}
        />
        <Route
          exact
          strict
          path="/fashion/post"
          render={props => <Editor {...props} />}
        />
      </div>
    );
  }
}

export default App;
