import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddVehicle from './pages/AddVehicle';
import SearchAndBook from './pages/SearchAndBook';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<AddVehicle />} />
          <Route path="/search" element={<SearchAndBook />} />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}