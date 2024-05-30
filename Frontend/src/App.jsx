import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ItemList from "./components/Item";
import MyStore from "./components/MyStore";
import ItemDetailPage from "./components/ItemDetailPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ItemViewBox from "./components/ItemViewBox";
import PrivateRoutes from "./components/PrivateRoutes";
import Geolocation from "./components/Geolocation";
import AllInventory from "./components/AllInventory";
import Users from "./components/Users";
import Inventory from "./components/Inventory";
import InventoryItems from "./components/InventoryItems";
import Payment from "./components/Payment";
import Test from "./components/Test";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/superAdmin/dashboard" element={<Dashboard />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/mystore" element={<MyStore />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/item/detail/:id" element={<ItemViewBox />} />
          <Route path="/superAdmin/users" element={<Users />} />
          <Route path="/superAdmin/inventory" element={<AllInventory />} />
          <Route path="/superAdmin/geolocation" element={<Geolocation />} />
          <Route
            path="/superAdmin/users/:id/inventory/"
            element={<Inventory />}
          />
          <Route
            path="/superAdmin/inventory/:di"
            element={<InventoryItems />}
          />
          <Route
            path="superAdmin/users/:id/inventory/:di"
            element={<InventoryItems />}
          />
          <Route path="/payment" element={<Payment />} />
          <Route path="/" element={<h1>Hello</h1>} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<h1>user dashboard</h1>} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
