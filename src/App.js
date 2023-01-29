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
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          {/* client */}
          <Route path="c">
            <Route path="menu">
              <Route index element={<Menu />} />
              <Route path="hc" element={<SingleFlavor />} />
              <Route path="sc" element={<SingleFlavor />} />
              <Route path="cc" element={<SingleFlavor />} />
              <Route path="ob" element={<SingleFlavor />} />
            </Route>
            <Route path="preparing">
              <Route index element={<Preparing />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
