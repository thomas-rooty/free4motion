import {
    Navbar,
    Search,
    HomeContainerListCars,
    MoreInfoCar,
    RecapCommande,
    ListUserCommandes,
    BackOfficeAdmin,
    BackOfficeAddCar
} from "./containers";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {FullContainers} from "./containers/Containers";
import {ContextMenuProvider} from "./context/ContextMenu";
import AddCarToLocation from "./containers/AddCarToLocation";
import {StripeContainer} from "./containers/Stripe";
import PaymentUser from "./containers/PaymentUser";
import {ContextHomePageProvider} from "./context/ContexHomePage";

function App() {
  return (
      <React.Fragment>
          <BrowserRouter>
              <ContextMenuProvider>
                  <Routes>
                          <Route path="/" element={
                              <FullContainers>
                                  <ContextHomePageProvider>
                                      <Search/>
                                      <HomeContainerListCars/>
                                  </ContextHomePageProvider>
                              </FullContainers>
                          }/>
                          <Route path="/:slug" element={
                              <MoreInfoCar/>
                          }/>
                          <Route path="/validation_commande" element={
                              <RecapCommande/>
                          }/>
                      <Route path="/my-orders" element={
                          <ListUserCommandes/>
                      }/>
                      <Route path="/free_admin" element={
                          <BackOfficeAdmin/>
                      }/>
                      <Route path="/free_admin/add_vehicle" element={
                          <BackOfficeAddCar/>
                      }/>
                      <Route path="/free_admin/add_location" element={
                          <AddCarToLocation/>
                      }/>
                      <Route path="/payment" element={
                          <PaymentUser/>
                      }/>
                  </Routes>
              </ContextMenuProvider>

          </BrowserRouter>

      </React.Fragment>


  );
}

export default App;
