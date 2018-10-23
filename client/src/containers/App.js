import React, { Component } from "react";
import Landing from "./pages/Landing";
import Fashion from "./pages/Fashion";
import Beauty from './pages/Beauty';
import Art from './pages/Art';
import Others from './pages/Others';
import Contact from './pages/Contact';
import Editor from "./RichTextEditor/Editor";
import RegisterOrLogin from './pages/RegisterOrLogin';

import { Route } from "react-router-dom";
import AuthService from '../utils/AuthService';

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
const auth = new AuthService();
class App extends Component {

  render() {
    return (
      <div>
        <Route exact strict path="/" render={props => <Landing {...props} />} />
        <Route exact strict path='/login' render={(props) => <RegisterOrLogin mode={'Login'} {...props} />} />
        <Route
          exact
          path="/fashion"
          render={props => <Fashion {...props} />}
        />
        <Route
          exact
          strict
          path="/fashion/post/:blogId"
          render={props => <Editor genre="fashion" auth={auth} {...props} />}
        />
      </div>
    );
  }
}

export default App;
