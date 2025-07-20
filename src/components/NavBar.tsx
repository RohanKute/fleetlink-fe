import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex gap-6">
      <Link to="/" className="hover:text-blue-400 transition">Add Vehicle</Link>
      <Link to="/search" className="hover:text-blue-400 transition">Search & Book</Link>
    </nav>
  );
}