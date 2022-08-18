import {Navbar, Search, HomeContainerListCars, MoreInfoCar, RecapCommande} from "./containers";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {FullContainers} from "./containers/Containers";
import {ContextMenuProvider} from "./context/ContextMenu";

function App() {
  return (
      <React.Fragment>
          <BrowserRouter>
              <ContextMenuProvider>
                  <Routes>
                      <Route path="/" element={
                          <FullContainers>
                              <Search/>
                              <HomeContainerListCars/>
                          </FullContainers>
                      }/>
                      <Route path="/:slug" element={
                          <MoreInfoCar/>
                      }/>
                      <Route path="/validation_commande" element={
                          <RecapCommande/>
                      }/>
                      <Route path="/my-orders" element={
                         <h1>Mes commandes</h1>
                      }/>
                  </Routes>
              </ContextMenuProvider>

          </BrowserRouter>

      </React.Fragment>


  );
}

export default App;
