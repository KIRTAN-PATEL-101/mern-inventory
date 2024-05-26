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


const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/items" element={<ItemList />} />
        <Route path='/mystore' element={<MyStore />} />
        <Route path="/item/:id" component={<ItemDetailPage/>} />
      </Routes>
      </BrowserRouter>
  )
}

export default App