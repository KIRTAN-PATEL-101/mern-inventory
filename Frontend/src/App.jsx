import './index.css'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter, Routes
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ItemList from './components/Item';
import MyStore from './components/MyStore';
import ItemDetailPage from './components/ItemDetailPage';
import Login from "./components/Login";
import Register from "./components/Register";
import ItemViewBox from './components/ItemViewBox';
import PrivateRoutes from './components/PrivateRoutes';


const App = () => {


  return (
    <BrowserRouter>
    
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/items" element={<ItemList />} />
          <Route path='/mystore' element={<MyStore />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/item/detail/:id" element={<ItemViewBox />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App