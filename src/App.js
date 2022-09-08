import {
    Search,
    HomeContainerListCars,
    MoreInfoCar,
    RecapCommande,
    ListUserCommandes,
    BackOfficeAddCar, Login, BackOfficeAddCommande
} from "./containers";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {FullContainers} from "./containers/Containers";
import {ContextMenuProvider} from "./context/ContextMenu";
import AddCarToLocation from "./containers/AddCarToLocation";
import PaymentUser from "./containers/PaymentUser";
import {ContextHomePageProvider} from "./context/ContexHomePage";
import {MessageStateClientProvider} from "./context/MessageStateClient";
import Register from "./containers/Register";
import LogOut from "./components/LogOut";
import EditCarToLocation from "./containers/EditCarToLocation";
import BackOfficeAdminVehicles from "./containers/BackOfficeAdminVehicles";
import BackOfficeUsers from "./containers/BackOfficeUsers";
import PrivateRoutes from "./components/PrivateRoutes";
import BackOfficeEditCommande from "./containers/BackOfficeEditCommande";


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
                              <Route path="/payment" element={
                                  <PaymentUser/>
                              }/>
                          </Route>
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


                          <Route path="/login" element={
                              <Login/>
                          }/>
                          <Route path="/logout" element={
                              <LogOut/>
                          }/>
                          <Route path="/register" element={
                              <Register/>
                          }/>
                      </Routes>
                  </MessageStateClientProvider>
              </ContextMenuProvider>

          </BrowserRouter>

      </React.Fragment>


  );
}

export default App;
