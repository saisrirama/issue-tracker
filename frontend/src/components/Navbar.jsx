import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import CreateIssueModal from "./CreateIssueModal";

const Navbar = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md w-full">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                Issue Tracker
              </Link>
            </div>
            <div className="flex items-center">
              {user ? (
                <>
                  <span className="mr-4 text-gray-800">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Create Issue
                  </button>
                </>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="text-gray-800 hover:text-blue-500 mr-4"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <CreateIssueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;