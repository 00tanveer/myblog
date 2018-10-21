import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import { injectGlobal } from "styled-components";
import { Router } from "react-router-dom";
import history from "./history";
import theme from "./styles/theme";

injectGlobal`
	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;
		box-sizing: inherit;
	}
	html{
		background-color: ${theme.black};
		
		font-size: 62.5%;
		color: black;
	}
	body {
		box-sizing: border-box;
		position: relative;
	}
`;

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
