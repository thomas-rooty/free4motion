import {
    Search,
    HomeContainerListCars,
    MoreInfoCar,
    RecapCommande,
    ListUserCommandes,
    BackOfficeAddCar,
    Login,
    BackOfficeAddCommande,
    Register,
    PaymentUser,
    BackOfficeAdminVehicles,
    BackOfficeUsers,
    AddCarToLocation, EditCarToLocation, BackOfficeEditCommande
} from "./containers";
import {Facture, LogOut, PrivateRoutes} from "./components";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";

import {ContextMenuProvider} from "./context/ContextMenu";
import {ContextHomePageProvider} from "./context/ContexHomePage";
import {MessageStateClientProvider} from "./context/MessageStateClient";
import {FullContainers} from "./containers/Containers";



function App() {


  return (
      <React.Fragment>
          <BrowserRouter>
              {/* Contexte pour savoir si le menu est ouvert etc..., et le fermé à chaque navigation */}
              <ContextMenuProvider>
                  {/* Contexte notification message au client */}
                  <MessageStateClientProvider>
                      <Routes>
                          {/* Routes non restreinte au role */}
                          <Route path="/" element={
                              <FullContainers>
                                  <ContextHomePageProvider>
                                      <Search/>
                                      <HomeContainerListCars/>
                                  </ContextHomePageProvider>
                              </FullContainers>
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

                          {/* Routes restreintes à l'admin */}
                          <Route element={<PrivateRoutes roleNeeded={[0,1]} msgRedirect="adminNotAccess"/>}>
                              <Route path="/validation_commande" element={
                                  <RecapCommande/>
                              }/>
                              <Route path="/shop-car/:currID" element={
                                  <MoreInfoCar/>
                              }/>
                              <Route path="/my-orders" element={
                                  <ListUserCommandes/>
                              }/>
                              <Route path="/payment/:currID" element={
                                  <PaymentUser/>
                              }/>

                              <Route path="/facture" element={
                                  <Facture/>
                              }/>
                          </Route>

                          {/* Routes restreintes aux invités et aux utilisateurs */}
                          <Route element={<PrivateRoutes roleNeeded={[2]} msgRedirect="adminRoleNeeded"/>}>
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

                              <Route path="/free_admin/edit_location/:currID" element={
                                  <EditCarToLocation/>
                              }/>
                              <Route path="/free_admin/add_commande/:currID" element={
                                  <BackOfficeAddCommande/>
                              }/>
                              <Route path="/free_admin/edit_commande/:currID" element={
                                  <BackOfficeEditCommande />
                              }/>
                          </Route>

                      </Routes>
                  </MessageStateClientProvider>
              </ContextMenuProvider>

          </BrowserRouter>

      </React.Fragment>


  );
}

export default App;
