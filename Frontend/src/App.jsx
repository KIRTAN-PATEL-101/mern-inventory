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


const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/items" element={<ItemList />} />
        <Route path='/mystore' element={<MyStore />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App