import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Issue Tracker
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            A simple and powerful tool to track your project issues.
          </p>
          <div className="mt-8">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-4"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
