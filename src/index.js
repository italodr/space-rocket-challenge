import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import App from "./pages/app";
import { StateProvider } from './contexts/app-context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StateProvider>
        <ThemeProvider>
          <CSSReset />
          <App />
        </ThemeProvider>
      </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
