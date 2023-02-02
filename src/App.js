import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/global/Hero";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Verify from "./pages/auth/Verify";
import Nav from "./components/global/Nav";
import AdminOrders from "./pages/admin/AdminOrders";
import Menu from "./pages/client/Menu";
import SingleFlavor from "./pages/client/SingleFlavor";
import Preparing from "./pages/client/Preparing";
import SinglePreparation from "./pages/client/SinglePreparation";
import Deliveries from "./pages/client/Deliveries";
import SingleDelivery from "./pages/client/SingleDelivery";
import Message from "./pages/global/Message";
import AdminSingleOrder from "./pages/admin/AdminSingleOrder";
import Users from "./pages/admin/Users";
import SingleUser from "./pages/admin/SingleUser";
import Messages from "./pages/admin/Messages";
import SingleMessage from "./pages/admin/SingleMessage";
import UserProtectedRoute from "./pages/auth/UserProtectedRoute";
import AdminProtectedRoute from "./pages/auth/AdminProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="verify/:token" element={<Verify />} />
        </Route>
        <Route path="/tm" element={<Nav />}>
          {/* admin */}
          <Route path="a">
            <Route path="orders">
              <Route
                index
                element={
                  <AdminProtectedRoute>
                    <AdminOrders />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path=":orderId"
                element={
                  <AdminProtectedRoute>
                    <AdminSingleOrder />
                  </AdminProtectedRoute>
                }
              />
            </Route>
            <Route path="buyers">
              <Route
                index
                element={
                  <AdminProtectedRoute>
                    <Users />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path=":buyerId"
                element={
                  <AdminProtectedRoute>
                    <SingleUser />
                  </AdminProtectedRoute>
                }
              />
            </Route>
            <Route path="messages">
              <Route
                index
                element={
                  <AdminProtectedRoute>
                    <Messages />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path=":messageId"
                element={
                  <AdminProtectedRoute>
                    <SingleMessage />
                  </AdminProtectedRoute>
                }
              />
            </Route>
          </Route>
          {/* client */}
          <Route path="c">
            <Route path="menu">
              <Route
                index
                element={
                  <UserProtectedRoute>
                    <Menu />
                  </UserProtectedRoute>
                }
              />
              <Route
                path="hc"
                element={
                  <UserProtectedRoute>
                    <SingleFlavor />
                  </UserProtectedRoute>
                }
              />
              <Route
                path="sc"
                element={
                  <UserProtectedRoute>
                    <SingleFlavor />
                  </UserProtectedRoute>
                }
              />
              <Route
                path="cc"
                element={
                  <UserProtectedRoute>
                    <SingleFlavor />
                  </UserProtectedRoute>
                }
              />
              <Route
                path="ob"
                element={
                  <UserProtectedRoute>
                    <SingleFlavor />
                  </UserProtectedRoute>
                }
              />
            </Route>
            <Route path="preparing">
              <Route
                index
                element={
                  <UserProtectedRoute>
                    <Preparing />
                  </UserProtectedRoute>
                }
              />
              <Route
                path=":preparationId"
                element={
                  <UserProtectedRoute>
                    <SinglePreparation />
                  </UserProtectedRoute>
                }
              />
            </Route>
            <Route path="deliveries">
              <Route
                index
                element={
                  <UserProtectedRoute>
                    <Deliveries />
                  </UserProtectedRoute>
                }
              />
              <Route
                path=":deliveryId"
                element={
                  <UserProtectedRoute>
                    <SingleDelivery />
                  </UserProtectedRoute>
                }
              />
            </Route>
            <Route
              path="message"
              element={
                <UserProtectedRoute>
                  <Message />
                </UserProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
