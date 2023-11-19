import Home from './pages/Home.tsx'
import LibraryOccupancyTracker from './pages/LibraryOccupancyTracker.tsx'
import Dashboard from './pages/Dashboard.tsx'

import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/in" element={<LibraryOccupancyTracker />}></Route>
        <Route path="/dash" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;