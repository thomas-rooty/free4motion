import {Navbar, Search, HomeContainerListCars, MoreInfoCar} from "./containers";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {FullContainers} from "./containers/Containers";

function App() {
  return (
      <React.Fragment>
          <BrowserRouter>
              <Navbar/>
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
              </Routes>
          </BrowserRouter>

      </React.Fragment>


  );
}

export default App;
