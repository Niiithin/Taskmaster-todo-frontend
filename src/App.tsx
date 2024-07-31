import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeConfig from "theme";
import { SessionProvider } from "context/SessionContext";
import Routing from "routes";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeConfig>
        <SessionProvider>
          <Router>
            <Routing />
          </Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </SessionProvider>
      </ThemeConfig>
    </HelmetProvider>
  );
};

export default App;
