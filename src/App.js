import {
    Navbar,
    Search,
    HomeContainerListCars,
    MoreInfoCar,
    RecapCommande,
    ListUserCommandes,
    BackOfficeAdmin,
    BackOfficeAddCar, Login
} from "./containers";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {FullContainers} from "./containers/Containers";
import {ContextMenuProvider} from "./context/ContextMenu";
import AddCarToLocation from "./containers/AddCarToLocation";
import {StripeContainer} from "./containers/Stripe";
import PaymentUser from "./containers/PaymentUser";
import {ContextHomePageProvider} from "./context/ContexHomePage";
import {MessageStateClientProvider} from "./context/MessageStateClient";
import Register from "./containers/Register";
import LogOut from "./components/LogOut";
import EditCarToLocation from "./containers/EditCarToLocation";
import BackOfficeAdminVehicles from "./containers/BackOfficeAdminVehicles";
import BackOfficeUsers from "./containers/BackOfficeUsers";

function App() {
  return (
      <React.Fragment>
          <BrowserRouter>
              <ContextMenuProvider>

                  <MessageStateClientProvider>
                      <Routes>
                          <Route path="/" element={
                              <FullContainers>
                                  <ContextHomePageProvider>
                                      <Search/>
                                      <HomeContainerListCars/>
                                  </ContextHomePageProvider>
                              </FullContainers>
                          }/>
                          <Route path="/shop-car/:currID" element={
                              <MoreInfoCar/>
                          }/>
                          <Route path="/validation_commande" element={
                              <RecapCommande/>
                          }/>
                          <Route path="/my-orders" element={
                              <ListUserCommandes/>
                          }/>
                          <Route path="/free_admin/vehicles" element={
                              <BackOfficeAdminVehicles/>
                          }/>
                          <Route path="/free_admin/users" element={
                              <BackOfficeUsers/>
                          }/>
                          <Route path="/free_admin/add_vehicle" element={
                              <BackOfficeAddCar/>
                          }/>
                          <Route path="/free_admin/add_location/:currID" element={
                              <AddCarToLocation/>
                          }/>
                          <Route path="/payment" element={
                              <PaymentUser/>
                          }/>
                          <Route path="/login" element={
                             <Login/>
                          }/>
                          <Route path="/logout" element={
                              <LogOut/>
                          }/>
                          <Route path="/register" element={
                             <Register/>
                          }/>
                          <Route path="/free_admin/edit_location/:currID" element={
                             <EditCarToLocation/>
                          }/>
                      </Routes>
                  </MessageStateClientProvider>

              </ContextMenuProvider>

          </BrowserRouter>

      </React.Fragment>


  );
}

export default App;
