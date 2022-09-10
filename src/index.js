import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from "./globalStyles";
import {ContextAuthProvider} from "./context/ContextAuth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.Fragment>
          {
              /* Contexte globale à l'application permettant de connaître notamment le role du client */
          }
          <ContextAuthProvider>
              {
                  /* Permet de changer un style global à l'application tel que le body */
              }
              <GlobalStyle/>
              <App />
          </ContextAuthProvider>
      </React.Fragment>
);
