import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-2xl font-bold">Issue Tracker</div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/projects">Projects</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/issues">Issues</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/my-issues">My Issues</Link>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-4">
        <button
          onClick={handleLogout}
          className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
